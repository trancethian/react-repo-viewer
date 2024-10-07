import { IGitSession } from '@/common/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IGitSessionState {
  rateLimit: number;
  rateRemaining: number;
  rateResetTimestamp: number;
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
    fetchGitSessionSuccess(state, action: PayloadAction<IGitSession>) {
      state.error = null;
      state.rateLimit = action.payload.resources.search.limit;
      state.rateRemaining = action.payload.resources.search.remaining;
      state.rateResetTimestamp = action.payload.resources.search.reset * 1000;
    },
    fetchGitSessionFailure(state, action: PayloadAction<{ error: string }>) {
      state.error = { message: action.payload.error };
    },
  },
});

export const { fetchGitSessionRequest, fetchGitSessionSuccess, fetchGitSessionFailure } =
  gitSessionSlice.actions;

export default gitSessionSlice.reducer;
