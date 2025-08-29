import { all } from "redux-saga/effects";
import authSaga from "./sagas/authSaga.js";
import socketSaga from "./sagas/socketSaga.js";

export default function* rootSaga() {
  yield all([
    authSaga(),
    socketSaga(), // chạy saga socket
  ]);
}