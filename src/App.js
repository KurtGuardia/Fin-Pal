import './App.scss';
import { Switch, Route, useLocation } from 'react-router-dom';
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
  toggleEditDebtModal,
  toggleAddItemModal,
  toggleEditItemModal,
  toggleLockAccountModal,
} from './store/actions/settingsActions';
import {
  SettingsForm,
  Sidebar,
  AddTransaction,
  EditTransaction,
  AddDebt,
  EditDebt,
  AddItem,
  EditItem,
  LockAccount,
} from './components';
import { Backdrop } from './components/UI';
import useFirestore from './hooks/useFirestore';
import { useEffect } from 'react';
import { syncData } from './store/actions/financeActions';
import { lockState } from './store/actions/lockActions';
import { AnimatePresence } from 'framer-motion';

function App() {
  const uid = useSelector((state) => state.firebase.auth.uid);
  const modals = useSelector((state) => state.settings.modals);
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const dispatch = useDispatch();
  const { doc } = useFirestore(uid);
  const location = useLocation();

  useEffect(() => {
    if (doc.finance) {
      dispatch(syncData(doc.finance));
    }
    // eslint-disable-next-line
  }, [uid, doc.finance]);

  useEffect(() => {
    if (doc.isAccountLocked) {
      dispatch(lockState(doc.isAccountLocked));
    }
    // eslint-disable-next-line
  }, [uid, doc.isAccountLocked]);

  const {
    isSettingsOpen,
    isAddTransactionOpen,
    editTransaction,
    isAddDebtOpen,
    editDebt,
    isAddItemOpen,
    editItem,
    isLockAccountOpen,
  } = modals;

  return (
    <div className={isDarkMode ? 'app dark' : 'app'}>
      <Sidebar />

      {isSettingsOpen && (
        <Backdrop clicked={() => dispatch(toggleSettingsModal())} />
      )}

      {isLockAccountOpen && (
        <Backdrop clicked={() => dispatch(toggleLockAccountModal())} />
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

      {editDebt.isOpen && (
        <Backdrop clicked={() => dispatch(toggleEditDebtModal())} />
      )}

      {isAddItemOpen && (
        <Backdrop clicked={() => dispatch(toggleAddItemModal())} />
      )}

      {editItem.isOpen && (
        <Backdrop clicked={() => dispatch(toggleEditItemModal())} />
      )}

      <SettingsForm />
      <LockAccount />
      <AddTransaction />
      <EditTransaction item={editTransaction.item} />
      <AddDebt />
      <EditDebt item={editDebt.item} />
      <AddItem />
      <EditItem item={editItem.item} />

      <div className='page'>
        <AnimatePresence exitBeforeEnter>
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/balance' component={Balance} />
            <Route path='/debts' component={Debts} />
            <Route path='/stock' component={Stock} />
            <Route path='/auth' component={Auth} />
            <Route path='/user' component={User} />
            <Route component={NotFound} />
          </Switch>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
