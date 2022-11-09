import React from 'react';
import { mountSmart, shallowSmart, act, resizeTo } from "helpers/tests/enzymeHelpers";
import SearchWrap from 'components/Elements/SearchWrap';

describe('SearchWrap', () => {
    let props = {};
    beforeEach(() => {
        props = {
            children: jest.fn(data => <div className='toFind' data={data}>a</div>),
            data: [{ name: 'john' }, { name: 'hi' }],
            placeholder: 'searchUsers',
        };
    });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<SearchWrap {...props}/>);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<SearchWrap {...props}/>);
        expect(wrap.find('SearchWrap')).toHaveLength(1);
    });
    it('should render its children if data is not empty', () => {
        const wrap = mountSmart(<SearchWrap {...props}/>);
        expect(wrap.find('.toFind')).toHaveLength(1);
        expect(wrap.find('NoDataText')).toHaveLength(0);
    });
    it('should not render header if mobile size ', () => {
        resizeTo('mobile');
        const wrap = mountSmart(<SearchWrap {...props}/>);
        expect(wrap.find('.header')).toHaveLength(0);
    });
    it('should not render its children if data is empty', () => {
        const wrap = mountSmart(<SearchWrap {...props} data={[]}/>);
        expect(wrap.find('NoDataText')).toHaveLength(1);
    });
    it('should call children with full data', () => {
        const wrap = mountSmart(<SearchWrap {...props}/>);
        act(() => {
            wrap.find('Input').getElement().props.onChange({}, { value: '' });
        });
        wrap.update();
        expect(props.children).toBeCalledWith({ data: props.data });
    });
    it('should call children with filtered data', () => {
        const wrap = mountSmart(<SearchWrap {...props}/>);
        act(() => {
            wrap.find('Input').getElement().props.onChange({}, { value: 'j' });
        });
        wrap.update();
        expect(props.children).toBeCalledWith({ data: [{ name: 'john' }] });
    });
});
