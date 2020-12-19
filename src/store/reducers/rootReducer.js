import { combineReducers } from 'redux';
import { settingsReducer } from './settingsReducer';
import { financeReducer } from './financeReducer';
import { authReducer } from './authReducer';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  settings: settingsReducer,
  finance: financeReducer,
  auth: authReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
