import './App.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Dashboard, Balance, Debts, Stock, NotFound } from './views';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSettingsModal } from './store/actions/settingsActions';
import { SettingsForm, Header, Sidebar } from './components';

function App() {
  const isSettingsOpen = useSelector(
    (state) => state.settings.modals.isSettingsOpen
  );
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.settings.isSidebarOpen);

  return (
    <BrowserRouter>
      <div className={isDarkMode ? 'app dark' : 'app'}>
        <Sidebar />

        {isSettingsOpen && (
          <div
            className='backdrop'
            onClick={() => dispatch(toggleSettingsModal())}
          ></div>
        )}

        <SettingsForm />

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
