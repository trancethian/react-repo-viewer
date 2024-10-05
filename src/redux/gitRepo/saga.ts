// sagas.js
import { call, put, takeLatest } from 'redux-saga/effects';

import { PayloadAction } from '@reduxjs/toolkit';

import { fetchPublicRepos, IFetchGitReposResponse } from '../../api/gitRepo';

import {
  fetchRepositoriesFailure,
  fetchRepositoriesRequest,
  fetchRepositoriesSuccess,
  IGitRepoFetchPayload,
} from './slice';

function* fetchReposSaga(action: PayloadAction<IGitRepoFetchPayload>) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { session, repositories }: IFetchGitReposResponse = yield call(
      fetchPublicRepos,
      action.payload.page,
    );
    yield put(fetchRepositoriesSuccess({ session, repositories }));
  } catch (error) {
    let errMsg = 'Failed to fetch repositories';

    if (error instanceof Error) {
      errMsg = error.message;
    }
    yield put(fetchRepositoriesFailure({ error: errMsg }));
  }
}

export default function* gitRepoSagas() {
  yield takeLatest(fetchRepositoriesRequest.type, fetchReposSaga);
}
