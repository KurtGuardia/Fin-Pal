import { combineReducers } from 'redux';
import { settingsReducer } from './settingsReducer';
import { financeReducer } from './financeReducer';

const rootReducer = combineReducers({
  settings: settingsReducer,
  finance: financeReducer,
});

export default rootReducer;
