import invitationReducer, { initialState } from "redux/reducers/invitationReducer";
import actions from 'redux/actions/invitationActions';
import userActions from 'redux/actions/userActions';
import usersActions from 'redux/actions/usersActions';

describe('invitationReducer', () => {
    it('should return the initial state', () => {
        expect(invitationReducer(undefined, {})).toEqual(initialState);
    });
    it('should handle GET_INVITATIONS_SUCCESS', () => {
        expect(invitationReducer([], actions.getInvitationsSuccess({
            payload: [
                { id: 2, email: 'a' },
                { id: 3, email: 'b' }] })))
            .toEqual([{ id: 2, email: 'a' }, { id: 3, email: 'b' }]);
    });
    it('should handle GET_HOME_PAGE_SUCCESS', () => {
        expect(invitationReducer([], userActions.getHomePageSuccess({
            other: { invitations: { data: [
                { id: 2, email: 'a' },
                { id: 3, email: 'b' }] } } })))
            .toEqual([{ id: 2, email: 'a' }, { id: 3, email: 'b' }]);
    });
    it('should handle GET_USERS_SUCCESS', () => {
        expect(invitationReducer([], usersActions.getUsersSuccess({
            other: { invitations: { data: [
                { id: 2, email: 'a' },
                { id: 3, email: 'b' }] } } })))
            .toEqual([{ id: 2, email: 'a' }, { id: 3, email: 'b' }]);
    });
    it('should handle CREATE_INVITATION_SUCCESS', () => {
        expect(invitationReducer([{ id: 2, email: 'a' }], actions.createInvitationSuccess({ payload: { id: 3, email: 'b' } })))
            .toEqual([{ id: 2, email: 'a' }, { id: 3, email: 'b' }]);
    });
    it('should handle DELETE_INVITATION_SUCCESS', () => {
        expect(invitationReducer([{ id: 2, email: 'a' }, { id: 3, email: 'a' }], actions.deleteInvitationSuccess({ payload: { id: 3 } })))
            .toEqual([{ id: 2, email: 'a' }]);
    });
    it('should handle RESEND_INVITATION_SUCCESS', () => {
        expect(invitationReducer([{ id: 2, name: 'a' }, { id: 3, name: 'a' }], actions.resendInvitationSuccess({ payload: { id: 3, name: 'b' } })))
            .toEqual([{ id: 2, name: 'a' }, { id: 3, name: 'b' }]);
    });
});
