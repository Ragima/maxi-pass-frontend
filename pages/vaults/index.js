import withRedirectIfNotAuth from 'components/HOC/withRedirectIfNotAuth';
import withIntl from 'components/HOC/withIntl';

import { connect } from "react-redux";
import { getVaultsState } from 'redux/selectors/vaultsSelectors';
import { getGroupVaultsState } from 'redux/selectors/relationsSelectors';
import vaultActions from 'redux/actions/vaultActions';
import { getInitialData } from 'helpers/initialize/initialize';
import { getUserRoleState } from 'redux/selectors/userSelectors';
import Vaults from 'pages_components/Vaults';

getInitialData(Vaults, [vaultActions.getVaultsPage]);

const mapStateToProps = state => ({
    vaults: getVaultsState(state),
    groupVaults: getGroupVaultsState(state),
    role: getUserRoleState(state),
});


export default connect(mapStateToProps)(withRedirectIfNotAuth(withIntl(Vaults)));
