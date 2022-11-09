import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import actions from 'redux/actions/userActions';
import { client } from 'helpers/redux/actions';
import RegistrationForm from './RegistrationForm';

const mapDispatchToProps = dispatch => ({
    signUp: client(dispatch, actions.signUp),
});

export default connect(null, mapDispatchToProps)(injectIntl(RegistrationForm));
