import { delay, put, takeEvery } from 'redux-saga/effects';

import { PayloadAction } from '@reduxjs/toolkit';

import { beginCountdownToTime, disableRefresh, updateCountdown } from './slice';

const getSecondsToTargetTime = (targetTimestamp: number): number => {
  const now = new Date().getTime();
  const differenceInMs = targetTimestamp * 1000 - now;
  return Math.floor(differenceInMs / 1000);
};

function* beginCountdownToTimeSaga(action: PayloadAction<number>) {
  let secondsRemaining = getSecondsToTargetTime(action.payload);

  yield put(disableRefresh(true));

  while (secondsRemaining > 0) {
    yield delay(1000);
    secondsRemaining -= 1;
    yield put(updateCountdown(secondsRemaining));
  }

  yield put(disableRefresh(false));
}

export default function* countdownSagas() {
  yield takeEvery(beginCountdownToTime.type, beginCountdownToTimeSaga);
}
