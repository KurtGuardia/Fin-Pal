import './App.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {
  Dashboard,
  Balance,
  Debts,
  Stock,
  Auth,
  User,
  NotFound,
} from './views';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleAddTransactionModal,
  toggleSettingsModal,
  toggleEditTransactionModal,
  toggleAddDebtModal,
} from './store/actions/settingsActions';
import {
  SettingsForm,
  Header,
  Sidebar,
  AddTransaction,
  EditTransaction,
  AddDebt,
} from './components';
import { Backdrop } from './components/UI';
import useFirestore from './hooks/useFirestore';
import { useEffect } from 'react';
import { syncData } from './store/actions/financeActions';

function App() {
  const uid = useSelector((state) => state.firebase.auth.uid);
  const modals = useSelector((state) => state.settings.modals);
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.settings.isSidebarOpen);
  const { doc } = useFirestore(uid);

  useEffect(() => {
    if (doc.finance) {
      dispatch(syncData(doc.finance));
    }
  }, [uid, doc.finance]);

  const {
    isSettingsOpen,
    isAddTransactionOpen,
    editTransaction,
    isAddDebtOpen,
  } = modals;

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

        {isAddDebtOpen && (
          <Backdrop clicked={() => dispatch(toggleAddDebtModal())} />
        )}

        <SettingsForm />
        <AddTransaction />
        <EditTransaction item={editTransaction.item} />
        <AddDebt />

        <div className={isSidebarOpen ? 'page sidebarOpen' : 'page'}>
          <Header />
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/balance' component={Balance} />
            <Route path='/debts' component={Debts} />
            <Route path='/stock' component={Stock} />
            <Route path='/auth' component={Auth} />
            <Route path='/user' component={User} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
