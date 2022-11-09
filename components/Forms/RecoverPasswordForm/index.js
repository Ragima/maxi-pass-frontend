import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import actions from 'redux/actions/userActions';
import { client } from 'helpers/redux/actions';
import RecoverPasswordForm from './RecoverPasswordForm';

const mapDispatchToProps = dispatch => ({
    changePassword: client(dispatch, actions.changePassword),
});

export default connect(null, mapDispatchToProps)(injectIntl(RecoverPasswordForm));
