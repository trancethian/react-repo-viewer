import { call, put, takeLatest } from 'redux-saga/effects';

import { fetchGitSession, IFetchGitSessionResponse } from '@/api/gitSession';

import { resetGitRepoState } from '../gitRepo/slice';
import {
  fetchGitSessionFailure,
  fetchGitSessionRequest,
  fetchGitSessionSuccess,
} from '../gitSession/slice';

function* fetchGitSessionSaga() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const response: IFetchGitSessionResponse = yield call(fetchGitSession);
    yield put(fetchGitSessionSuccess(response));
    yield put(resetGitRepoState());
  } catch (error) {
    console.log('error', error);
    yield put(fetchGitSessionFailure({ error: 'Failed to fetch Git session data' }));
  }
}

export default function* gitRepoSagas() {
  yield takeLatest(fetchGitSessionRequest.type, fetchGitSessionSaga);
}
