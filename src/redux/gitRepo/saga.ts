import { AxiosError } from 'axios';
import { call, delay, put, takeLatest } from 'redux-saga/effects';

import { PayloadAction } from '@reduxjs/toolkit';

import { fetchPublicRepos, IFetchPublicReposResponse } from '../../api/gitRepo';
import { setGitSession } from '../gitSession/slice';

import {
  fetchRepositoriesFailure,
  fetchRepositoriesRequest,
  fetchRepositoriesSuccess,
  IGitRepoFetchPayload,
  setFetchRepositoriesLoading,
  TGitRepoError,
} from './slice';

function* fetchReposSaga(action: PayloadAction<IGitRepoFetchPayload>) {
  try {
    yield put(setFetchRepositoriesLoading(true));

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const response: IFetchPublicReposResponse = yield call(fetchPublicRepos, {
      ...action.payload,
    });
    yield put(fetchRepositoriesSuccess(response));

    if (response.session) {
      yield put(setGitSession(response.session));
    }
  } catch (error) {
    console.log('error', error);
    let errorMsg = 'Failed to fetch repositories';
    let errorType: TGitRepoError = '';

    if (error instanceof AxiosError) {
      if (error.code == '403') {
        errorType = 'API_LIMIT_REACHED';
      }
      errorMsg = error.message;
    }
    yield put(fetchRepositoriesFailure({ type: errorType, error: errorMsg }));
  }
}

function* debouncedFetchReposSaga(action: PayloadAction<IGitRepoFetchPayload>) {
  yield delay(1000);
  yield fetchReposSaga(action);
}

export default function* gitRepoSagas() {
  yield takeLatest(fetchRepositoriesRequest.type, debouncedFetchReposSaga);
}
