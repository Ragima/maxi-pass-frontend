import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import actions from 'redux/actions/invitationActions';
import { client } from 'helpers/redux/actions';
import AcceptForm from './AcceptForm';

const mapDispatchToProps = dispatch => ({
    acceptInvitation: client(dispatch, actions.acceptInvitation),
});

export default connect(null, mapDispatchToProps)(injectIntl(AcceptForm));
