import { IGitSession } from '@/common/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IGitSessionState {
  rateLimit: number;
  rateRemaining: number;
  rateResetTimestamp: number;
  rateLimitReached: boolean;
  error: { message: string | null } | null;
}

const initialState: Partial<IGitSessionState> = {};

export const gitSessionSlice = createSlice({
  name: 'gitSession',
  initialState,
  reducers: {
    setGitSession(state, action: PayloadAction<IGitSession>) {
      state.error = null;
      state.rateLimit = action.payload.rate.limit;
      state.rateRemaining = action.payload.rate.remaining;
      state.rateResetTimestamp = action.payload.rate.reset * 1000;
      state.rateLimitReached = action.payload.rate.remaining <= 0;
    },
  },
});

export const { setGitSession } = gitSessionSlice.actions;

export default gitSessionSlice.reducer;
