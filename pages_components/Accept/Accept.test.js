import React from 'react';
import { mountSmart, shallowSmart, mockStore, resizeTo } from "helpers/tests/enzymeHelpers";
import Accept from 'pages/account_recover/accept';

describe('Accept', () => {
    const store = mockStore({});
    it('should match snapshot', () => {
        const wrap = shallowSmart(<Accept/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<Accept />, store);
        expect(wrap.find('Accept')).toHaveLength(1);
    });
    it('should render its form', () => {
        const wrap = mountSmart(<Accept />, store);
        expect(wrap.find('RecoverPasswordForm')).toHaveLength(1);
    });
    it('should render text if computer size', () => {
        const wrap = mountSmart(<Accept />, store);
        expect(wrap.find('Text')).toHaveLength(2);
    });
    it('should not render text if mobile size', () => {
        resizeTo('mobile');
        const wrap = mountSmart(<Accept />, store);
        expect(wrap.find('Text')).toHaveLength(1);
    });
});
