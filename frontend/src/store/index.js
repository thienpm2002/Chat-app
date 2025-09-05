import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import authReducer from './slices/authSlice.js';
import socketReducer from './slices/socketSlice.js'
import rootSaga from './rootSaga.js'
import onlineReducer from './slices/onlineSlice.js'
import chatReducer from './slices/chatSlice.js'

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        auth: authReducer,
        socket: socketReducer,
        status: onlineReducer,
        chat: chatReducer,
    },
    middleware: (getDefault) => getDefault().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga);



