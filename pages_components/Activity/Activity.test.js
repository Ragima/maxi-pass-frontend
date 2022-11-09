import React from 'react';
import { mountSmart, shallowSmart, mockStore } from "helpers/tests/enzymeHelpers";
import Activity from 'pages/activity';

describe('Activity', () => {
    const store = mockStore({ user: {} });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<Activity/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<Activity/>, store);
        expect(wrap.find('Activity')).toHaveLength(1);
    });
});
