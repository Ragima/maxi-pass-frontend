import React from 'react';
import { mountSmart, shallowSmart, act, resizeTo } from "helpers/tests/enzymeHelpers";
import TableWrap from 'components/Tables/TableWrap';
import _ from 'lodash';

describe('TableWrap', () => {
    let props = {};
    beforeEach(() => {
        props = {
            header: <div className='header'>a</div>,
            children: jest.fn(data => <div className='toFind' data={data}>a</div>),
            data: [{ name: 'hi' }, { name: 'john' }],
            placeholder: 'searchUsers',
        };
    });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<TableWrap {...props}/>);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<TableWrap {...props}/>);
        expect(wrap.find('TableWrap')).toHaveLength(1);
    });
    it('should render its children if data is not empty', () => {
        const wrap = mountSmart(<TableWrap {...props}/>);
        expect(wrap.find('.toFind')).toHaveLength(1);
        expect(wrap.find('.header')).toHaveLength(1);
        expect(wrap.find('NoDataText')).toHaveLength(0);
    });
    it('should not render header if mobile size ', () => {
        resizeTo('mobile');
        const wrap = mountSmart(<TableWrap {...props}/>);
        expect(wrap.find('.header')).toHaveLength(0);
    });
    it('should not render its children if data is empty', () => {
        resizeTo('computer');
        const wrap = mountSmart(<TableWrap {...props} data={[]}/>);
        expect(wrap.find('NoDataText')).toHaveLength(1);
    });
    it('should call children with full data', () => {
        const wrap = mountSmart(<TableWrap {...props}/>);
        act(() => {
            wrap.find('Input').getElement().props.onChange({}, { value: '' });
        });
        wrap.update();
        expect(props.children).toBeCalledWith({ data: _.orderBy(props.data, ['name']) });
    });
    it('should call children with filtered data', () => {
        const wrap = mountSmart(<TableWrap {...props}/>);
        act(() => {
            wrap.find('Input').getElement().props.onChange({}, { value: 'j' });
        });
        wrap.update();
        expect(props.children).toBeCalledWith({ data: [{ name: 'john' }] });
    });
    it('should render default header and sort data by name', () => {
        const wrap = mountSmart(<TableWrap {...props} header={null} fields={[{ header: 'name', width: 1, sorted: true }]}/>);
        act(() => {
            wrap.find('TableHeaderCell').first().getElement().props.onClick();
        });
        wrap.update();
        expect(props.children).toBeCalledWith({ data: [{ name: 'hi' }, { name: 'john' }] });
        act(() => {
            wrap.find('TableHeaderCell').first().getElement().props.onClick();
        });
        wrap.update();
        expect(props.children).toBeCalledWith({ data: [{ name: 'john' }, { name: 'hi' }] });
    });
    it('should render default header and do not sort data by name', () => {
        const wrap = mountSmart(<TableWrap {...props} header={null} fields={[{ header: 'name', width: 1, sorted: false }]}/>);
        expect(wrap.find('TableHeaderCell').first().getElement().props.onClick).toEqual(undefined);
    });
});
