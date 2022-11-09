import withIntl from 'components/HOC/withIntl';
import composedPageHoc from 'components/HOC/composedPageHoc';
import { connect } from "react-redux";
import { getRestoredUsersState, getNotRestoredUsersState } from 'redux/selectors/usersSelectors';
import { getInvitationsState } from 'redux/selectors/invitationsSelectors';
import { getUserLeadState } from 'redux/selectors/userSelectors';
import { getGroupUsersState } from 'redux/selectors/relationsSelectors';
import { getInitialData } from 'helpers/initialize/initialize';
import usersActions from 'redux/actions/usersActions';
import Users from 'pages_components/Users';

getInitialData(Users, [usersActions.getUsers]);

const mapStateToProps = state => ({
    resetedUsers: getRestoredUsersState(state),
    users: getNotRestoredUsersState(state),
    invitations: getInvitationsState(state),
    groupUsers: getGroupUsersState(state),
    isLead: getUserLeadState(state),
});

export default connect(mapStateToProps)(composedPageHoc(withIntl(Users)));
