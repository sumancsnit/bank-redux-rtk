import { createStore, combineReducers } from 'redux';

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false,
};

const initialStateCustomer = {
  fullName: '',
  nationalID: '',
  createdAt: '',
};

const accountReducer = (state = initialStateAccount, action) => {
  switch (action.type) {
    case 'account/deposit':
      return { ...state, balance: state.balance + action.payload };
    case 'account/withdraw':
      return { ...state, balance: state.balance - action.payload };
    case 'account/requestLoan':
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case 'account/payLoan':
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
        loanPurpose: '',
      };
    case 'setLoading':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

const customerReducer = (state = initialStateCustomer, action) => {
  switch (action.type) {
    case 'customer/createCustomer':
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case 'customer/updateName':
      return { ...state, fullName: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

// store.dispatch({ type: 'account/deposit', payload: 1000 });
// console.log(store.getState());
// store.dispatch({ type: 'account/withdraw', payload: 200 });
// console.log(store.getState());
// store.dispatch({
//   type: 'account/requestLoan',
//   payload: { amount: 5000, purpose: 'Car' },
// });
// console.log(store.getState());
// store.dispatch({ type: 'account/payLoan' });
// console.log(store.getState());

const deposit = (amount) => ({ type: 'account/deposit', payload: amount });
const withdraw = (amount) => ({ type: 'account/withdraw', payload: amount });
const requestLoan = (amount, purpose) => ({
  type: 'account/requestLoan',
  payload: { amount, purpose },
});
const payLoan = () => ({ type: 'account/payLoan' });
const setLoading = (isLoading) => ({ type: 'setLoading', payload: isLoading });

store.dispatch(deposit(1000));
store.dispatch(withdraw(200));
store.dispatch(requestLoan(5000, 'Car'));
console.log(store.getState());

store.dispatch(payLoan());
store.dispatch(setLoading(true));
console.log(store.getState());

const createCustomer = (fullName, nationalID) => {
  return {
    type: 'customer/createCustomer',
    payload: {
      fullName,
      nationalID,
      createdAt: new Date().toISOString(),
    },
  };
};

const updateName = (fullName) => {
  return {
    type: 'customer/updateName',
    payload: fullName,
  };
};

store.dispatch(createCustomer('John Doe', '123456789'));
store.dispatch(updateName('Jane Doe'));
console.log(store.getState());

export { store, deposit, withdraw, requestLoan, payLoan, setLoading };
