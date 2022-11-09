import React from 'react';
import { mountSmart, shallowSmart, mockStore, defineMatchMedia } from "helpers/tests/enzymeHelpers";
import InviteUserForm from 'components/Forms/InviteUserForm';
import WInviteUserForm from 'components/Forms/InviteUserForm/InviteUserForm';

describe('InviteUserForm', () => {
    const store = mockStore({ user: {}, invitations: [] });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<InviteUserForm/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<InviteUserForm />, store);
        expect(wrap.find('InviteUserForm')).toHaveLength(1);
    });
    it('should call createInvitation on submit', async () => {
        const createInvitation = jest.fn();
        const wrap = mountSmart(<WInviteUserForm invitedUsers={[]} currentUserEmail={{email: ''}} createInvitation={createInvitation} intl={{ formatMessage: () => 'sd' }}/>);
        await wrap.find('form').getElement().props.onSubmit();
        expect(createInvitation).toBeCalled();
    });
    it('should call createInvitation and onSubmit on submit', async () => {
        const createInvitation = jest.fn(async () => ({}));
        const onSubmit = jest.fn();
        const wrap = mountSmart(<WInviteUserForm invitedUsers={[]} currentUserEmail={{email: ''}} createInvitation={createInvitation} onSubmit={onSubmit} intl={{ formatMessage: () => 'sd' }}/>);
        await wrap.find('form').getElement().props.onSubmit();
        expect(createInvitation).toBeCalled();
        expect(onSubmit).toBeCalled();
    });
    it('should call createInvitation and not to call onSubmit and createInvitation on submit', async () => {
        const createInvitation = jest.fn(async () => ({ }));
        const onSubmit = jest.fn();
        const wrap = mountSmart(<WInviteUserForm invitedUsers={[]} currentUserEmail={{email: ''}} createInvitation={createInvitation} onSubmit={null} intl={{ formatMessage: () => 'sd' }}/>);
        await wrap.find('form').getElement().props.onSubmit();
        expect(createInvitation).toBeCalled();
        expect(onSubmit).not.toBeCalled();
    });
});
