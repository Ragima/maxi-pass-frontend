import React from 'react';
import { mountSmart, shallowSmart, act } from "helpers/tests/enzymeHelpers";
import SinglePageLayout from 'components/Layouts/SinglePageLayout';

describe('SinglePageLayout', () => {
    let props = {};
    beforeEach(() => {
        props = {
            itemLists: [],
            title: 'Big mamba',
        };
    });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<SinglePageLayout {...props}/>);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<SinglePageLayout {...props}/>);
        expect(wrap.find('SinglePageLayout')).toHaveLength(1);
    });
    it('should render headerButtons if they present', () => {
        const wrap = mountSmart(<SinglePageLayout {...props} headerButtons={<div className='buttons' />}/>);
        expect(wrap.find('.buttons')).toHaveLength(1);
    });
    it('should render items lists if they present', () => {
        const wrap = mountSmart(<SinglePageLayout {...props} itemLists={[<div className='class1' />, <div className='class2' />]}/>);
        expect(wrap.find('.class1')).toHaveLength(1);
        expect(wrap.find('.class2')).toHaveLength(1);
    });
});
