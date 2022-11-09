import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import actions from 'redux/actions/vaultActions';
import { client } from 'helpers/redux/actions';
import AddVaultForm from './AddVaultForm';

const mapDispatchToProps = dispatch => ({
    createVault: client(dispatch, actions.createVault),
});

export default connect(null, mapDispatchToProps)(injectIntl(AddVaultForm));
