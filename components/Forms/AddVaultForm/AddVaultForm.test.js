import React from 'react';
import { mountSmart, shallowSmart, mockStore, defineMatchMedia } from "helpers/tests/enzymeHelpers";
import AddVaultForm from 'components/Forms/AddVaultForm';
import WAddVaultForm from 'components/Forms/AddVaultForm/AddVaultForm';

describe('AddVaultForm', () => {
    const store = mockStore({ groups: [] });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<AddVaultForm/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<AddVaultForm />, store);
        expect(wrap.find('AddVaultForm')).toHaveLength(1);
    });
    it('should call createGroup and onSubmit on submit', async () => {
        const createVault = jest.fn(async () => ({}));
        const onSubmit = jest.fn();
        const wrap = mountSmart(<WAddVaultForm createVault={createVault} onSubmit={onSubmit} intl={{ formatMessage: () => 'sd' }}/>, store);
        await wrap.find('form').getElement().props.onSubmit();
        expect(createVault).toBeCalled();
        expect(onSubmit).toBeCalled();
    });
    it('should call createGroup and not to call onSubmit and CreateInnerGroup on submit', async () => {
        const createVault = jest.fn(async () => ({ }));
        const onSubmit = jest.fn();
        const wrap = mountSmart(<WAddVaultForm
            createVault={createVault}
            onSubmit={null}
            intl={{ formatMessage: () => 'sd' }}
        />, store);
        await wrap.find('form').getElement().props.onSubmit();
        expect(createVault).toBeCalled();
        expect(onSubmit).not.toBeCalled();
    });
});
