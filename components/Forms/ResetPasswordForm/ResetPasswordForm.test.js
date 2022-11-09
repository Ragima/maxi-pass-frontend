import React from 'react';
import { mountSmart, shallowSmart, mockStore, defineMatchMedia } from "helpers/tests/enzymeHelpers";
import ResetPasswordForm from 'components/Forms/ResetPasswordForm';
import WResetPasswordForm from 'components/Forms/ResetPasswordForm/ResetPasswordForm';

describe('ResetPasswordForm', () => {
    const store = mockStore({ groups: [] });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<ResetPasswordForm/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<ResetPasswordForm />, store);
        expect(wrap.find('ResetPasswordForm')).toHaveLength(1);
    });
    it('should call createGroup and onSubmit on submit', async () => {
        const resetPassword = jest.fn(async () => ({}));
        const onSubmit = jest.fn();
        const wrap = mountSmart(<WResetPasswordForm resetPassword={resetPassword} onSubmit={onSubmit} intl={{ formatMessage: () => 'sd' }}/>, store);
        await wrap.find('form').getElement().props.onSubmit();
        expect(resetPassword).toBeCalled();
        expect(onSubmit).toBeCalled();
    });
    it('should call createGroup and not to call onSubmit and CreateInnerGroup on submit', async () => {
        const resetPassword = jest.fn(async () => ({ }));
        const onSubmit = jest.fn();
        const wrap = mountSmart(<WResetPasswordForm
            resetPassword={resetPassword}
            onSubmit={null}
            intl={{ formatMessage: () => 'sd' }}
        />, store);
        await wrap.find('form').getElement().props.onSubmit();
        expect(resetPassword).toBeCalled();
        expect(onSubmit).not.toBeCalled();
    });
});
