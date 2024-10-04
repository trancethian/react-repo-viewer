import { all, type AllEffect, fork, type ForkEffect } from 'redux-saga/effects';

import gitRepoSagas from './gitRepo/saga';

export default function* rootSaga(): Generator<AllEffect<ForkEffect<void>>, void, unknown> {
  yield all([fork(gitRepoSagas)]);
}
