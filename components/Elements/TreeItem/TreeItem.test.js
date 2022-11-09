import React from 'react';
import { mountSmart, shallowSmart, resizeTo, mockStore } from "helpers/tests/enzymeHelpers";
import TreeItem from 'components/Elements/TreeItem';
import WTreeItem from 'components/Elements/TreeItem/TreeItem';

describe('TreeItem', () => {
    let props = {};
    const store = mockStore({ });
    beforeEach(() => {
        props = {
            data: { name: 'name', users: 1, vaults: 1, id: 11 },
            metadata: { depth: 1 },
            toggleChildren: jest.fn(),
            deleteGroup: jest.fn(),
            onSelect: jest.fn(),
            setSelect: jest.fn(),
            intl: { formatMessage: jest.fn() },
        };
    });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<TreeItem {...props}/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<TreeItem {...props}/>, store);
        expect(wrap.find('TreeItem')).toHaveLength(1);
    });
    it('should render angle down icon', () => {
        const wrap = mountSmart(<TreeItem {...props} metadata={{ hasChildren: true, hasVisibleChildren: true, depth: 1 }}/>, store);
        expect(wrap.find('Icon').first().getElement().props.name).toEqual('angle down');
    });
    it('should render angle right icon', () => {
        const wrap = mountSmart(<TreeItem {...props} metadata={{ hasChildren: true, hasVisibleChildren: false, depth: 1 }}/>, store);
        expect(wrap.find('Icon').first().getElement().props.name).toEqual('angle right');
    });
    it('should render 2 DataInfo on computer size', () => {
        const wrap = mountSmart(<TreeItem {...props}/>, store);
        expect(wrap.find('Tree__DataInfo')).toHaveLength(2);
    });
    it('should render 0 DataInfo on mobile size', () => {
        resizeTo('mobile');
        const wrap = mountSmart(<TreeItem {...props}/>, store);
        expect(wrap.find('Tree__DataInfo')).toHaveLength(0);
    });
    it('should not ModalEditGroup if hideInfo', () => {
        resizeTo('computer');
        const wrap = mountSmart(<TreeItem {...props} hideInfo/>, store);
        expect(wrap.find('ModalEditGroup')).toHaveLength(0);
    });
    it('should call secondAction if it is present', () => {
        resizeTo('computer');
        const secondAction = jest.fn();
        mountSmart(<TreeItem {...props} hideInfo secondAction={secondAction}/>, store);
        expect(secondAction).toBeCalled();
    });
    it('should render 2 DataInfo with proper text', () => {
        resizeTo('computer');
        const wrap = mountSmart(<TreeItem {...props}/>, store);
        expect(wrap.find('Tree__DataName').first().text()).toEqual('name');
        expect(wrap.find('Tree__DataInfo').first().text()).toEqual('Users: 1');
        expect(wrap.find('Tree__DataInfo').at(1).text()).toEqual('Vaults: 1');
    });
    it('should not call onSelect if item is not selectable', () => {
        resizeTo('computer');
        const wrap = mountSmart(<TreeItem {...props}/>, store);
        expect(wrap.find('Tree__TreeItemData').getElement().props.onClick).toEqual(undefined);
    });
    it('should call onSelect if item is selectable', () => {
        resizeTo('computer');
        const wrap = mountSmart(<TreeItem {...props} selectable/>, store);
        wrap.find('Tree__TreeItemData').getElement().props.onClick();
        expect(props.onSelect).toBeCalled();
        expect(props.setSelect).toBeCalled();
    });
    it('should call onSelect with data if item is selectable and not selected', () => {
        resizeTo('computer');
        const wrap = mountSmart(<TreeItem {...props} selectable/>, store);
        wrap.find('Tree__TreeItemData').getElement().props.onClick();
        expect(props.onSelect).toBeCalledWith({ name: 'name', users: 1, vaults: 1, id: 11 });
        expect(props.setSelect).toBeCalledWith({ name: 'name', users: 1, vaults: 1, id: 11 });
    });
    it('should call onSelect with null if item is selectable and selected', () => {
        resizeTo('computer');
        const wrap = mountSmart(<TreeItem {...props} selectable selected/>, store);
        wrap.find('Tree__TreeItemData').getElement().props.onClick();
        expect(props.onSelect).toBeCalledWith(null);
        expect(props.setSelect).toBeCalledWith(null);
    });
    it('should not call onSelect if it is absent', () => {
        resizeTo('computer');
        const wrap = mountSmart(<TreeItem {...props} selectable selected onSelect={undefined}/>, store);
        wrap.find('Tree__TreeItemData').getElement().props.onClick();
        expect(props.onSelect).not.toBeCalled();
    });
    it('should call deleteGroup', () => {
        resizeTo('computer');
        const wrap = mountSmart(<WTreeItem {...props} selectable selected onSelect={undefined}/>);
        wrap.find('ConfirmModal').getElement().props.callback();
        expect(props.deleteGroup).toBeCalledWith({ id: 11 });
    });
});
