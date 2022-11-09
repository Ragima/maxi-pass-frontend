import React from 'react';
import { mountSmart, shallowSmart, mockStore, resizeTo } from "helpers/tests/enzymeHelpers";
import SignUp from 'pages/sign_up';

describe('SignUp', () => {
    const store = mockStore({});
    it('should match snapshot', () => {
        const wrap = shallowSmart(<SignUp/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<SignUp />, store);
        expect(wrap.find('SignUp')).toHaveLength(1);
    });
    it('should render text if computer size', () => {
        const wrap = mountSmart(<SignUp />, store);
        expect(wrap.find('Text')).toHaveLength(2);
    });
    it('should not render text if mobile size', () => {
        resizeTo('mobile');
        const wrap = mountSmart(<SignUp />, store);
        expect(wrap.find('Text')).toHaveLength(1);
    });
});
