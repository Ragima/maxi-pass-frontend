import React from 'react';
import { mountSmart, shallowSmart, mockStore, resizeTo } from "helpers/tests/enzymeHelpers";
import ResetedUsersTable from 'components/Tables/ResetedUsersTable';
import WResetedUsersTable from 'components/Tables/ResetedUsersTable/ResetedUsersTable';

describe('ResetedUsersTable', () => {
    const props = { users: [{ name: 'name', email: 'email', role_id: 'role', reset_pass: true }] };
    const store = mockStore({ });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<ResetedUsersTable {...props}/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<ResetedUsersTable {...props}/>, store);
        expect(wrap.find('ResetedUsersTable')).toHaveLength(1);
    });
    it('should render its children', () => {
        const wrap = mountSmart(<ResetedUsersTable {...props}/>, store);
        expect(wrap.find('TableHeaderCell')).toHaveLength(4);
        expect(wrap.find('TableRow')).toHaveLength(2);
    });
    it('should render 10 cells if computer', () => {
        resizeTo('computer');
        const wrap = mountSmart(<ResetedUsersTable {...props}/>, store);
        expect(wrap.find('TableCell')).toHaveLength(8);
    });
    it('should render Link if not admin', () => {
        resizeTo('computer');
        const wrap = mountSmart(<ResetedUsersTable {...props}/>, store);
        expect(wrap.find('Link')).toHaveLength(1);
    });
    it('should not render Link if admin', () => {
        resizeTo('computer');
        const props = { users: [{ name: 'name', email: 'email', role_id: 'admin' }] };
        const wrap = mountSmart(<ResetedUsersTable {...props}/>, store);
        expect(wrap.find('Link')).toHaveLength(0);
    });
    it('should render 1 cell if mobile', () => {
        resizeTo('mobile');
        const wrap = mountSmart(<ResetedUsersTable {...props}/>, store);
        expect(wrap.find('TableCell')).toHaveLength(2);
    });
    it('should not render actions if not user', () => {
        resizeTo('computer');
        const wrap = mountSmart(<ResetedUsersTable {...props}/>, store);
        expect(wrap.find('Icon')).toHaveLength(2);
    });
    it('should render actions if user', () => {
        const props = { users: [{ name: 'name', email: 'email', role_id: 'user' }] };
        resizeTo('computer');
        const wrap = mountSmart(<ResetedUsersTable {...props}/>, store);
        expect(wrap.find('Icon')).toHaveLength(2);
    });
    it('should call delete user', () => {
        resizeTo('computer');
        const props = { users: [{ name: 'name', email: 'email', role_id: 'user' }] };
        const restoreUser = jest.fn();
        const wrap = mountSmart(<WResetedUsersTable {...props} restoreUser={restoreUser} intl={{ formatMessage: jest.fn() }}/>);
        wrap.find('Icon').last().getElement().props.onClick();
        expect(restoreUser).toBeCalled();
    });
});
