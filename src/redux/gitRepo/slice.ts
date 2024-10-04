import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGitRepo } from '../../common/interfaces';

interface IGitRepoState {
  repositories: IGitRepo[];
  loading: boolean;
  error: string | null;
  page: number;
}

export interface IGitRepoFetchPayload {
  page: number;
}

const initialState: IGitRepoState = {
  repositories: [],
  loading: false,
  error: null,
  page: 1, // Default page
};

export const gitRepoSlice = createSlice({
  name: 'gitRepo',
  initialState,
  reducers: {
    fetchRepositoriesRequest(state, action: PayloadAction<IGitRepoFetchPayload>) {
      state.loading = true;
      state.error = null;
      state.page = action.payload.page;
    },
    fetchRepositoriesSuccess(state, action: PayloadAction<{ repositories: IGitRepo[] }>) {
      state.loading = false;
      state.repositories = action.payload.repositories;
      state.error = null;
    },
    fetchRepositoriesFailure(state, action: PayloadAction<{ error: string }>) {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const { fetchRepositoriesRequest, fetchRepositoriesSuccess, fetchRepositoriesFailure } =
  gitRepoSlice.actions;

export default gitRepoSlice.reducer;
