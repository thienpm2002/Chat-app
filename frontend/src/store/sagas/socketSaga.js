import { call, put, take, fork, cancel} from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import {actionSocket} from '../slices/socketSlice.js'
import { initSocket,disconnectSocket } from "../../services/socket.js";
import {actions} from '../slices/authSlice.js'
// 1. Tạo channel để gom sự kiện socket
function* createEventChannel(socket) {
    return eventChannel(emit => {
        socket.on("connect", () => {
            console.log("✅ Socket connected:", socket.id);
            emit({ type: "SOCKET_CONNECTED" });
        });
        socket.on("disconnect", () => {
            console.log("❌ Socket disconnected");
            emit({ type: "SOCKET_DISCONNECTED" });
        });

        // cleanup khi channel close
        return () => {
            socket.off("connect");
            socket.off("disconnect");
        };
    })
}
// 2. Saga để lắng nghe socket
function* watchSocketEvents(socket){
    const channel = yield call(createEventChannel,socket);

    while(true){
        const action = yield take(channel);

        // ở đây mình có thể dispatch sang Redux
        if (action.type === "SOCKET_CONNECTED") {
        console.log("Saga nhận sự kiện CONNECT");
        yield put(actionSocket.socketConnect());
        } else if (action.type === "SOCKET_DISCONNECTED") {
        console.log("Saga nhận sự kiện DISCONNECT");
        yield put(actionSocket.socketDisconnect()); // clear redux state
        disconnectSocket();
        }
    }
}

// 3. Entry point: chạy saga khi có socket trong redux
function* socketSaga() {
  while (true) {
    // lấy socket
    yield take(actions.authSuccess.type);
    const token = localStorage.getItem("accessToken");
    if (token) {
      // khi có socket → fork saga lắng nghe
      const socket = initSocket(token);
      const task = yield fork(watchSocketEvents, socket);
       // Nếu logout → hủy lắng nghe socket
      yield take(actions.logout.type);
      yield cancel(task);
      disconnectSocket();
    }
  }
}

export default socketSaga;