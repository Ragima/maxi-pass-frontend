import React from 'react';
import { mountSmart, shallowSmart, mockStore, resizeTo } from "helpers/tests/enzymeHelpers";
import InvitationsTable from 'components/Tables/InvitationsTable';
import WInvitationsTable from 'components/Tables/InvitationsTable/InvitationsTable';

describe('InvitationsTable', () => {
    let props = {};
    const store = mockStore({ invitations: [{ email: 'email' }] });
    beforeEach(() => {
        props = { resendInvitation: jest.fn(), deleteInvitation: jest.fn(), intl: { formatMessage: jest.fn() } };
    });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<InvitationsTable {...props}/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<InvitationsTable {...props}/>, store);
        expect(wrap.find('InvitationsTable')).toHaveLength(1);
    });
    it('should render its children', () => {
        const wrap = mountSmart(<InvitationsTable {...props}/>, store);
        expect(wrap.find('TableHeaderCell')).toHaveLength(5);
        expect(wrap.find('TableRow')).toHaveLength(2);
    });
    it('should render 10 cells if computer', () => {
        resizeTo('computer');
        const wrap = mountSmart(<InvitationsTable {...props}/>, store);
        expect(wrap.find('TableCell')).toHaveLength(10);
    });
    it('should render 1 cell if mobile', () => {
        resizeTo('mobile');
        const wrap = mountSmart(<InvitationsTable {...props}/>, store);
        expect(wrap.find('TableCell')).toHaveLength(1);
    });
    it('should call resendInvitation on icon click', () => {
        resizeTo('computer');
        const wrap = mountSmart(<WInvitationsTable {...props} invitations={[{ email: 'asd' }]}/>);
        wrap.find('Icon').at(1).getElement().props.onClick();
        expect(props.resendInvitation).toBeCalled();
    });
    it('should call deleteInvitation on icon click', () => {
        resizeTo('computer');
        const wrap = mountSmart(<WInvitationsTable {...props} invitations={[{ email: 'asd' }]}/>);
        wrap.find('ConfirmModal').first().getElement().props.callback();
        expect(props.deleteInvitation).toBeCalled();
    });
});
