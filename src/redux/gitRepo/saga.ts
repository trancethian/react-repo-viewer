import { AxiosError } from 'axios';
import { call, delay, put, takeLatest } from 'redux-saga/effects';

import { API_LIMIT_REACHED } from '@/constants/api';
import { PayloadAction } from '@reduxjs/toolkit';

import { fetchPublicRepos, IFetchPublicReposResponse } from '../../api/gitRepo';
import { beginCountdownToTime } from '../countdown/slice';
import {
  fetchGitSessionRequest,
  fetchGitSessionSuccess,
  IGitSessionState,
} from '../gitSession/slice';

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
    let rateLimitReached = false;
    yield put(setFetchRepositoriesLoading(true));

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const response: IFetchPublicReposResponse = yield call(fetchPublicRepos, {
      ...action.payload,
    });
    const { session } = response;

    if (session) {
      const { remaining, limit, reset } = session.resources.search;
      const newState: IGitSessionState = {
        rateRemaining: remaining,
        rateLimit: limit,
        rateResetTimestamp: reset,
        rateLimitReached: false,
        error: null,
      };
      rateLimitReached = remaining <= 0;
      newState.rateLimitReached = rateLimitReached;

      if (rateLimitReached) {
        yield put(beginCountdownToTime(reset));
      }
      yield put(fetchGitSessionSuccess(newState));
    }

    yield put(fetchRepositoriesSuccess(response));
  } catch (error) {
    console.error('error', error);
    let errorType: TGitRepoError = '';

    if (error instanceof AxiosError) {
      if (error.status == 403) {
        errorType = API_LIMIT_REACHED;
        yield put(fetchGitSessionRequest());
      }
    }
    yield put(fetchRepositoriesFailure({ type: errorType, error: 'Failed to fetch repositories' }));
  }
}

function* debouncedFetchReposSaga(action: PayloadAction<IGitRepoFetchPayload>) {
  yield delay(1000);
  yield fetchReposSaga(action);
}

export default function* gitRepoSagas() {
  yield takeLatest(fetchRepositoriesRequest.type, debouncedFetchReposSaga);
}
