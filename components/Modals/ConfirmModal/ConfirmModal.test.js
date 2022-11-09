import React from 'react';
import { mountSmart, shallowSmart } from "helpers/tests/enzymeHelpers";
import ConfirmModal from 'components/Modals/ConfirmModal';

describe('ConfirmModal', () => {
    let props = {};
    beforeEach(() => {
        props = {
            trigger: <div className='trigger' />,
            callback: jest.fn(),
        };
    });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<ConfirmModal {...props}/>);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<ConfirmModal {...props}/>);
        expect(wrap.find('ConfirmModal')).toHaveLength(1);
    });
    it('should call callback and close modal', () => {
        const wrap = mountSmart(<ConfirmModal {...props}/>);
        wrap.find('Confirm').getElement().props.onConfirm();
        expect(props.callback).toBeCalled();
        expect(wrap.find('Confirm').getElement().props.open).toEqual(false);
    });
    it('should toggle open state on trigger click', () => {
        const wrap = mountSmart(<ConfirmModal {...props}/>);
        wrap.find('.trigger').simulate('click');
        expect(wrap.find('Confirm').getElement().props.open).toEqual(true);
        wrap.find('.trigger').simulate('click');
        expect(wrap.find('Confirm').getElement().props.open).toEqual(false);
    });
});
