import React from 'react';
import { mountSmart, shallowSmart, mockStore } from "helpers/tests/enzymeHelpers";
import Users from 'pages/users';

describe('Users', () => {
    const store = mockStore({ users: [], user: { lead: false } });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<Users/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<Users/>, store);
        expect(wrap.find('Users')).toHaveLength(1);
    });
    it('should render full page for admin', () => {
        const wrap = mountSmart(<Users/>, store);
        expect(wrap.find('PageItemsLayout')).toHaveLength(1);
        expect(wrap.find('UsersTable')).toHaveLength(1);
    });
    it('should render resetedUsers table', () => {
        const store = mockStore({ users: [{ id: 2, reset_pass: true }], user: { lead: false } });
        const wrap = mountSmart(<Users/>, store);
        expect(wrap.find('ResetedUsersTable')).toHaveLength(1);
    });
    it('should not render resetedUsers table', () => {
        const store = mockStore({ users: [{ id: 2, reset_pass: true }], user: { lead: true } });
        const wrap = mountSmart(<Users/>, store);
        expect(wrap.find('ResetedUsersTable')).toHaveLength(0);
    });
    it('should render invitations table', () => {
        const store = mockStore({ invitations: [{ id: 2, reset_pass: true }], user: { lead: false } });
        const wrap = mountSmart(<Users/>, store);
        expect(wrap.find('InvitationsTable')).toHaveLength(1);
    });
    it('should not render invitations table', () => {
        const store = mockStore({ invitations: [{ id: 2, reset_pass: true }], user: { lead: true } });
        const wrap = mountSmart(<Users/>, store);
        expect(wrap.find('InvitationsTable')).toHaveLength(0);
    });
    it('should not render resetedUsers table if they are empty', () => {
        const store = mockStore({ invitations: [], user: { lead: false } });
        const wrap = mountSmart(<Users/>, store);
        expect(wrap.find('InvitationsTable')).toHaveLength(0);
    });
    it('should render all users', () => {
        const store = mockStore({ users: [{ }, { lead: true }, { }], user: { role_id: 'admin' } });
        const wrap = mountSmart(<Users/>, store);
        wrap.find('Button__CommonButton').first().simulate('click');
        expect(wrap.find('UsersTable').getElement().props.users).toEqual([{ }, { lead: true }, { }]);
    });
    it('should render only vaults which are leads and not admin', () => {
        const store = mockStore({ users: [{ }, { lead: true }, { lead: true, role_id: 'admin' }], user: { role_id: 'admin' } });
        const wrap = mountSmart(<Users/>, store);
        wrap.find('Button__CommonButton').at(1).simulate('click');
        expect(wrap.find('UsersTable').getElement().props.users).toEqual([{ lead: true }]);
    });
});
