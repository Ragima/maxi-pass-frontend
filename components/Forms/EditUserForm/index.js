import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import actions from 'redux/actions/usersActions';
import { client } from 'helpers/redux/actions';
import EditUserForm from './EditUserForm';

const mapDispatchToProps = dispatch => ({
    editUser: client(dispatch, actions.editUser),
});

export default connect(null, mapDispatchToProps)(injectIntl(EditUserForm));
