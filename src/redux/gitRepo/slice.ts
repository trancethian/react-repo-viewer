import { IFetchPublicReposResponse } from '@/api/gitRepo';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IGitRepo } from '../../common/interfaces';

interface IGitRepoState {
  repositories: IGitRepo[];
  loading: boolean;
  error: { type: TGitRepoError; message: string | null } | null;
  page: number;
  hasMore: boolean;
  searchName: string;
}

export interface IGitRepoFetchPayload {
  page: number;
  searchName: string;
}

export type TGitRepoError = '' | 'API_LIMIT_REACHED';

const initialState: IGitRepoState = {
  repositories: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: false,
  searchName: '',
};

export const gitRepoSlice = createSlice({
  name: 'gitRepo',
  initialState,
  reducers: {
    fetchRepositoriesRequest(state, action: PayloadAction<{ searchName: string; page: number }>) {
      if (state.searchName != action.payload.searchName) {
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
      const payloadRepositories = action.payload.repositories;
      const newRepositories =
        state.page == 1
          ? payloadRepositories
          : state.repositories.concat(action.payload.repositories);
      state.loading = false;
      state.repositories = newRepositories;
      state.hasMore =
        newRepositories.length > 0 && newRepositories.length < action.payload.totalCount;
      state.error = null;
    },
    fetchRepositoriesFailure(state, action: PayloadAction<{ type: TGitRepoError; error: string }>) {
      state.loading = false;
      state.hasMore = false;
      state.repositories = [];
      state.error = { type: action.payload.type, message: action.payload.error };
    },
    setFetchRepositoriesLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase('RESET_GIT_REPO', () => initialState); // Reset to initial state
  },
});

export const {
  fetchRepositoriesRequest,
  fetchRepositoriesSuccess,
  fetchRepositoriesFailure,
  setFetchRepositoriesLoading,
} = gitRepoSlice.actions;

export const resetGitRepoState = createAction('RESET_GIT_REPO');

export default gitRepoSlice.reducer;
