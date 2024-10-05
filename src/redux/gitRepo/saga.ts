// sagas.js
import { call, delay, put, takeLatest } from 'redux-saga/effects';

import { PayloadAction } from '@reduxjs/toolkit';

import { fetchPublicRepos, IFetchPublicReposResponse } from '../../api/gitRepo';

import {
  fetchRepositoriesByName,
  fetchRepositoriesFailure,
  fetchRepositoriesRequest,
  fetchRepositoriesSuccess,
  IGitRepoFetchPayload,
} from './slice';

function* fetchReposSaga(action: PayloadAction<IGitRepoFetchPayload>) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { session, repositories }: IFetchPublicReposResponse = yield call(fetchPublicRepos, {
      ...action.payload,
    });
    yield put(fetchRepositoriesSuccess({ session, repositories }));
  } catch (error) {
    let errMsg = 'Failed to fetch repositories';

    if (error instanceof Error) {
      errMsg = error.message;
    }
    yield put(fetchRepositoriesFailure({ error: errMsg }));
  }
}

function* debouncedFetchReposSaga(action: PayloadAction<IGitRepoFetchPayload>) {
  yield delay(1000);
  yield fetchReposSaga(action);
}

export default function* gitRepoSagas() {
  yield takeLatest(fetchRepositoriesRequest.type, fetchReposSaga);
  yield takeLatest(fetchRepositoriesByName.type, debouncedFetchReposSaga);
}
