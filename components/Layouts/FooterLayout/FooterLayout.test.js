import React from 'react';
import { mountSmart, shallowSmart, mockStore, resizeTo } from "helpers/tests/enzymeHelpers";
import FooterLayout from 'components/Layouts/FooterLayout';

describe('FooterLayout', () => {
    it('should match snapshot', () => {
        const wrap = shallowSmart(<FooterLayout/>);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<FooterLayout/>);
        expect(wrap.find('FooterLayout')).toHaveLength(1);
    });
    it('should not render Footer if width less than tablet', () => {
        resizeTo('mobile');
        const wrap = mountSmart(<FooterLayout/>);
        expect(wrap.find('FooterBackground')).toHaveLength(0);
    });
});
