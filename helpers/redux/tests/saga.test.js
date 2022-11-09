import { createSaga } from 'helpers/redux/saga';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { authRequest } from 'helpers/auth/headers';
import actions from "redux/actions/notifyActions";

describe('createSaga', () => {
    let mockRequest; let mockSuccess; let mockError; let saga; let resolve; let reject; let 
        data;
    beforeEach(() => {
        mockRequest = jest.fn(async () => 'requestResult'); 
        mockSuccess = jest.fn(payload => payload); 
        mockError = jest.fn(() => ({}));  
        saga = createSaga(mockRequest, { successAction: mockSuccess, errorAction: mockError });
        resolve = jest.fn();
        reject = jest.fn();
        data = { payload: 'id', resolve, reject, ctx: { data: 'data' } };
    });
    it('should put SUCCESS', () => {
        return expectSaga(saga, data)
            .provide([
                [matchers.call.fn(authRequest, mockRequest, data), { data: 'requestResult' }],
                [matchers.fork.fn(resolve), {}],
            ])
            .put(mockSuccess({ payload: 'requestResult', other: {} }))
            .put(actions.showNotify({ payload: { type: 'success', message: undefined } }))
            .run();
    });
    it('should put ERROR if it was passed', () => {
        return expectSaga(saga, data)
            .provide([
                [matchers.call.fn(authRequest, mockRequest, data), throwError('error')],
                [matchers.fork.fn(reject), {}],
            ])
            .put(mockError())
            .put(actions.showNotify({ payload: { type: 'error', message: 'error' } }))
            .run();
    });
    it('should not put showErrorNotify if showError is false', () => {
        return expectSaga(createSaga(mockRequest, { successAction: mockSuccess }, { showError: false }), data)
            .provide([
                [matchers.call.fn(authRequest, mockRequest, data), throwError('error')],
                [matchers.fork.fn(reject), {}],
            ])
            .not.put(mockError())
            .not.put(actions.showNotify({ payload: { type: 'error', message: 'error' } }))
            .run();
    });
    it('should not put ERROR if it was not passed', () => {
        return expectSaga(createSaga(mockRequest, { successAction: mockSuccess }), data)
            .provide([
                [matchers.call.fn(authRequest, mockRequest, data), throwError('error')],
                [matchers.fork.fn(reject), {}],
            ])
            .not.put(mockError())
            .put(actions.showNotify({ payload: { type: 'error', message: 'error' } }))
            .run();
    });
    it('should put ERROR and call on Error if passed', () => {
        const mockOnError = jest.fn();
        return expectSaga(createSaga(mockRequest, { successAction: mockSuccess, errorAction: mockError, onError: mockOnError }), data)
            .provide([
                [matchers.call.fn(authRequest, mockRequest, data), throwError('error')],
                [matchers.fork.fn(reject), {}],
                [matchers.fork.fn(mockOnError), { data: 'data' }],
            ])
            .put(mockError())
            .fork(mockOnError, { data: 'data' })
            .put(actions.showNotify({ payload: { type: 'error', message: 'error' } }))
            .run();
    });
    it('should put ERROR and call on Error if passed with unknownError message', () => {
        const mockOnError = jest.fn();
        return expectSaga(createSaga(mockRequest, { successAction: mockSuccess, errorAction: mockError, onError: mockOnError }), data)
            .provide([
                [matchers.call.fn(authRequest, mockRequest, data), throwError(undefined)],
                [matchers.fork.fn(reject), {}],
                [matchers.fork.fn(mockOnError), { data: 'data' }],
            ])
            .put(mockError())
            .fork(mockOnError, { data: 'data' })
            .put(actions.showNotify({ payload: { type: 'error', message: 'Something went wrong' } }))
            .run();
    });
    it('should put SUCCESS and call on Success if passed', () => {
        const mockOnSuccess = jest.fn();
        return expectSaga(createSaga(mockRequest, { successAction: mockSuccess, errorAction: mockError, onSuccess: mockOnSuccess }), data)
            .provide([
                [matchers.call.fn(authRequest, mockRequest, data), { data: 'successData', info: { data: {} } }],
                [matchers.fork.fn(resolve), {}],
                [matchers.fork.fn(mockOnSuccess), { data: 'data' }],
            ])
            .put(mockSuccess({ payload: 'successData', other: { info: { data: {} } } }))
            .fork(mockOnSuccess, { data: 'data' }, 'successData')
            .put(actions.showNotify({ payload: { type: 'success', message: undefined } }))
            .run();
    });
    it('should put SUCCESS and return payload data', () => {
        const mockOnSuccess = jest.fn();
        return expectSaga(createSaga(mockRequest, { successAction: mockSuccess, errorAction: mockError, onSuccess: mockOnSuccess }, { paramsInstead: true }), data)
            .provide([
                [matchers.call.fn(authRequest, mockRequest, data), { data: 'successData' }],
                [matchers.fork.fn(resolve), {}],
                [matchers.fork.fn(mockOnSuccess), { data: 'data' }],
            ])
            .put(mockSuccess({ payload: 'id', other: undefined }))
            .fork(mockOnSuccess, { data: 'data' }, 'successData')
            .put(actions.showNotify({ payload: { type: 'success', message: undefined } }))
            .run();
    });
});
