import { put, fork, call } from 'redux-saga/effects';
import { authRequest } from 'helpers/auth/headers';
import actions from "redux/actions/notifyActions";
import _ from 'lodash';

export const createSaga = (request, { successAction, errorAction, onSuccess, onError }, { successId, showError = true, paramsInstead } = {}) => {
    return function* saga({ payload, resolve, reject, ctx }) {
        try {
            const response = yield call(authRequest, request, { payload, ctx });
            const data = _.get(response, 'data', response);
            const restData = _.omit(response, 'data');
            yield put(successAction({ payload: paramsInstead ? payload : data, other: paramsInstead ? undefined : restData }));
            yield put(actions.showNotify({ payload: { type: 'success', message: successId } }));
            if (onSuccess) yield fork(onSuccess, ctx, data);
            yield fork(resolve, data);
        } catch (error) {   
            if (errorAction) yield put(errorAction());
            if (onError) yield fork(onError, ctx);
            if (showError) yield put(actions.showNotify({ payload: { type: 'error', message: error || 'Something went wrong' } }));
            yield fork(reject, error);
        }
    };
};
