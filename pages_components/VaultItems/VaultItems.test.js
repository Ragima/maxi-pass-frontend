import React from 'react';
import { mountSmart, shallowSmart, mockStore, resizeTo, act } from "helpers/tests/enzymeHelpers";
import VaultItems, { afterFunc } from 'pages/vault_items';
import WVaultItems from 'pages_components/VaultItems';
import { redirect } from 'helpers/auth/redirect';

jest.mock('helpers/auth/redirect');

const mockLocalStorage = (function() {
    let store = {};
    return {
      getItem: function(key) {
        if (key === 'vault_category') {
            return 'login';
        }
        return false;
      },
      setItem: function(key, value) {
        store[key] = value.toString();
      },
      removeItem: function(key) {
        delete store[key];
      },
    };
  })();

Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage
});

describe('VaultItems', () => {
    const store = mockStore({ user: { role_id: 'admin' },
        vaults: [{ id: 1, updatable: true }],
        vault_items: [
            { id: 2, vault_id: 1, tags: ['s', 'a'], type: 'login' },
            { id: 3, vault_id: 1, tags: ['d', 'a'], type: 'server' }] });
    let props = {};
    beforeEach(() => {
        props = {
            id: 1,
            vault: { updatable: true },
            intl: { formatMessage: jest.fn() },
            deleteVaultItem: jest.fn(),
        };
    });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<VaultItems {...props}/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<VaultItems {...props}/>, store);
        expect(wrap.find('VaultItems')).toHaveLength(1);
    });
    it('should render add login form if form', () => {
        const wrap = mountSmart(<VaultItems {...props} form='login'/>, store);
        expect(wrap.find('AddLoginItemForm')).toHaveLength(1);
    });
    it('should render add login form if item', () => {
        const wrap = mountSmart(<WVaultItems {...props} item={{ type: 'login' }}/>, store);
        expect(wrap.find('AddLoginItemForm')).toHaveLength(1);
    });
    it('should render add server form if form', () => {
        const wrap = mountSmart(<VaultItems {...props} form='server'/>, store);
        expect(wrap.find('AddServerItemForm')).toHaveLength(1);
    });
    it('should render add server form if item', () => {
        const wrap = mountSmart(<WVaultItems {...props} item={{ type: 'server' }}/>, store);
        expect(wrap.find('AddServerItemForm')).toHaveLength(1);
    });
    it('should render add card form if form', () => {
        const wrap = mountSmart(<VaultItems {...props} form='credit_card'/>, store);
        expect(wrap.find('AddCardItemForm')).toHaveLength(1);
    });
    it('should render add card form if item', () => {
        const wrap = mountSmart(<WVaultItems {...props} item={{ type: 'credit_card' }}/>, store);
        expect(wrap.find('AddCardItemForm')).toHaveLength(1);
    });
    it('should render ModalCopyMove if item', () => {
        const wrap = mountSmart(<WVaultItems {...props} item={{ type: 'credit_card' }}/>, store);
        expect(wrap.find('ModalCopyMove')).toHaveLength(1);
    });
    it('should render ModalCopyMove if vault is not updatable', () => {
        const wrap = mountSmart(<WVaultItems {...props} item={{ type: 'credit_card' }} vault={{ id: 1, updatable: false }}/>, store);
        expect(wrap.find('ModalCopyMove')).toHaveLength(0);
    });
    it('should not render ModalCopyMove if no item', () => {
        const wrap = mountSmart(<WVaultItems {...props}/>, store);
        expect(wrap.find('ModalCopyMove')).toHaveLength(0);
    });
    it('should call delete item', async () => {
        redirect.mockImplementationOnce(() => {});
        const wrap = mountSmart(<WVaultItems {...props} item={{ type: 'credit_card' }}/>, store);
        await wrap.find('ConfirmModal').first().getElement().props.callback();
        expect(props.deleteVaultItem).toBeCalled();
        expect(redirect).toBeCalled();
    });
    it('should call handleSetCategory', () => {
        const wrap = mountSmart(<WVaultItems {...props} item={{ type: 'credit_card' }} />, store);
        wrap.find('Categories').find('Icon').first().simulate('click');
        expect(wrap.find('Categories').getElement().props.category).toEqual({ value: '', type: 'type' });
        expect(wrap.find('Items').getElement().props.item).toEqual({ type: 'credit_card' });
    });
    it('should render proper data if there is no item_id', () => {
        const wrap = mountSmart(<VaultItems {...props}/>, store);
        expect(wrap.find('Categories').getElement().props.tags).toEqual(['s', 'a', 'd']);
        expect(wrap.find('Items').getElement().props.items).toEqual([
            { id: 2, vault_id: 1, tags: ['s', 'a'], type: 'login' },]);
        expect(wrap.find('Items').getElement().props.item).toEqual({});
    });
    it('should render only server items if category is server', () => {
        const wrap = mountSmart(<VaultItems {...props}/>, store);
        act(() => wrap.find('Categories').getElement().props.setCategory({ value: 'server', type: 'type' }));
        expect(wrap.find('Categories').getElement().props.tags).toEqual(['s', 'a', 'd']);
        wrap.update();
        expect(wrap.find('Items').getElement().props.items).toEqual([
            { id: 3, vault_id: 1, tags: ['d', 'a'], type: 'server' }]);
        expect(wrap.find('Items').getElement().props.item).toEqual({});
    });
    it('should render only items with tag s if category is server', () => {
        const wrap = mountSmart(<VaultItems {...props}/>, store);
        act(() => wrap.find('Categories').getElement().props.setCategory({ value: 's', type: 'tags' }));
        expect(wrap.find('Categories').getElement().props.tags).toEqual(['s', 'a', 'd']);
        wrap.update();
        expect(wrap.find('Items').getElement().props.items).toEqual([
            { id: 2, vault_id: 1, tags: ['s', 'a'], type: 'login' }]);
        expect(wrap.find('Items').getElement().props.item).toEqual({});
    });
});


jest.mock('helpers/initialize/initialize');
import { runAction } from "helpers/initialize/initialize";

describe('afterFunc', () => {
    it('should call one action', async () => {
        runAction.mockImplementationOnce(() => { return async () => { return {}; }; });
        const result = await afterFunc({});
        expect(runAction).toBeCalledTimes(1);
        expect(result).toEqual({});
    });
    it('should call two actions', async () => {
        runAction.mockImplementationOnce(() => { return async () => { return {}; }; });
        const result = await afterFunc({ query: { item_id: 1, form: 'asd' } });
        expect(runAction).toBeCalledTimes(3);
        expect(result).toEqual({ item_id: 1, form: 'asd' });
    });
});
