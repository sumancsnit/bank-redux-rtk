const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false,
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

const deposit = (amount) => ({ type: 'account/deposit', payload: amount });
const withdraw = (amount) => ({ type: 'account/withdraw', payload: amount });
const requestLoan = (amount, purpose) => ({
  type: 'account/requestLoan',
  payload: { amount, purpose },
});
const payLoan = () => ({ type: 'account/payLoan' });

export default accountReducer;
export { deposit, withdraw, requestLoan, payLoan };
