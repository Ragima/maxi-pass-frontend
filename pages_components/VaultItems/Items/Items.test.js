import React from 'react';
import { mountSmart, shallowSmart, mockStore, resizeTo, act } from "helpers/tests/enzymeHelpers";
import Items from 'pages_components/VaultItems/Items';

jest.mock('helpers/auth/redirect');
describe('Items', () => {
    const store = mockStore({});
    let props = {};
    beforeEach(() => {
        props = {
            item: {},
            items: [{ title: 'asds' }, { title: 'fffff' }],
        };
    });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<Items {...props}/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<Items {...props}/>, store);
        expect(wrap.find('Items')).toHaveLength(1);
    });
    it('should filter items', () => {
        const wrap = mountSmart(<Items {...props}/>, store);
        expect(wrap.find('Link')).toHaveLength(2);
        act(() => wrap.find('Input').first().getElement().props.onChange({}, { value: 'f' }));
        wrap.update();
        expect(wrap.find('Link')).toHaveLength(1);
        act(() => wrap.find('Input').first().getElement().props.onChange({}, { value: 's' }));
        wrap.update();
        expect(wrap.find('Link')).toHaveLength(1);
    });
});
