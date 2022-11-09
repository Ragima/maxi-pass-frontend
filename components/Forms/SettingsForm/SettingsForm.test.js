import React from 'react';
import { mountSmart, shallowSmart, mockStore } from "helpers/tests/enzymeHelpers";
import SettingsForm from 'components/Forms/SettingsForm';
import WSettingsForm from 'components/Forms/SettingsForm/SettingsForm';

jest.mock('helpers/data/validations');

import { emailValidate } from 'helpers/data/validations';

describe('SettingsForm', () => {
    const store = mockStore({ user: { } });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<SettingsForm/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<SettingsForm />, store);
        expect(wrap.find('SettingsForm')).toHaveLength(1);
    });
    it('should call signIn on submit', async () => {
        const updateSettings = jest.fn();
        const wrap = mountSmart(<WSettingsForm updateSettings={updateSettings} intl={{ formatMessage: () => 'sd' }}/>);
        await wrap.find('form').getElement().props.onSubmit();
        expect(updateSettings).toBeCalled();
    });
});
