import React from 'react';
import { mountSmart, shallowSmart, mockStore, defineMatchMedia } from "helpers/tests/enzymeHelpers";
import RegistrationForm from 'components/Forms/RegistrationForm';
import WRegistrationForm from 'components/Forms/RegistrationForm/RegistrationForm';

describe('RegistrationForm', () => {
    const store = mockStore({});
    it('should match snapshot', () => {
        const wrap = shallowSmart(<RegistrationForm/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<RegistrationForm />, store);
        expect(wrap.find('RegistrationForm')).toHaveLength(1);
    });
    it('should call signIn on submit', async () => {
        const signUp = jest.fn();
        const wrap = mountSmart(<WRegistrationForm signUp={signUp} intl={{ formatMessage: () => 'sd' }}/>, store);
        await wrap.find('form').getElement().props.onSubmit();
        expect(signUp).toBeCalled();
    });
});
