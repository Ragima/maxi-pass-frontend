import React from 'react';
import { mountSmart, shallowSmart, mockStore } from "helpers/tests/enzymeHelpers";
import FullLayout from 'components/Layouts/FullLayout';
import WFullLayout from 'components/Layouts/FullLayout/FullLayout';

describe('FullLayout', () => {
    const store = mockStore({ menu: { isOpen: true }, user: { email: 'asd' } });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<FullLayout/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<FullLayout/>, store);
        expect(wrap.find('FullLayout')).toHaveLength(1);
    });
    it('should render children within', () => {
        const wrap = mountSmart(<FullLayout><button/></FullLayout>, store);
        expect(wrap.find('button')).toHaveLength(1);
    });
    it('should render layouts within', () => {
        const wrap = mountSmart(<WFullLayout router={{ pathname: '/users' }}><button/></WFullLayout>, store);
        expect(wrap.find('HeaderLayout')).toHaveLength(1);
        expect(wrap.find('MenuLayout')).toHaveLength(1);
    });
    it('should not render layouts within', () => {
        const wrap = mountSmart(<WFullLayout router={{ pathname: '/login' }}><button/></WFullLayout>, store);
        expect(wrap.find('HeaderLayout')).toHaveLength(0);
        expect(wrap.find('MenuLayout')).toHaveLength(0);
    });
});
