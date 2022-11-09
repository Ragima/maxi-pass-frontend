import React from 'react';
import { mountSmart, shallowSmart } from "helpers/tests/enzymeHelpers";
import ErrorCaption from 'components/Elements/ErrorCaption';


describe('ErrorCaption', () => {
    it('should match snapshot', () => {
        const wrap = shallowSmart(<ErrorCaption>name</ErrorCaption>);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<ErrorCaption>name</ErrorCaption>);
        expect(wrap.find('div').text()).toEqual('Name');
    });
});
