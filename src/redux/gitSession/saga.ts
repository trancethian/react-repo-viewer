import { call, put, takeLatest } from 'redux-saga/effects';

import { fetchGitSession, IFetchGitSessionResponse } from '@/api/gitSession';

import { beginCountdownToTime } from '../countdown/slice';
import {
  fetchGitSessionFailure,
  fetchGitSessionRequest,
  fetchGitSessionSuccess,
  IGitSessionState,
} from '../gitSession/slice';

function* fetchGitSessionSaga() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const response: IFetchGitSessionResponse = yield call(fetchGitSession);
    const { remaining, limit, reset } = response.resources.search;
    const newState: IGitSessionState = {
      rateRemaining: remaining,
      rateLimit: limit,
      rateResetTimestamp: reset,
      rateLimitReached: false,
      error: null,
    };
    const rateLimitReached = remaining <= 0;

    newState.rateLimitReached = rateLimitReached;

    if (rateLimitReached) {
      yield put(beginCountdownToTime(reset));
    }
    yield put(fetchGitSessionSuccess(newState));
  } catch (error) {
    console.error('error', error);
    yield put(fetchGitSessionFailure({ error: 'Failed to fetch Git session data' }));
  }
}

export default function* gitRepoSagas() {
  yield takeLatest(fetchGitSessionRequest.type, fetchGitSessionSaga);
}
