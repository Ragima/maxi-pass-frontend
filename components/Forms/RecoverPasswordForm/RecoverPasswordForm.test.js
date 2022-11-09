import React from 'react';
import { mountSmart, shallowSmart, mockStore } from "helpers/tests/enzymeHelpers";
import RecoverPasswordForm from 'components/Forms/RecoverPasswordForm';
import WRecoverPasswordForm from 'components/Forms/RecoverPasswordForm/RecoverPasswordForm';

describe('RecoverPasswordForm', () => {
    const store = mockStore({});
    it('should match snapshot', () => {
        const wrap = shallowSmart(<RecoverPasswordForm/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<RecoverPasswordForm />, store);
        expect(wrap.find('RecoverPasswordForm')).toHaveLength(1);
    });
    it('should call signIn on submit', () => {
        const changePassword = jest.fn();
        const wrap = mountSmart(<WRecoverPasswordForm changePassword={changePassword} intl={{ formatMessage: () => 'sd' }}/>, store);
        wrap.find('form').getElement().props.onSubmit();
        expect(changePassword).toBeCalled();
    });
});
