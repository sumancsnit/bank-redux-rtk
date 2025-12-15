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
    // replacement of action.type 'account/deposit'
    deposit: (state, action) => {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      // prepare custom action payload value for redcer method, by default first param value is stored in action.payload in RTK
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },
      reducer(state, action) {
        // no need to return default state in RTK
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      },
    },
    payLoan(state, action) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = '';
    },
    convertingCurrency: (state) => {
      state.isLoading = true;
    },
  },
});

// there is another way to use async calls in RTK
export const deposit = (amount, currency) => {
  if (currency === 'USD') return { type: 'account/deposit', payload: amount };
  // if function is returned instead of {}, redux will use thunk middleware
  // dispatch and getState will be accessable in this fn
  return async (dispatch, getState) => {
    // first dispatch to show loader
    dispatch({ type: 'account/convertingCurrency' });
    // API Call
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
      );
      const data = await res.json();
      const converted = data.rates.USD;
      // second dispatch to load actual data from api
      dispatch({ type: 'account/deposit', payload: converted });
    } catch (error) {
      console.log('currency api error:', error);
    }

    // Return action
  };
};

export default accountSlice.reducer;
export const { withdraw, requestLoan, payLoan } = accountSlice.actions;
