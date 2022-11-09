import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import actions from 'redux/actions/invitationActions';
import { getTeamNameState } from 'redux/selectors/userSelectors';
import { client } from 'helpers/redux/actions';
import InviteUserForm from './InviteUserForm';
import { getInvitationsState } from 'redux/selectors/invitationsSelectors';
import { getUserEmailState } from 'redux/selectors/userSelectors';

const mapDispatchToProps = dispatch => ({
    createInvitation: client(dispatch, actions.createInvitation),
});

const mapStateToProps = state => ({
    teamName: getTeamNameState(state),
    invitedUsers: getInvitationsState(state),
    currentUserEmail: {email: getUserEmailState(state)},
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(InviteUserForm));
