import React from 'react';
import { mountSmart, shallowSmart, mockStore, defineMatchMedia } from "helpers/tests/enzymeHelpers";
import ModalWrap from 'components/Modals/ModalWrap';

describe('ModalWrap', () => {
    let props = {};
    let child;
    beforeEach(() => {
        props = {
            title: 'newGroup',
            icon: 'user',
            trigger: <div className='trigger'/>,
        };
        child = ({ closeModal }) => <div onClick={closeModal} className='child'/>;
    });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<ModalWrap {...props}>{child}</ModalWrap>);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<ModalWrap {...props}>{child}</ModalWrap>);
        expect(wrap.find('ModalWrap')).toHaveLength(1);
    });
    it('should render trigger', () => {
        const wrap = mountSmart(<ModalWrap {...props}>{child}</ModalWrap>);
        expect(wrap.find('.trigger')).toHaveLength(1);
    });
    it('should render child', () => {
        const wrap = mountSmart(<ModalWrap {...props}>{child}</ModalWrap>);
        wrap.find('.trigger').simulate('click');
        expect(wrap.find('.child')).toHaveLength(1);
    });
    it('should close Modal', () => {
        const wrap = mountSmart(<ModalWrap {...props}>{child}</ModalWrap>);
        wrap.find('.trigger').simulate('click');
        wrap.find('.child').simulate('click');
        expect(wrap.find('Modal').getElement().props.open).toEqual(false);
    });
});
