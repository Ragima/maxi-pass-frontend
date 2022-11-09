import { takeLatest } from 'redux-saga/effects';
import actions from 'redux/actions/vaultActions';
import { createVault, getVaults, deleteVault, editVault, getVault, generateReport } from 'api_layer/requests/vault';
import { createSaga } from 'helpers/redux/saga';

export default function* actionWatcher() {
    yield takeLatest(actions.CREATE_VAULT, createVaultSaga);
    yield takeLatest(actions.GET_VAULTS, getVaultsSaga);
    yield takeLatest(actions.DELETE_VAULT, deleteVaultSaga);
    yield takeLatest(actions.EDIT_VAULT, editVaultSaga);
    yield takeLatest(actions.GET_VAULT, getVaultSaga);
    yield takeLatest(actions.GET_VAULTS_PAGE, getVaultsPageSaga);
    yield takeLatest(actions.GENERATE_VAULT_REPORT, generateVaultReportSaga);
}

export const createVaultSaga = createSaga(createVault,
    { successAction: actions.createVaultSuccess },
    { successId: 'vaultCreated' },
);

export const deleteVaultSaga = createSaga(deleteVault,
    { successAction: actions.deleteVaultSuccess },
    { successId: 'vaultDeleted', paramsInstead: true },
);

export const generateVaultReportSaga = createSaga(generateReport,
    { successAction: actions.generateVaultReportSuccess },
    { successId: 'reportSent' },
);

export const editVaultSaga = createSaga(editVault,
    { successAction: actions.editVaultSuccess },
    { successId: 'vaultEdited' },
);

export const getVaultsSaga = createSaga(getVaults,
    { successAction: actions.getVaultsSuccess },
);

export const getVaultsPageSaga = createSaga(getVaults,
    { successAction: actions.getVaultsPageSuccess },
);

export const getVaultSaga = createSaga(getVault,
    { successAction: actions.getVaultSuccess },
    { showError: false },
);
