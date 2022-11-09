import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import { client } from 'helpers/redux/actions';
import actions from 'redux/actions/vaultActions';
import { getUserWithNameEmailState } from 'redux/selectors/usersSelectors';
import VaultsTable from './VaultsTable';

const mapDispatchToProps = dispatch => ({
    deleteVault: client(dispatch, actions.deleteVault),
});

const mapStateToProps = state => ({
    users: getUserWithNameEmailState(state),
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(injectIntl(VaultsTable)));
