import React from 'react';
import { mountSmart, shallowSmart, mockStore, defineMatchMedia } from "helpers/tests/enzymeHelpers";
import EditVaultForm from 'components/Forms/EditVaultForm';
import WEditVaultForm from 'components/Forms/EditVaultForm/EditVaultForm';

describe('EditVaultForm', () => {
    const store = mockStore({});
    it('should match snapshot', () => {
        const wrap = shallowSmart(<EditVaultForm/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<EditVaultForm />, store);
        expect(wrap.find('EditVaultForm')).toHaveLength(1);
    });
    it('should call editGroup and onSubmit on submit', async () => {
        const editVault = jest.fn();
        const onSubmit = jest.fn();
        const wrap = mountSmart(<WEditVaultForm vault={{ id: 1, title: 'v' }} editVault={editVault} onSubmit={onSubmit} intl={{ formatMessage: () => 'sd' }}/>);
        await wrap.find('form').getElement().props.onSubmit();
        expect(editVault).toBeCalledWith({ id: 1, title: 'v' });
        expect(onSubmit).toBeCalled();
    });
    it('should call editGroup and not to call onSubmit on submit', async () => {
        const editVault = jest.fn();
        const onSubmit = jest.fn();
        const wrap = mountSmart(<WEditVaultForm vault={{ id: 1, title: 'v', description: 'sda' }} editVault={editVault} onSubmit={null} intl={{ formatMessage: () => 'sd' }}/>);
        await wrap.find('form').getElement().props.onSubmit();
        expect(editVault).toBeCalledWith({ id: 1, title: 'v', description: 'sda' });
        expect(onSubmit).not.toBeCalled();
    });
});
