import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import actions from 'redux/actions/userActions';
import { client } from 'helpers/redux/actions';
import LoginForm from './LoginForm';

const mapDispatchToProps = dispatch => ({
    signIn: client(dispatch, actions.signIn),
});

export default connect(null, mapDispatchToProps)(injectIntl(LoginForm));
