import { connect } from "react-redux";
import { injectIntl } from 'react-intl';
import { client } from 'helpers/redux/actions';
import actions from 'redux/actions/usersActions';
import ResetedUsersTable from './ResetedUsersTable';

const mapDispatchToProps = dispatch => ({
    deleteUser: client(dispatch, actions.deleteUser),
    restoreUser: client(dispatch, actions.restoreUser),
});

export default injectIntl(connect(null, mapDispatchToProps)(ResetedUsersTable));
