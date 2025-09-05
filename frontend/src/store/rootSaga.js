import { all } from "redux-saga/effects";
import authSaga from "./sagas/authSaga.js";
import socketSaga from "./sagas/socketSaga.js";
import onlineSaga from "./sagas/onlineSaga.js";
// import chatSaga from "./sagas/chatSaga.js";

export default function* rootSaga() {
  yield all([
    authSaga(),
    socketSaga(), 
    onlineSaga(),
    // chatSaga(),
  ]);
}