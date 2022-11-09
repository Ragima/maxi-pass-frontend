import React from 'react';
import { mountSmart, shallowSmart, mockStore } from "helpers/tests/enzymeHelpers";
import User from 'pages/user';
import WUser from 'pages_components/User';

jest.mock('helpers/auth/redirect');


describe('User', () => {
    const store = mockStore({
        groups: [{ id: 14, users: [14] }, { id: 2, users: [14, 2], vaults: [2] }, { id: 3, users: [] }],
        users: [{ id: 14 }, { id: 2, groups: [3] }],
        vaults: [{ id: 1, users: [14] }, { id: 6, users: [3, 4] }, { id: 2, groups: [] }],
        relations: {
            group_vaults: [{ group_id: 2, vault_id: 2 }],
            group_users: [{ group_id: 14, user_id: 14 }, { group_id: 3, user_id: 2 }, { group_id: 2, user_id: 14 }, { group_id: 2, user_id: 2 }],
            user_vaults: [{ vault_id: 1, user_id: 14 }, { vault_id: 6, user_id: 3 }, { vault_id: 6, user_id: 4 }],
        },
    });
    let props = {};
    beforeEach(() => {
        props = {
            id: 14,
            user: { id: 14 },
            addGroupUser: jest.fn(),
            addUserVault: jest.fn(),
            removeGroupUser: jest.fn(),
            removeUserVault: jest.fn(),
            deleteUser: jest.fn(),
            groups: [{ id: 14, users: [14] }],
            users: [{ id: 14, groups: [8] }],
            vaults: [{ id: 1, users: [14], title: 'as' }],
            intl: { formatMessage: jest.fn() },
        };
    });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<User {...props}/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<User {...props}/>, store);
        expect(wrap.find('User')).toHaveLength(1);
    });
    it('should render GroupsVaults', () => {
        const data = {
            groups: [{ id: 14 }],
            vaults: [{ id: 3 }],
            groupVaults: [{ group_id: 14, vault_id: 3 }],
        };
        const wrap = mountSmart(<WUser {...props} {...data}/>, store);
        expect(wrap.find('GroupVaultsItem')).toHaveLength(1);
    });
    it('should get proper props', () => {
        const wrap = mountSmart(<User {...props}/>, store);
        expect(wrap.find('User').getElement().props.id).toEqual(14);
        expect(wrap.find('User').getElement().props.groups).toEqual([{ id: 14, users: [14] }, { id: 2, users: [14, 2], vaults: [2] }]);
        expect(wrap.find('User').getElement().props.vaults).toEqual([{ id: 1, users: [14] }]);
        expect(wrap.find('User').getElement().props.unrelatedGroups).toEqual([{ id: 3, users: [] }]);
        expect(wrap.find('User').getElement().props.unrelatedVaults).toEqual([{ id: 6, users: [3, 4] }, { id: 2, groups: [] }]);
    });
    it('should call addGroupUser', () => {
        const wrap = mountSmart(<WUser {...props}/>, store);
        wrap.find('ModalAddEntity').at(0).getElement().props.onSelect(5);
        expect(props.addGroupUser).toBeCalledWith({ group_id: 5, user_id: 14 });
    });
    it('should call addUserVault', () => {
        const wrap = mountSmart(<WUser {...props}/>, store);
        wrap.find('ModalAddEntity').at(1).getElement().props.onSelect(5);
        expect(props.addUserVault).toBeCalledWith({ user_id: 14, vault_id: 5 });
    });
    it('should call removeGroupUser', () => {
        const wrap = mountSmart(<WUser {...props}/>, store);
        wrap.find('.unlink').first().getElement().props.onClick();
        expect(props.removeGroupUser).toBeCalledWith({ group_id: 14, user_id: 14 });
    });
    it('should call removeUserVault', () => {
        const wrap = mountSmart(<WUser {...props}/>, store);
        wrap.find('VaultItem').first().getElement().props.onDelete();
        expect(props.removeUserVault).toBeCalledWith({ vault_id: 1, user_id: 14 });
    });
    it('should call deleteUser', async () => {
        process.browser = true;
        const wrap = mountSmart(<WUser {...props}/>, store);
        await wrap.find('ConfirmModal').first().getElement().props.callback();
        expect(props.deleteUser).toBeCalledWith({ id: 14 });
    });
});
