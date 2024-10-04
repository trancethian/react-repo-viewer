// sagas.js
import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { fetchPublicRepos } from '../../api/gitRepo';
import {
  fetchRepositoriesRequest,
  fetchRepositoriesSuccess,
  fetchRepositoriesFailure,
  IGitRepoFetchPayload,
} from './slice';
import { IGitRepo } from '../../common/interfaces';

function* fetchReposSaga(action: PayloadAction<IGitRepoFetchPayload>) {
  try {
    const repositories: IGitRepo[] = yield call(fetchPublicRepos, action.payload.page);
    yield put(fetchRepositoriesSuccess({ repositories }));
  } catch (error: any) {
    yield put(fetchRepositoriesFailure({ error: error.message }));
  }
}

export default function* gitRepoSagas() {
  yield takeLatest(fetchRepositoriesRequest.type, fetchReposSaga);
}
