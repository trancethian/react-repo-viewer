import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IGitRepo, IGitSession } from '../../common/interfaces';
import { RootState } from '../store';

interface IGitRepoState {
  session: IGitSession | null;
  repositories: IGitRepo[];
  loading: boolean;
  error: string | null;
  page: number;
  searchName: string;
}

export interface IGitRepoFetchPayload {
  page: number;
  searchName: string;
}

const initialState: IGitRepoState = {
  session: null,
  repositories: [],
  loading: false,
  error: null,
  page: 1, // Default page
  searchName: '',
};

export const getGitRepoState = (state: RootState): IGitRepoState => state.gitRepo;

export const gitRepoSlice = createSlice({
  name: 'gitRepo',
  initialState,
  reducers: {
    fetchRepositoriesRequest(state, action: PayloadAction<{ page: number }>) {
      state.loading = true;
      state.error = null;
      state.page = action.payload.page;
    },
    fetchRepositoriesByName(state, action: PayloadAction<{ searchName: string }>) {
      state.error = null;
      state.searchName = action.payload.searchName;
    },
    fetchRepositoriesSuccess(
      state,
      action: PayloadAction<{ session: IGitSession | null; repositories: IGitRepo[] }>,
    ) {
      state.loading = false;
      state.session = action.payload.session;
      state.repositories = action.payload.repositories;
      state.error = null;
    },
    fetchRepositoriesFailure(state, action: PayloadAction<{ error: string }>) {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const {
  fetchRepositoriesRequest,
  fetchRepositoriesByName,
  fetchRepositoriesSuccess,
  fetchRepositoriesFailure,
} = gitRepoSlice.actions;

export default gitRepoSlice.reducer;
