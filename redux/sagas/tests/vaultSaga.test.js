
import watchers, * as saga from "redux/sagas/vaultSaga";
import actions from "redux/actions/vaultActions";
import { watchersTests } from 'helpers/tests/enzymeHelpers';

describe('watchers', () => {
    watchersTests([
        [actions.CREATE_VAULT, saga.createVaultSaga],
        [actions.GET_VAULTS, saga.getVaultsSaga],
        [actions.DELETE_VAULT, saga.deleteVaultSaga],
        [actions.EDIT_VAULT, saga.editVaultSaga],
        [actions.GET_VAULT, saga.getVaultSaga],
        [actions.GET_VAULTS_PAGE, saga.getVaultsPageSaga],
        [actions.GENERATE_VAULT_REPORT, saga.generateVaultReportSaga],
    ], watchers);
});
