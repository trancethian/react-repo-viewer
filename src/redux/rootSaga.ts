import { all, type AllEffect, fork, type ForkEffect } from 'redux-saga/effects';

import countdownSagas from './countdown/saga';
import gitRepoSagas from './gitRepo/saga';
import gitSessionSagas from './gitSession/saga';

export default function* rootSaga(): Generator<AllEffect<ForkEffect<void>>, void, unknown> {
  yield all([fork(gitRepoSagas), fork(gitSessionSagas), fork(countdownSagas)]);
}
