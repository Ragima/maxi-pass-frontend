import userReducer, { initialState } from "redux/reducers/userReducer";
import actions from 'redux/actions/userActions';
import invitationActions from 'redux/actions/invitationActions';

describe('userReducer', () => {
    it('should return the initial state', () => {
        expect(userReducer(undefined, {})).toEqual(initialState);
    });
    it('should set user on success sign in', () => {
        expect(userReducer(initialState, actions.signInSuccess({ payload: { name: 'Jon' } }))).toEqual({ name: 'Jon', isSignIn: true });
    });
    it('should set user on success validate', () => {
        expect(userReducer(initialState, actions.validateTokenSuccess({ payload: { name: 'Jon' } }))).toEqual({ name: 'Jon', isSignIn: true });
    });
    it('should set user on success invitation', () => {
        expect(userReducer(initialState, invitationActions.acceptInvitationSuccess({ payload: { name: 'Jon' } }))).toEqual({ name: 'Jon', isSignIn: true });
    });
    it('should set user on settings update', () => {
        const recieved=userReducer(initialState, actions.updateSettingsSuccess({ payload: { name: 'Jon' } }))
        const expected={ name: 'Jon', isSignIn: true }
        expect(recieved).toEqual(expected);
    });
    it('should set user on settings update when password was changed', () => {
        const recieved=userReducer(initialState, actions.updateSettingsSuccess({ payload: { name: 'Jon',password_changed:true } }))
        const expected={ name: 'Jon', isSignIn: false, password_changed:true }
        expect(recieved).toEqual(expected);
    });
    it('should set otp required to true on enable', () => {
        expect(userReducer(initialState, actions.enableTwoFactorSuccess())).toEqual({ isSignIn: false, otp_required: true });
    });
    it('should set otp required to false on disable', () => {
        expect(userReducer(initialState, actions.disableTwoFactorSuccess())).toEqual({ isSignIn: false, otp_required: false });
    });
});
