import React from 'react';
import { mountSmart, shallowSmart, mockStore, resizeTo } from "helpers/tests/enzymeHelpers";
import Groups from 'pages/groups';

describe('Groups', () => {
    const store = mockStore({ groups: [] });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<Groups/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<Groups/>, store);
        expect(wrap.find('Groups')).toHaveLength(1);
    });
});
