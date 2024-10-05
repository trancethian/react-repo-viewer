import { IFetchPublicReposResponse } from '@/api/gitRepo';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IGitRepo, IGitSession } from '../../common/interfaces';
import { RootState } from '../store';

interface IGitRepoState {
  session: IGitSession | null;
  repositories: IGitRepo[];
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
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
  page: 1,
  hasMore: false,
  searchName: '',
};

export const getGitRepoState = (state: RootState): IGitRepoState => state.gitRepo;

export const gitRepoSlice = createSlice({
  name: 'gitRepo',
  initialState,
  reducers: {
    setFetchRepositoriesLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    fetchRepositoriesRequest(state, action: PayloadAction<{ searchName: string; page: number }>) {
      if (state.searchName != action.payload.searchName) {
        state.repositories = [];
        state.page = 1;
      }
      if (state.page != action.payload.page) {
        state.loading = true;
      }
      state.error = null;
      state.page = action.payload.page;
      state.searchName = action.payload.searchName;
    },
    fetchRepositoriesSuccess(state, action: PayloadAction<IFetchPublicReposResponse>) {
      const newRepositories = state.repositories.concat(action.payload.repositories);
      state.loading = false;
      state.session = action.payload.session;
      state.repositories = newRepositories;
      state.hasMore =
        newRepositories.length > 0 && newRepositories.length < action.payload.totalCount;
      state.error = null;
    },
    fetchRepositoriesFailure(state, action: PayloadAction<{ error: string }>) {
      state.loading = false;
      state.hasMore = false;
      state.repositories = [];
      state.error = action.payload.error;
    },
  },
});

export const {
  setFetchRepositoriesLoading,
  fetchRepositoriesRequest,
  fetchRepositoriesSuccess,
  fetchRepositoriesFailure,
} = gitRepoSlice.actions;

export default gitRepoSlice.reducer;
