import React from 'react';
import { mountSmart, shallowSmart } from "helpers/tests/enzymeHelpers";
import Menu from 'components/Menu';

describe('Menu', () => {
    let props = {};
    beforeEach(() => {
        props = {
            pathname: '/groups',
            hideMenu: jest.fn(),
            role: 'admin',
        };
    });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<Menu {...props}/>);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<Menu {...props}/>);
        expect(wrap.find('Menu')).toHaveLength(1);
    });
    it('should render active menuBlock if it is pathname the same', () => {
        const wrap = mountSmart(<Menu {...props}/>);
        expect(wrap.find('Block__HorizontalMenuBlock').at(1).getElement().props.active).toEqual(true);
    });
    it('should render horizontal menu', () => {
        const wrap = mountSmart(<Menu {...props}/>);
        expect(wrap.find('Block__HorizontalMenuBlock')).toHaveLength(4);
        expect(wrap.find('Content__HorizontalMenuContent')).toHaveLength(1);
    });
    it('should render horizontal menu without invitation if lead', () => {
        const wrap = mountSmart(<Menu {...props} isLead/>);
        expect(wrap.find('Block__HorizontalMenuBlock')).toHaveLength(3);
        expect(wrap.find('Content__HorizontalMenuContent')).toHaveLength(1);
    });
    it('should not render horizontal menu if it is user', () => {
        const wrap = mountSmart(<Menu {...props} role="user"/>);
        expect(wrap.find('Block__HorizontalMenuBlock')).toHaveLength(0);
        expect(wrap.find('Content__HorizontalMenuContent')).toHaveLength(0);
    });
    it('should render vertical menu', () => {
        const wrap = mountSmart(<Menu {...props} vertical/>);
        expect(wrap.find('Block__VerticalMenuBlock')).toHaveLength(7);
        expect(wrap.find('Content__VerticalMenuContent')).toHaveLength(2);
    });
    it('should render vertical menu without invitation if lead', () => {
        const wrap = mountSmart(<Menu {...props} vertical isLead/>);
        expect(wrap.find('Block__VerticalMenuBlock')).toHaveLength(6);
        expect(wrap.find('Content__VerticalMenuContent')).toHaveLength(2);
    });
    it('should render vertical menu without horizontal blocks if role is user', () => {
        const wrap = mountSmart(<Menu {...props} vertical role='user'/>);
        expect(wrap.find('Block__VerticalMenuBlock')).toHaveLength(3);
        expect(wrap.find('Content__VerticalMenuContent')).toHaveLength(1);
    });
    it('should call signOut', () => {
        const mock = jest.fn();
        const wrap = mountSmart(<Menu {...props} vertical signOut={mock} hideMenu={null}/>);
        wrap.find('Block__VerticalMenuBlock').last().getElement().props.onClick();
        expect(mock).toBeCalled();
    });
    it('should call hideMenu', () => {
        const mock = jest.fn();
        const wrap = mountSmart(<Menu {...props} vertical hideMenu={mock}/>);
        wrap.find('Block__VerticalMenuBlock').last().getElement().props.onClick();
        expect(mock).toBeCalled();
    });
});
