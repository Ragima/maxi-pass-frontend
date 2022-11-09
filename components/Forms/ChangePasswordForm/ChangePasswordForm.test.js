import React from 'react';
import { mountSmart, shallowSmart, mockStore } from "helpers/tests/enzymeHelpers";
import ChangePasswordForm from 'components/Forms/ChangePasswordForm';
import WChangePasswordForm from 'components/Forms/ChangePasswordForm/ChangePasswordForm';

jest.mock('helpers/data/validations');

describe('ChangePasswordForm', () => {
    const store = mockStore({ user: { } });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<ChangePasswordForm/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<ChangePasswordForm />, store);
        expect(wrap.find('ChangePasswordForm')).toHaveLength(1);
    });
    it('should call signIn on submit', async () => {
        const updateSettings = jest.fn();
        const wrap = mountSmart(<WChangePasswordForm updateSettings={updateSettings} intl={{ formatMessage: () => 'sd' }}/>);
        await wrap.find('form').getElement().props.onSubmit();
        expect(updateSettings).toBeCalled();
    });
});
