import { connect } from "react-redux";
import { getInvitationsState } from 'redux/selectors/invitationsSelectors';
import actions from 'redux/actions/invitationActions';
import { injectIntl } from 'react-intl';
import { client } from 'helpers/redux/actions';
import InvitationsTable from './InvitationsTable';

const mapStateToProps = state => ({
    invitations: getInvitationsState(state),
});

const mapDispatchToProps = dispatch => ({
    deleteInvitation: client(dispatch, actions.deleteInvitation),
    resendInvitation: client(dispatch, actions.resendInvitation),
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(InvitationsTable));
