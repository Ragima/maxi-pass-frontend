import React from 'react';
import { mountSmart, shallowSmart, mockStore } from "helpers/tests/enzymeHelpers";
import Vault, { afterFunc } from 'pages/vault';
import WVault from 'pages_components/Vault';
import { redirect } from 'helpers/auth/redirect';

jest.mock('helpers/auth/redirect');

describe('Vault', () => {
    const store = mockStore({
        groups: [{ id: 4, vaults: [14] }, { id: 2, vaults: [14, 2] }, { id: 3, vaults: [] }],
        users: [{ id: 21, vaults: [14] }, { id: 2, vaults: [3] }],
        vaults: [{ id: 14, title: 'asd' }, { id: 6, title: 'asd' }],
        relations: {
            group_vaults: [{ group_id: 4, vault_id: 14 }, { group_id: 2, vault_id: 14 }, { group_id: 2, vault_id: 2 }],
            user_vaults: [{ vault_id: 14, user_id: 21 }, { vault_id: 3, user_id: 2 }],
        },
        user: {},
    });
    let props = {};
    beforeEach(() => {
        props = {
            id: 14,
            vault: { id: 14 },
            addGroupVault: jest.fn(),
            addUserVault: jest.fn(),
            removeGroupVault: jest.fn(),
            removeUserVault: jest.fn(),
            generateReport: jest.fn(),
            deleteVault: jest.fn(),
            groups: [{ id: 3, vaults: [14], name: 'sd' }, { id: 4, vaults: [], name: 'sd' }],
            users: [{ id: 2, vaults: [14], name: 'sd' }, { id: 1, vaults: [], name: 'sd' }],
            vaults: [{ id: 14, users: [], title: 'sd' }],
            intl: { formatMessage: jest.fn() },
        };
    });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<Vault {...props}/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<Vault {...props}/>, store);
        expect(wrap.find('Vault')).toHaveLength(1);
    });
    it('should get proper props', () => {
        const wrap = mountSmart(<Vault {...props}/>, store);
        expect(wrap.find('Vault').getElement().props.id).toEqual(14);
        expect(wrap.find('Vault').getElement().props.groups).toEqual([{ id: 4, vaults: [14] }, { id: 2, vaults: [14, 2] }]);
        expect(wrap.find('Vault').getElement().props.users).toEqual([{ id: 21, vaults: [14] }]);
        expect(wrap.find('Vault').getElement().props.unrelatedGroups).toEqual([{ id: 3, vaults: [] }]);
        expect(wrap.find('Vault').getElement().props.unrelatedUsers).toEqual([{ id: 2, vaults: [3] }]);
    });
    it('should call addGroupVault', () => {
        const wrap = mountSmart(<WVault {...props}/>, store);
        wrap.find('ModalAddEntity').at(1).getElement().props.onSelect(5);
        expect(props.addGroupVault).toBeCalledWith({ group_id: 5, vault_id: 14 });
    });
    it('should call addUserVault', () => {
        const wrap = mountSmart(<WVault {...props}/>, store);
        wrap.find('ModalAddEntity').at(0).getElement().props.onSelect(5);
        expect(props.addUserVault).toBeCalledWith({ user_id: 5, vault_id: 14 });
    });
    it('should call removeGroupVault', () => {
        const wrap = mountSmart(<WVault {...props}/>, store);
        wrap.find('.unlink').last().getElement().props.onClick();
        expect(props.removeGroupVault).toBeCalledWith({ group_id: 4, vault_id: 14 });
    });
    it('should call removeUserVault', () => {
        const wrap = mountSmart(<WVault {...props}/>, store);
        wrap.find('UserItem').first().getElement().props.onDelete();
        expect(props.removeUserVault).toBeCalledWith({ user_id: 2, vault_id: 14 });
    });
    it('should call deleteVault', async () => {
        process.browser = true;
        const wrap = mountSmart(<WVault {...props}/>, store);
        await wrap.find('ConfirmModal').first().getElement().props.callback();
        expect(props.deleteVault).toBeCalledWith({ id: 14 });
    });
});


jest.mock('helpers/initialize/initialize');
import { runAction } from "helpers/initialize/initialize";

describe('afterFunc', () => {
    it('should call redirect if error', async () => {
        redirect.mockImplementationOnce(target => target);
        runAction.mockImplementationOnce(() => { throw new Error(); });
        await afterFunc({ query: { id: 1 } });
        expect(runAction).toBeCalledTimes(1);
        expect(redirect).toBeCalledWith('/vault_items/1', { query: { id: 1 } });
    });
    it('should call one action', async () => {
        runAction.mockImplementationOnce(() => { return async () => { return {}; }; });
        const result = await afterFunc({ query: { id: 1 } });
        expect(runAction).toBeCalledTimes(2);
        expect(result).toEqual({ id: 1 });
    });
});
