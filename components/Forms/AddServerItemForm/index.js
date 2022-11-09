import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import actions from 'redux/actions/vaultItemActions';
import { client } from 'helpers/redux/actions';
import AddServerItemForm from './AddServerItemForm';

const mapDispatchToProps = dispatch => ({
    createVaultItem: client(dispatch, actions.createVaultItem),
    editVaultItem: client(dispatch, actions.editVaultItem),
    documentMethods: {
        get: client(dispatch, actions.getDocument),
        delete: client(dispatch, actions.deleteDocument),
        create: client(dispatch, actions.createDocument),
        update: client(dispatch, actions.updateDocument),
    },
});

export default connect(null, mapDispatchToProps)(injectIntl(AddServerItemForm));
