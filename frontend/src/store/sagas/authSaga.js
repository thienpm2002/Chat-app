import { call, put, takeLatest } from "redux-saga/effects";

import publicApi from "../../services/axoisPublicApi.js";
import api from "../../services/axois.js";

import {actions} from '../slices/authSlice.js'
import { actionChats } from "../slices/chatSlice.js";

function* loginSaga(action){
    try {
        let res;
        if(action.payload.user_name){
            res = yield call(publicApi.post,'auth/register',action.payload);
        }else{
            const payload = {
                email: action.payload.email,
                password: action.payload.password
            };
           res = yield call(publicApi.post,'auth/login',payload);
        }
        localStorage.setItem('accessToken', res.accessToken);
        const profile = yield call(api.get,'/user/me');
        const users = yield call(api.get,'/user');
        const notifications = yield call(api.get,'/notification');
        yield put(actions.authSuccess(profile));
        yield put(actionChats.getUserChats(users));
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('profile', JSON.stringify(profile));
        localStorage.setItem('notifications', JSON.stringify(notifications || []));
    } catch (error) {
        yield put(actions.authFailure(error.message));
    }
}

function* logoutSaga(){
    try {
        yield call(publicApi.post,'/auth/logout');
        yield put (actions.logoutSuccess());
    } catch (error) {
        yield put(actions.logoutFailure(error.message));
    }
}

export default function* authSaga(){
    yield takeLatest(actions.authRequest.type, loginSaga);
    yield takeLatest(actions.logoutRequest.type, logoutSaga);
}
