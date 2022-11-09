import React from 'react';
import { mountSmart, shallowSmart, mockStore, defineMatchMedia } from "helpers/tests/enzymeHelpers";
import TreeField from 'components/Fields/TreeField';

describe('TreeField', () => {
    let props = {};
    const store = mockStore({ groups: [] });
    beforeEach(() => {
        props = {
            input: { onChange: jest.fn() },
            meta: {},
        };
    });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<TreeField {...props}/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<TreeField {...props}/>, store);
        expect(wrap.find('TreeField')).toHaveLength(1);
    });
    it('should call onChange', () => {
        const wrap = mountSmart(<TreeField {...props}/>, store);
        wrap.find('Tree').first().getElement().props.onSelect({ id: 1 });
        expect(props.input.onChange).toBeCalledWith(1);
    });
    it('should not render ErrorText if it was not touched', () => {
        const wrap = mountSmart(<TreeField {...props} meta={{ error: true }}/>, store);
        expect(wrap.find('Text__ErrorText')).toHaveLength(0);
    });
    it('should not render ErrorText if there is no error', () => {
        const wrap = mountSmart(<TreeField {...props} meta={{ touched: true }}/>, store);
        expect(wrap.find('Text__ErrorText')).toHaveLength(0);
    });
    it('should render ErrorText if there is error and it was touched', () => {
        const wrap = mountSmart(<TreeField {...props} meta={{ touched: true, error: true }}/>, store);
        expect(wrap.find('Text__ErrorText')).toHaveLength(1);
    });
});
