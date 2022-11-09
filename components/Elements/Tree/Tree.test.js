import React from 'react';
import { mountSmart, shallowSmart, act, mockStore } from "helpers/tests/enzymeHelpers";
import Tree from 'components/Elements/Tree';

describe('Tree', () => {
    const store = mockStore({ groups: [] });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<Tree/>);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<Tree/>, store);
        expect(wrap.find('Tree')).toHaveLength(2);
    });
    it('should render no data message if data empty', () => {
        const wrap = mountSmart(<Tree/>, store);
        expect(wrap.find('NoDataText')).toHaveLength(1);
    });
    it('should render 1 tree item', () => {
        const localStore = mockStore({ groups: [{ id: 1, parent_group_id: null }, { id: 2, parent_group_id: 1 }, { id: 3, parent_group_id: 2 }] });
        const wrap = mountSmart(<Tree/>, localStore);
        expect(wrap.find('TreeItem')).toHaveLength(2);
    });
    it('should render 1 tree item if data in altData', () => {
        const localStore = mockStore({ groups: [] });
        const wrap = mountSmart(<Tree altData={[{ id: 1, parent_group_id: null }, { id: 2, parent_group_id: 1 }, { id: 3, parent_group_id: 2 }]}/>, localStore);
        expect(wrap.find('TreeItem')).toHaveLength(2);
    });
    it('should render 3 tree items', () => {
        const localStore = mockStore({ groups: [{ id: 1, parent_group_id: null }, { id: 2, parent_group_id: null }, { id: 3, parent_group_id: null }] });
        const wrap = mountSmart(<Tree/>, localStore);
        expect(wrap.find('TreeItem')).toHaveLength(3);
    });
    it('should render 1 element when filtered and 2 when search is empty', () => {
        const localStore = mockStore({ groups: [{ name: 1, parent_group_id: null }, { name: 2, parent_group_id: null }] });
        const wrap = mountSmart(<Tree/>, localStore);
        expect(wrap.find('TreeItem')).toHaveLength(2);
        act(() => {
            wrap.find('Input').getElement().props.onChange({}, { value: '1' });
        });
        wrap.update();
        expect(wrap.find('TreeItem')).toHaveLength(1);
        act(() => {
            wrap.find('Input').getElement().props.onChange({}, { value: '2' });
        });
        wrap.update();
        expect(wrap.find('TreeItem')).toHaveLength(1);
        act(() => {
            wrap.find('Input').getElement().props.onChange({}, { value: '' });
        });
        wrap.update();
        expect(wrap.find('TreeItem')).toHaveLength(2);
    });
});
