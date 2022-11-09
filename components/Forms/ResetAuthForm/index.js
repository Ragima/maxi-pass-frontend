import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import actions from 'redux/actions/userActions';
import { client } from 'helpers/redux/actions';
import ResetAuthForm from './ResetAuthForm';

const mapDispatchToProps = dispatch => ({
    resetTwoFactor: client(dispatch, actions.resetTwoFactor),
});

export default connect(null, mapDispatchToProps)(injectIntl(ResetAuthForm));
