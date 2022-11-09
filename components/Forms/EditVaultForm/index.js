import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import actions from 'redux/actions/vaultActions';
import { client } from 'helpers/redux/actions';
import EditVaultForm from './EditVaultForm';
import action  from '../../../redux/actions/modalModeActions';

const mapDispatchToProps = dispatch => ({
    editVault: client(dispatch, actions.editVault),
    modalCloseMode: () => dispatch(action.setCloseMode()),
});

export default connect(null, mapDispatchToProps)(injectIntl(EditVaultForm));
