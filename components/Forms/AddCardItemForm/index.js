import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import actions from 'redux/actions/vaultItemActions';
import { client } from 'helpers/redux/actions';
import AddCardItemForm from './AddCardItemForm';

const mapDispatchToProps = dispatch => ({
    createVaultItem: client(dispatch, actions.createVaultItem),
    editVaultItem: client(dispatch, actions.editVaultItem),
});

export default connect(null, mapDispatchToProps)(injectIntl(AddCardItemForm));
