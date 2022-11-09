import React from 'react';
import { mountSmart, shallowSmart, mockStore, checkDispatchedActions } from "helpers/tests/enzymeHelpers";
import NotificationsWrap from 'components/NotificationsWrap';
import { NotificationManager } from 'react-notifications';

jest.mock('react-notifications');

describe('NotificationsWrap', () => {
    it('should match snapshot', () => {
        const store = mockStore({ notify: {} });
        const wrap = shallowSmart(<NotificationsWrap/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const store = mockStore({ notify: {} });
        const wrap = mountSmart(<NotificationsWrap />, store);
        expect(wrap.find('NotificationsWrap')).toHaveLength(1);
    });
    it('should not render and call notify if type is not present', () => {
        const store = mockStore({ notify: { message: 'asd' } });
        mountSmart(<NotificationsWrap />, store);
        expect(checkDispatchedActions(store, [])).toBeTruthy();
    });
    it('should not render and call notify if message is not present', () => {
        const store = mockStore({ notify: { type: 'asd' } });
        mountSmart(<NotificationsWrap />, store);
        expect(checkDispatchedActions(store, [])).toBeTruthy();
    });
    it('should render and call notify if message and type are present', () => {
        const store = mockStore({ notify: { type: 'asd', message: 'asdas' } });
        mountSmart(<NotificationsWrap />, store);
        expect(checkDispatchedActions(store, ['CLEAR_NOTIFY'])).toBeTruthy();
    });
    it('should render formatted message if type is error', () => {
        const mockShow = jest.fn();
        NotificationManager.error.mockImplementationOnce(mockShow);
        const store = mockStore({ notify: { type: 'error', message: 'errorMessage' } });
        mountSmart(<NotificationsWrap />, store);
        expect(mockShow).toBeCalledWith('errorMessage', 'Error', 5000, null, true);
    });
    it('should render formatted message if type is success', () => {
        const mockShow = jest.fn();
        NotificationManager.success.mockImplementationOnce(mockShow);
        const store = mockStore({ notify: { type: 'success', message: 'loginSuccess' } });
        mountSmart(<NotificationsWrap />, store);
        expect(mockShow).toBeCalledWith('Succesfully logged in', 'Success', 5000, null, true);
    });
});
