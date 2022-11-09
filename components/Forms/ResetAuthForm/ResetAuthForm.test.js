import React from 'react';
import { mountSmart, shallowSmart, mockStore } from "helpers/tests/enzymeHelpers";
import ResetAuthForm from 'components/Forms/ResetAuthForm';
import WResetAuthForm from 'components/Forms/ResetAuthForm/ResetAuthForm';

describe('ResetAuthForm', () => {
    const store = mockStore({});
    it('should match snapshot', () => {
        const wrap = shallowSmart(<ResetAuthForm/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<ResetAuthForm />, store);
        expect(wrap.find('ResetAuthForm')).toHaveLength(1);
    });
    it('should call signIn on submit', async () => {
        const resetTwoFactor = jest.fn();
        const onSubmit = jest.fn();
        const wrap = mountSmart(<WResetAuthForm resetTwoFactor={resetTwoFactor} onSubmit={onSubmit} intl={{ formatMessage: () => 'sd' }}/>, store);
        await wrap.find('form').getElement().props.onSubmit();
        expect(resetTwoFactor).toBeCalled();
        expect(onSubmit).toBeCalled();
    });
    it('should call createGroup and not to call onSubmit and CreateInnerGroup on submit', async () => {
        const resetTwoFactor = jest.fn(async () => ({ }));
        const onSubmit = jest.fn();
        const wrap = mountSmart(<WResetAuthForm
            resetTwoFactor={resetTwoFactor}
            onSubmit={null}
            intl={{ formatMessage: () => 'sd' }}
        />, store);
        await wrap.find('form').getElement().props.onSubmit();
        expect(resetTwoFactor).toBeCalled();
        expect(onSubmit).not.toBeCalled();
    });
});
