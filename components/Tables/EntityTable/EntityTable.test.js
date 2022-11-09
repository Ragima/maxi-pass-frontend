import React from 'react';
import { mountSmart, shallowSmart, mockStore, resizeTo } from "helpers/tests/enzymeHelpers";
import EntityTable from 'components/Tables/EntityTable';

const data = [{ id: 1, title: 'Created table', type: 'User', action: 'Create', date: new Date(), actor: 'Not me' }];

describe('EntityTable', () => {
    const props = { data, onSelect: jest.fn(), tableKey: 'asda', fields: [{ key: 'title', widht: 14 }] };
    it('should match snapshot', () => {
        const wrap = shallowSmart(<EntityTable {...props}/>);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<EntityTable {...props}/>);
        expect(wrap.find('EntityTable')).toHaveLength(1);
    });
    it('should render its children', () => {
        const wrap = mountSmart(<EntityTable {...props}/>);
        expect(wrap.find('TableHeaderCell')).toHaveLength(2);
        expect(wrap.find('TableRow')).toHaveLength(2);
    });
    it('should render 10 cells if computer', () => {
        resizeTo('computer');
        const wrap = mountSmart(<EntityTable {...props}/>);
        expect(wrap.find('TableCell')).toHaveLength(4);
    });
    it('should render 1 cell if mobile', () => {
        resizeTo('mobile');
        const wrap = mountSmart(<EntityTable {...props}/>);
        expect(wrap.find('TableCell')).toHaveLength(2);
    });
    it('should call onSelect when click on icon', () => {
        resizeTo('mobile');
        const wrap = mountSmart(<EntityTable {...props}/>);
        wrap.find('Icon').last().getElement().props.onClick();
        expect(props.onSelect).toBeCalledWith(1);
    });
});
