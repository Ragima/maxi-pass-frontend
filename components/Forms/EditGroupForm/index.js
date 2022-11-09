import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import actions from 'redux/actions/groupActions';
import { client } from 'helpers/redux/actions';
import EditGroupForm from './EditGroupForm';

const mapDispatchToProps = dispatch => ({
    editGroup: client(dispatch, actions.editGroup),
});

export default connect(null, mapDispatchToProps)(injectIntl(EditGroupForm));
