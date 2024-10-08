import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ICountdownState {
  countdown: number;
  isRefreshDisabled: boolean;
  targetTime: number;
}

const initialState: ICountdownState = {
  countdown: 0,
  isRefreshDisabled: false,
  targetTime: 0,
};

export const countdownSlice = createSlice({
  name: 'countdown',
  initialState,
  reducers: {
    beginCountdownToTime: (state, action: PayloadAction<number>) => {
      state.targetTime = action.payload;
    },
    updateCountdown: (state, action: PayloadAction<number>) => {
      state.countdown = action.payload;
    },
    disableRefresh: (state, action: PayloadAction<boolean>) => {
      state.isRefreshDisabled = action.payload;
    },
  },
});

export const { beginCountdownToTime, updateCountdown, disableRefresh } = countdownSlice.actions;

export default countdownSlice.reducer;
