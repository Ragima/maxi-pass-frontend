import React from 'react';
import { mountSmart, shallowSmart, mockStore } from "helpers/tests/enzymeHelpers";
import LanguageSelector from 'components/Elements/LanguageSelector';
import WLanguageSelectors from 'components/Elements/LanguageSelector/LanguageSelector';
import { redirect } from 'helpers/auth/redirect'; 

jest.mock('helpers/auth/redirect');


describe('LanguageSelector', () => {
    const store = mockStore({ user: {} });
    let props;
    beforeEach(() => {
        props = {
            intl: { formatMessage: jest.fn() },
            language: 'en',
            updateSettings: jest.fn(async () => {}),
        };
    });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<LanguageSelector/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<LanguageSelector/>, store);
        expect(wrap.find('LanguageSelector')).toHaveLength(1);
    });
    it('should render call updateSettings ', async () => {
        redirect.mockImplementationOnce();
        const wrap = mountSmart(<WLanguageSelectors {...props}/>, store);
        await wrap.find('Dropdown').getElement().props.onChange({}, { value: 'ru' });
        expect(props.updateSettings).toBeCalledWith({ user: { locale: 'ru' } });
        expect(redirect).toBeCalledWith('/');
    });
});
