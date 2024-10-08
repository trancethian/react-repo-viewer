import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IGitSessionState {
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
    fetchGitSessionRequest(state) {
      state.error = null;
    },
    fetchGitSessionSuccess(state, action: PayloadAction<IGitSessionState>) {
      const newState = action.payload;
      state.error = null;
      state.rateLimit = newState.rateLimit;
      state.rateRemaining = newState.rateRemaining;
      state.rateResetTimestamp = newState.rateResetTimestamp * 1000;
      state.rateLimitReached = newState.rateLimitReached;
    },
    fetchGitSessionFailure(state, action: PayloadAction<{ error: string }>) {
      state.error = { message: action.payload.error };
    },
  },
});

export const { fetchGitSessionRequest, fetchGitSessionSuccess, fetchGitSessionFailure } =
  gitSessionSlice.actions;

export default gitSessionSlice.reducer;
