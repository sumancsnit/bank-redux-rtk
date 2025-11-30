import { createStore } from 'redux';

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false,
};

const reducer = (state, action) => {
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

const store = createStore(reducer, initialState);

store.dispatch({ type: 'account/deposit', payload: 1000 });
console.log(store.getState());
store.dispatch({ type: 'account/withdraw', payload: 200 });
console.log(store.getState());
store.dispatch({
  type: 'account/requestLoan',
  payload: { amount: 5000, purpose: 'Car' },
});
console.log(store.getState());
store.dispatch({ type: 'account/payLoan' });
console.log(store.getState());
