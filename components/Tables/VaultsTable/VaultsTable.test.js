import React from 'react';
import { mountSmart, shallowSmart, mockStore, resizeTo } from "helpers/tests/enzymeHelpers";
import VaultsTable from 'components/Tables/VaultsTable';
import WVaultsTable from 'components/Tables/VaultsTable/VaultsTable';

describe('VaultsTable', () => {
    const store = mockStore({ user: {} });
    const props = { data: [{ email: 'email', title: 'name', id: 1, is_shared: true }], users: [], deleteVault: jest.fn(), intl: { formatMessage: jest.fn() } };
    it('should match snapshot', () => {
        const wrap = shallowSmart(<VaultsTable {...props}/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<VaultsTable {...props}/>, store);
        expect(wrap.find('VaultsTable')).toHaveLength(1);
    });
    it('should render its children', () => {
        const wrap = mountSmart(<VaultsTable {...props}/>, store);
        expect(wrap.find('TableHeaderCell')).toHaveLength(5);
        expect(wrap.find('TableRow')).toHaveLength(2);
    });
    it('should render 10 cells if computer', () => {
        resizeTo('computer');
        const wrap = mountSmart(<VaultsTable {...props}/>, store);
        expect(wrap.find('TableCell')).toHaveLength(10);
    });
    it('should render 9 cells if computer and user', () => {
        resizeTo('computer');
        const wrap = mountSmart(<VaultsTable {...props} showVaultItems/>, store);
        expect(wrap.find('TableCell')).toHaveLength(8);
    });
    it('should render 1 cell if mobile', () => {
        resizeTo('mobile');
        const wrap = mountSmart(<VaultsTable {...props}/>, store);
        expect(wrap.find('TableCell')).toHaveLength(1);
    });
    it('should render vault link', () => {
        resizeTo('computer');
        const wrap = mountSmart(<VaultsTable {...props}/>, store);
        expect(wrap.find('Link')).toHaveLength(1);
    });
    it('should render vault_items link', () => {
        resizeTo('computer');
        const wrap = mountSmart(<VaultsTable {...props} showVaultItems/>, store);
        expect(wrap.find('Link')).toHaveLength(1);
    });
    it('should call delete vault', () => {
        resizeTo('computer');
        const wrap = mountSmart(<WVaultsTable {...props} user={{}}/>, store);
        wrap.find('Icon').last().simulate('click');
        wrap.find('ConfirmModal').first().getElement().props.callback();
        expect(props.deleteVault).toBeCalledWith({ id: 1 });
    });
});
