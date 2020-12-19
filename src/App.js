import './App.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Dashboard, Balance, Debts, Stock, Auth, NotFound } from './views';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleAddTransactionModal,
  toggleSettingsModal,
  toggleEditTransactionModal,
} from './store/actions/settingsActions';
import {
  SettingsForm,
  Header,
  Sidebar,
  AddTransaction,
  EditTransaction,
} from './components';
import { Backdrop } from './components/UI';
import useFirestore from './hooks/useFirestore';

function App() {
  const uid = useSelector((state) => state.firebase.auth.uid);
  const modals = useSelector((state) => state.settings.modals);
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.settings.isSidebarOpen);

  useEffect(() => {
    const user = useFirestore(uid);
  }, [uid]);

  const { isSettingsOpen, isAddTransactionOpen, editTransaction } = modals;

  return (
    <BrowserRouter>
      <div className={isDarkMode ? 'app dark' : 'app'}>
        <Sidebar />

        {isSettingsOpen && (
          <Backdrop clicked={() => dispatch(toggleSettingsModal())} />
        )}

        {isAddTransactionOpen && (
          <Backdrop clicked={() => dispatch(toggleAddTransactionModal())} />
        )}

        {editTransaction.isOpen && (
          <Backdrop clicked={() => dispatch(toggleEditTransactionModal())} />
        )}

        <SettingsForm />
        <AddTransaction />
        <EditTransaction item={editTransaction.item} />

        <div className={isSidebarOpen ? 'page sidebarOpen' : 'page'}>
          <Header />
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/balance' component={Balance} />
            <Route path='/debts' component={Debts} />
            <Route path='/stock' component={Stock} />
            <Route path='/auth' component={Auth} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
