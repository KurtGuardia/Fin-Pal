import './App.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Dashboard, Balance, Debts, Stock, NotFound } from './views';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from './store/actions/settingsActions';
import Settingsform from './components/SettingsForm/Settingsform';

function App() {
  const isModalOpen = useSelector((state) => state.settings.isModalOpen);
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.settings.isSidebarOpen);

  return (
    <BrowserRouter>
      <div className={isDarkMode ? 'app dark' : 'app'}>
        <Sidebar />

        {isModalOpen && (
          <div
            className='backdrop'
            onClick={() => dispatch(toggleModal())}
          ></div>
        )}

        <Settingsform />

        <div className={isSidebarOpen ? 'page sidebarOpen' : 'page'}>
          <Header />
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/balance' component={Balance} />
            <Route path='/debts' component={Debts} />
            <Route path='/stock' component={Stock} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
