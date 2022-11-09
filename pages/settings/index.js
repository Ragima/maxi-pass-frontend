import withRedirectIfNotAuth from 'components/HOC/withRedirectIfNotAuth';
import withIntl from 'components/HOC/withIntl';
import { connect } from "react-redux";
import { getPassExpiredState, getTeamNameState, getOTPRequiredState, getUserRoleState, getUserLeadState } from 'redux/selectors/userSelectors';
import actions from 'redux/actions/userActions';
import { client } from 'helpers/redux/actions';
import Settings from 'pages_components/Settings';

const mapStateToProps = state => ({
    shouldChangePass: getPassExpiredState(state),
    teamName: getTeamNameState(state),
    otpRequired: getOTPRequiredState(state),
    role: getUserRoleState(state),
    isLead: getUserLeadState(state),
});

const mapDispatchToProps = dispatch => ({
    enableTwoFactor: client(dispatch, actions.enableTwoFactor),
    disableTwoFactor: client(dispatch, actions.disableTwoFactor),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRedirectIfNotAuth(withIntl(Settings)));
