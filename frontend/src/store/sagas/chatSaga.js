// import { call, put, takeLatest } from "redux-saga/effects";
// import { actionChats } from "../slices/chatSlice";
// import chatApi from "../../services/chatApi";
// import userApi from "../../services/userApi";

// function* updateChatSaga(action) {
//   try {
//     const chat = yield call(chatApi.createChat, action.payload);
//     yield put(actionChats.updateChatsSuccess(chat));
//   } catch (error) {
//     yield put(actionChats.updateChatsFailure(error.message));
//   }
// }

// export default function* chatSaga() {
//   yield takeLatest(actionChats.updateChatsRequest.type, updateChatSaga);
// }
