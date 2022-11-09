import React from 'react';
import { mountSmart, shallowSmart, mockStore } from "helpers/tests/enzymeHelpers";
import ModalSendReport from 'components/Modals/ModalSendReport';
import WModalSendReport from 'components/Modals/ModalSendReport/ModalSendReport';

describe('ModalSendReport', () => {
    const store = mockStore({ user: {} });
    let props = {};
    beforeEach(() => {
        props = {
            generateVaultReport: jest.fn(async () => {}),
            generateGroupReport: jest.fn(async () => {}),
            generateUserReport: jest.fn(async () => {}),
            generateActivityReport: jest.fn(async () => {}),
            users: [],
            data: { id: 1, hi: 2 },
            trigger: <div className='toFind' />,
            modalKey: 'addGroup',
            intl: { formatMessage: jest.fn() },
        };
    });
    
    it('should match snapshot', () => {
        const wrap = shallowSmart(<ModalSendReport {...props}/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<ModalSendReport {...props}/>, store);
        expect(wrap.find('ModalSendReport')).toHaveLength(1);
    });
    it('should render default trigger', () => {
        const wrap = mountSmart(<ModalSendReport {...props} trigger={null}/>, store);
        expect(wrap.find('ModalSendReport')).toHaveLength(1);
        expect(wrap.find('Button')).toHaveLength(1);
    });
    it('should call generate vault report on select', async () => {
        const wrap = mountSmart(<WModalSendReport {...props} type='vault'/>, store);
        wrap.find('.toFind').simulate('click');
        await wrap.find('EntityTable').getElement().props.onSelect(4);
        expect(props.generateVaultReport).toBeCalledWith({ vault_id: 1, user_id: 4 });
    });
    it('should call generate group report on select', async () => {
        const wrap = mountSmart(<WModalSendReport {...props} type='group'/>, store);
        wrap.find('.toFind').simulate('click');
        await wrap.find('EntityTable').getElement().props.onSelect(4);
        expect(props.generateGroupReport).toBeCalledWith({ group_id: 1, user_id: 4 });
    });
    it('should call generate user report on select', async () => {
        const wrap = mountSmart(<WModalSendReport {...props} type='user'/>, store);
        wrap.find('.toFind').simulate('click');
        await wrap.find('EntityTable').getElement().props.onSelect(4);
        expect(props.generateUserReport).toBeCalledWith({ report_receiver_id: 4, user_id: 1 });
    });
    it('should call generate activity report on select', async () => {
        const wrap = mountSmart(<WModalSendReport {...props} type='activity'/>, store);
        wrap.find('.toFind').simulate('click');
        await wrap.find('EntityTable').getElement().props.onSelect(4);
        expect(props.generateActivityReport).toBeCalledWith({ id: 1, hi: 2, user_id: 4 });
    });
});
