import { createStore, combineReducers } from 'redux';

import accountReducer from './features/accounts/accountSlice';
import customerReducer from './features/customers/customerSlice';

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const devtools =
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : undefined;

const store = createStore(rootReducer, devtools);

export default store;
