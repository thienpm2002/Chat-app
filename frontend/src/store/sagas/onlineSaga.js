import { call, put, take, fork, cancel} from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { onlineActions } from "../slices/onlineSlice";
import { getSocket } from "../../services/socket.js";
import { actionSocket } from "../slices/socketSlice";


// 1. Tạo channel để gom sự kiện socket
function* createEventChannel(socket) {
    return eventChannel(emit => {
        socket.on('onlineUsers',(data) => {
            emit({type:'LIST_USER_ONLINE', payload: data});
        })

        socket.on('user_online',(data) => {
            emit({type:'USER_ONLINE', payload: data});
        })

        socket.on('user_offline',(data) => {
            emit({type:'USER_OFFLINE', payload: data});
        })

        // cleanup khi channel close
        return () => {
            socket.off("onlineUsers");
            socket.off("user_online");
            socket.off("user_offline");
        };
    })
}

// 2. Saga để lắng nghe socket
function* watchSocketEvents(socket){
    const channel = yield call(createEventChannel,socket);

    while(true){
        const action = yield take(channel);

        // ở đây mình có thể dispatch sang Redux
        if (action.type === "LIST_USER_ONLINE") {
            console.log("Saga nhận sự kiện LIST_USER_ONLINE");
            yield put(onlineActions.getUserOnlines(action.payload));
        } else if (action.type === "USER_ONLINE") {
            console.log("Saga nhận sự kiện USER_ONLINE");
            yield put(onlineActions.userOnline(action.payload));
        }else {
             console.log("Saga nhận sự kiện USER_OFFLINE");
             yield put(onlineActions.userOffline(action.payload));
        }
    }
}

// 3. Entry point: chạy saga khi có socket trong redux
function* onlineSaga() {

  while (true) {
    // Dợi khi có action socket connect
    yield take(actionSocket.socketConnect.type);
    const task = yield fork(watchSocketEvents, getSocket());

    // Nếu logout → hủy lắng nghe socket
    yield take(actionSocket.socketDisconnect.type);
    yield cancel(task);
  }
}

export default onlineSaga;