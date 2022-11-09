import React from 'react';
import { mountSmart, shallowSmart, mockStore, resizeTo } from "helpers/tests/enzymeHelpers";
import UsersTable from 'components/Tables/UsersTable';
import WUsersTable from 'components/Tables/UsersTable/UsersTable';

describe('UsersTable', () => {
    const props = { users: [{ name: 'name', email: 'email', role_id: 'role' }] };
    const store = mockStore({ user: { name: 'a', email: 'b' } });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<UsersTable {...props}/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<UsersTable {...props}/>, store);
        expect(wrap.find('UsersTable')).toHaveLength(1);
    });
    it('should render its children', () => {
        const wrap = mountSmart(<UsersTable {...props}/>, store);
        expect(wrap.find('TableHeaderCell')).toHaveLength(4);
        expect(wrap.find('TableRow')).toHaveLength(2);
    });
    it('should render 10 cells if computer', () => {
        resizeTo('computer');
        const wrap = mountSmart(<UsersTable {...props}/>, store);
        expect(wrap.find('TableCell')).toHaveLength(8);
    });
    it('should not render ConfirmModal if lead', () => {
        resizeTo('computer');
        const wrap = mountSmart(<UsersTable {...props} isLead/>, store);
        expect(wrap.find('ConfirmModal')).toHaveLength(0);
    });
    it('should render Link if not admin', () => {
        resizeTo('computer');
        const wrap = mountSmart(<UsersTable {...props}/>, store);
        expect(wrap.find('Link')).toHaveLength(1);
    });
    it('should not render Link if admin', () => {
        resizeTo('computer');
        const props = { users: [{ name: 'name', email: 'email', role_id: 'admin' }] };
        const wrap = mountSmart(<UsersTable {...props}/>, store);
        expect(wrap.find('Link')).toHaveLength(0);
    });
    it('should render 1 cell if mobile', () => {
        resizeTo('mobile');
        const wrap = mountSmart(<UsersTable {...props}/>, store);
        expect(wrap.find('TableCell')).toHaveLength(2);
    });
    it('should render actions', () => {
        const props = { users: [{ name: 'name', email: 'email', role_id: 'user' }, { email: 'email', role_id: 'admin' }] };
        resizeTo('computer');
        const wrap = mountSmart(<UsersTable {...props}/>, store);
        expect(wrap.find('Icon')).toHaveLength(2);
    });
    it('should call delete user', () => {
        resizeTo('computer');
        const props = { users: [{ name: 'name', email: 'email', role_id: 'user' }] };
        const deleteUser = jest.fn();
        const wrap = mountSmart(<WUsersTable {...props} deleteUser={deleteUser} intl={{ formatMessage: jest.fn() }}/>, store);
        wrap.find('Icon').last().simulate('click');
        wrap.find('ConfirmModal').last().getElement().props.callback();
        expect(deleteUser).toBeCalled();
    });   
    it('should call change user role', () => {
        resizeTo('computer');
        const props = { users: [{ name: 'name', email: 'email', role_id: 'user', id: 1 }, { name: 'name', email: 'email', role_id: 'user', id: 1 }] };
        const changeRole = jest.fn();
        const wrap = mountSmart(<WUsersTable {...props} changeUserRole={changeRole} intl={{ formatMessage: jest.fn() }}/>, store);
        wrap.find('Icon').last().simulate('click');
        wrap.find('ConfirmModal').first().getElement().props.callback({}, { value: 'admin' });
        expect(changeRole).toBeCalledWith({ role_id: 'admin', id: 1 });
    });
    it('should call toggle user block if user not blocked', () => {
        resizeTo('computer');
        const props = { users: [{ name: 'name', email: 'email', role_id: 'user', id: 2, blocked: false }] };
        const toggleBlock = jest.fn();
        const wrap = mountSmart(<WUsersTable {...props} toggleBlock={toggleBlock} intl={{ formatMessage: jest.fn() }}/>, store);
        wrap.find('Icon').last().simulate('click');
        wrap.find('Block__ListBlock').at(3).getElement().props.onClick();
        expect(toggleBlock).toBeCalledWith({ id: 2 });
    });
    it('should call toggle user block if user blocked', () => {
        resizeTo('computer');
        const props = { users: [{ name: 'name', email: 'email', role_id: 'user', id: 2, blocked: true, extension_access: true }] };
        const toggleBlock = jest.fn();
        const wrap = mountSmart(<WUsersTable {...props} toggleBlock={toggleBlock} intl={{ formatMessage: jest.fn() }}/>, store);
        wrap.find('Icon').last().simulate('click');
        wrap.find('Block__ListBlock').at(2).getElement().props.onClick();
        expect(toggleBlock).toBeCalledWith({ id: 2 });
    });
});
