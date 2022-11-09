import React from 'react';
import { mountSmart, shallowSmart } from "helpers/tests/enzymeHelpers";
import NoDataText from 'components/Elements/NoDataText';

describe('NoDataText', () => {
    it('should match snapshot', () => {
        const wrap = shallowSmart(<NoDataText textId='search'/>);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<NoDataText textId='search'/>);
        expect(wrap.find('NoDataText')).toHaveLength(1);
    });
    it('should render no data message if data empty', () => {
        const wrap = mountSmart(<NoDataText textId='search'/>);
        expect(wrap.find('Text__NoDataText').text()).toEqual('Search');
    });
});
