import React from 'react';
import { mountSmart, shallowSmart, mockStore, resizeTo, act } from "helpers/tests/enzymeHelpers";
import Categories from 'pages_components/VaultItems/Categories';

describe('Categories', () => {
    let props = {};
    beforeEach(() => {
        props = {
            category: { value: '', type: 'type' },
            setCategory: jest.fn(),
            vault: { id: '2', updatable: true },
            tags: [1, 2],
        };
    });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<Categories {...props}/>);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<Categories {...props}/>);
        expect(wrap.find('Categories')).toHaveLength(1);
        expect(wrap.find('Link')).toHaveLength(4);
    });
    it('should render itself if vault is not updatable', () => {
        const wrap = mountSmart(<Categories {...props} vault={{ updatable: false }}/>);
        expect(wrap.find('Link')).toHaveLength(0);
    });
    it('should call setCategory', () => {
        const wrap = mountSmart(<Categories {...props}/>);
        wrap.find('Flexbox__FlexItem').first().getElement().props.onClick();
        expect(props.setCategory).toBeCalledWith({ type: 'type', value: '' });
    });
    it('should call setCategory on tag', () => {
        const wrap = mountSmart(<Categories {...props}/>);
        wrap.find('Flexbox__FlexItem').last().getElement().props.onClick();
        expect(props.setCategory).toBeCalledWith({ type: 'tags', value: 2 });
    });
});
