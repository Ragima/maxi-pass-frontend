import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import actions from 'redux/actions/userActions';
import { client } from 'helpers/redux/actions';
import ChangePasswordForm from './ChangePasswordForm';

const mapDispatchToProps = dispatch => ({
    updateSettings: client(dispatch, actions.updateSettings),
});

export default connect(null, mapDispatchToProps)(injectIntl(ChangePasswordForm));
