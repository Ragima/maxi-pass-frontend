import { connect } from "react-redux";
import actions from 'redux/actions/menuActions';
import userActions from 'redux/actions/userActions';
import { getIsMenuOpenState } from 'redux/selectors/menuSelectors';
import { getUserEmailState, getUserRoleState, getUserLeadState, getTeamNameState, getIsAdminState, getIsSignInState } from 'redux/selectors/userSelectors';
import { withRouter } from 'next/router';
import { client } from 'helpers/redux/actions';
import HeaderLayout from './HeaderLayout';

const mapStateToProps = state => ({
    isMenuOpen: getIsMenuOpenState(state),
    email: getUserEmailState(state),
    role: getUserRoleState(state),
    isLead: getUserLeadState(state),
    isAdmin: getIsAdminState(state),
    teamName: getTeamNameState(state),
    isSignIn: getIsSignInState(state),
});

const mapDispatchToProps = dispatch => ({
    hideMenu: () => dispatch(actions.hideMenu()),
    showMenu: () => dispatch(actions.showMenu()),
    signOut: client(dispatch, userActions.signOut),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderLayout));
