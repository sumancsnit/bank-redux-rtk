import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = '';
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { deposit, withdraw, requestLoan, payLoan, setLoading } =
  accountSlice.actions;

export default accountSlice.reducer;

// Previous Redux code for reference:

// const accountReducer = (state = initialStateAccount, action) => {
//   switch (action.type) {
//     case 'account/deposit':
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };
//     case 'account/withdraw':
//       return {
//         ...state,
//         balance: state.balance - action.payload,
//       };
//     case 'account/requestLoan':
//       if (state.loan > 0) return state;
//       return {
//         ...state,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.purpose,
//         balance: state.balance + action.payload.amount,
//       };
//     case 'account/payLoan':
//       return {
//         ...state,
//         balance: state.balance - state.loan,
//         loan: 0,
//         loanPurpose: '',
//       };
//     case 'setLoading':
//       return { ...state, isLoading: action.payload };
//     default:
//       return state;
//   }
// };

// const deposit = (amount, currency) => {
//   if (currency === 'USD') return { type: 'account/deposit', payload: amount };
//   return async (dispatch, getState) => {
//     dispatch({ type: 'setLoading', payload: true });
//     // API Call
//     const response = await fetch(
//       `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`
//     );
//     const data = await response.json();
//     const convertedAmount = (amount * data.rates['USD']).toFixed(2);
//     // return action
//     dispatch({ type: 'account/deposit', payload: +convertedAmount });
//   };
// };
// const withdraw = (amount) => ({ type: 'account/withdraw', payload: amount });
// const requestLoan = (amount, purpose) => ({
//   type: 'account/requestLoan',
//   payload: { amount, purpose },
// });
// const payLoan = () => ({ type: 'account/payLoan' });

// export default accountReducer;
// export { deposit, withdraw, requestLoan, payLoan };
