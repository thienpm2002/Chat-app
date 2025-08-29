import { call, put, takeLatest } from "redux-saga/effects";

import api from "../../services/axois.js";

import {actions} from '../slices/authSlice.js'


function* loginSaga(action){
    try {
        let res;
        if(action.payload.user_name){
            res = yield call(api.post,'auth/register',action.payload);
        }else{
            const payload = {
                email: action.payload.email,
                password: action.payload.password
            };
           res = yield call(api.post,'auth/login',payload);
        }
        localStorage.setItem('accessToken', res.accessToken);
        const profile = yield call(api.get,'/user/me');
        yield put(actions.authSuccess(profile));
        localStorage.setItem('profile', JSON.stringify(profile));
    } catch (error) {
        yield put(actions.authFailure(error.message));
    }
}

function* logoutSaga(){
    try {
        yield call(api.post,'/auth/logout');
        yield put(actionSocket.clearSocket());
    } catch (error) {
        yield put(actions.authFailure(error.message));
    }
}

export default function* authSaga(){
    yield takeLatest(actions.authRequest.type, loginSaga);
    yield takeLatest(actions.logout.type, logoutSaga);
}
