import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import accountReducer from './features/accounts/accountSlice';
import customerReducer from './features/customers/customerSlice';
import { thunk } from 'redux-thunk';

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
