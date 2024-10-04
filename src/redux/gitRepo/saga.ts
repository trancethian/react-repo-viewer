// sagas.js
import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { fetchPublicRepos, IFetchGitReposResponse } from '../../api/gitRepo';
import {
  fetchRepositoriesRequest,
  fetchRepositoriesSuccess,
  fetchRepositoriesFailure,
  IGitRepoFetchPayload,
} from './slice';

function* fetchReposSaga(action: PayloadAction<IGitRepoFetchPayload>) {
  try {
    const { session, repositories }: IFetchGitReposResponse = yield call(
      fetchPublicRepos,
      action.payload.page,
    );
    yield put(fetchRepositoriesSuccess({ session, repositories }));
  } catch (error: any) {
    yield put(fetchRepositoriesFailure({ error: error.message }));
  }
}

export default function* gitRepoSagas() {
  yield takeLatest(fetchRepositoriesRequest.type, fetchReposSaga);
}
