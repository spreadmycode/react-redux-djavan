import { fork, all } from 'redux-saga/effects';
import * as sagas from '../redux/sagas';

export default function* createSaga() {
  yield all(Object.values(sagas).map(fork));
}
