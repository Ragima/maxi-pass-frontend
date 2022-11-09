import React from 'react';
import { mountSmart, shallowSmart, mockStore } from "helpers/tests/enzymeHelpers";
import Group from 'pages/group';
import WGroup from 'pages_components/Group';

jest.mock('helpers/auth/redirect');

describe('Group', () => {
    const store = mockStore({
        groups: [{ id: 14, parent_group_id: null }, { id: 2, parent_group_id: 14 }, { id: 3, parent_group_id: null }],
        users: [{ id: 1, groups: [14] }, { id: 2, groups: [3] }],
        vaults: [{ id: 1, groups: [14] }, { id: 6, groups: [14] }, { id: 2, groups: [] }],
        relations: {
            group_vaults: [{ group_id: 14, vault_id: 1 }, { group_id: 14, vault_id: 6 }],
            group_users: [{ group_id: 14, user_id: 1 }, { group_id: 3, user_id: 2 }],
        },
        user: {},
    });
    let props = {};
    beforeEach(() => {
        props = {
            id: 14,
            group: { id: 14 },
            addGroupVault: jest.fn(),
            addGroupUser: jest.fn(),
            createInnerGroup: jest.fn(),
            removeGroupUser: jest.fn(),
            removeGroupVault: jest.fn(),
            deleteGroup: jest.fn(),
            groups: [{ id: 14, parent_group_id: null }, { id: 1, parent_group_id: 14 }],
            users: [{ id: 1, groups: [14], name: 'sd' }],
            vaults: [{ id: 1, groups: [14], title: 'sad' }],
            intl: { formatMessage: jest.fn() },
        };
    });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<Group {...props}/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<Group {...props}/>, store);
        expect(wrap.find('Group')).toHaveLength(1);
    });
    it('should get proper props', () => {
        const wrap = mountSmart(<Group {...props}/>, store);
        expect(wrap.find('Group').getElement().props.id).toEqual(14);
        expect(wrap.find('Group').getElement().props.groups).toEqual([{ id: 2, parent_group_id: 14 }]);
        expect(wrap.find('Group').getElement().props.users).toEqual([{ id: 1, groups: [14] }]);
        expect(wrap.find('Group').getElement().props.vaults).toEqual([{ id: 1, groups: [14] }, { id: 6, groups: [14] }]);
        expect(wrap.find('Group').getElement().props.unrelatedGroups).toEqual([{ id: 3, parent_group_id: null }]);
        expect(wrap.find('Group').getElement().props.unrelatedVaults).toEqual([{ id: 2, groups: [] }]);
        expect(wrap.find('Group').getElement().props.unrelatedUsers).toEqual([{ id: 2, groups: [3] }]);
    });
    it('should call addGroupUser', () => {
        const wrap = mountSmart(<WGroup {...props}/>, store);
        wrap.find('ModalAddEntity').at(0).getElement().props.onSelect(5);
        expect(props.addGroupUser).toBeCalledWith({ group_id: 14, user_id: 5 });
    });
    it('should call addGroupVault', () => {
        const wrap = mountSmart(<WGroup {...props}/>, store);
        wrap.find('ModalAddEntity').at(1).getElement().props.onSelect(5);
        expect(props.addGroupVault).toBeCalledWith({ group_id: 14, vault_id: 5 });
    });
    it('should call createInnerGroup', () => {
        const wrap = mountSmart(<WGroup {...props}/>, store);
        wrap.find('ModalAddEntity').at(2).getElement().props.onSelect(5);
        expect(props.createInnerGroup).toBeCalledWith({ id: 14, innerId: 5 });
    });
    it('should call removeGroupUser', () => {
        const wrap = mountSmart(<WGroup {...props}/>, store);
        wrap.find('UserItem').first().getElement().props.onDelete();
        expect(props.removeGroupUser).toBeCalledWith({ group_id: 14, user_id: 1 });
    });
    it('should call deleteGroup', async () => {
        process.browser = true;
        const wrap = mountSmart(<WGroup {...props}/>, store);
        await wrap.find('ConfirmModal').first().getElement().props.callback();
        expect(props.deleteGroup).toBeCalledWith({ id: 14 });
    });
    it('should call removeGroupVault', () => {
        const wrap = mountSmart(<WGroup {...props}/>, store);
        wrap.find('VaultItem').first().getElement().props.onDelete();
        expect(props.removeGroupVault).toBeCalledWith({ group_id: 14, vault_id: 1 });
    });
});
