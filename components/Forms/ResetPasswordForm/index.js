import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import actions from 'redux/actions/userActions';
import { client } from 'helpers/redux/actions';
import ResetPasswordForm from './ResetPasswordForm';

const mapDispatchToProps = dispatch => ({
    resetPassword: client(dispatch, actions.resetPassword),
});

export default connect(null, mapDispatchToProps)(injectIntl(ResetPasswordForm));
