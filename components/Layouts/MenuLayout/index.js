import { connect } from "react-redux";
import { getIsMenuOpenState } from 'redux/selectors/menuSelectors';
import { getUserRoleState, getUserLeadState } from 'redux/selectors/userSelectors';
import actions from 'redux/actions/menuActions';
import MenuLayout from 'MenuLayout';
import { withRouter } from 'next/router';
import { client } from 'helpers/redux/actions';
import userActions from 'redux/actions/userActions';

const mapStateToProps = state => ({
    isMenuOpen: getIsMenuOpenState(state),
    role: getUserRoleState(state),
    isLead: getUserLeadState(state),
});

const mapDispatchToProps = dispatch => ({
    hideMenu: () => dispatch(actions.hideMenu()),
    signOut: client(dispatch, userActions.signOut),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuLayout));
