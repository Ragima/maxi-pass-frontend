import actions from 'redux/actions/userActions';
import invitationActions from 'redux/actions/invitationActions';

export const initialState = {
    isSignIn: false,
};

const formatUser = user => user;

export default (state = initialState, action) => {
    switch (action.type) {
    case actions.VALIDATE_TOKEN_SUCCESS:
    case invitationActions.ACCEPT_INVITATION_SUCCESS:
    case actions.UPDATE_SETTINGS_SUCCESS:
        if (action.payload.password_changed) {
            return { 
                ...state,
                ...formatUser(action.payload),
                isSignIn: false, 
            };
        }
    case actions.SIGN_OUT:
    case actions.SIGN_IN_SUCCESS:
        return { ...state, ...formatUser(action.payload), isSignIn: true };
    case actions.ENABLE_TWO_FACTOR_SUCCESS:
        return { ...state, otp_required: true };
    case actions.DISABLE_TWO_FACTOR_SUCCESS:
        return { ...state, otp_required: false };
    default:
        return state;
    }
};
