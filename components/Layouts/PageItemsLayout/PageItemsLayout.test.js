import React from 'react';
import { mountSmart, shallowSmart, act, mockStore } from "helpers/tests/enzymeHelpers";
import PageItemsLayout from 'components/Layouts/PageItemsLayout';

describe('PageItemsLayout', () => {
    let props = {};
    const store = mockStore({ groups: [] });
    beforeEach(() => {
        props = {
            leftColumn: jest.fn(data => <div className='toFind' data={data}>a</div>),
            rightColumn: jest.fn(data => <div className='toFind' data={data}>a</div>),
        };
    });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<PageItemsLayout {...props}/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<PageItemsLayout {...props}/>, store);
        expect(wrap.find('PageItemsLayout')).toHaveLength(1);
    });
    it('should render its children', () => {
        const wrap = mountSmart(<PageItemsLayout {...props}/>, store);
        expect(wrap.find('.toFind')).toHaveLength(2);
    });
    it('should pass isLoading true to children while submitting', () => {
        const wrap = mountSmart(<PageItemsLayout {...props}/>, store);
        act(() => {
            wrap.find('Tree').first().getElement().props.onSelect('data');
        });
        wrap.update();
        expect(props.leftColumn).toBeCalledWith({ group: 'data' });
        expect(props.rightColumn).toBeCalledWith({ group: 'data' });
    });
});
