import { takeLatest } from 'redux-saga/effects';
import actions from 'redux/actions/linkActions';
import { addGroupUser, addGroupVault, addUserVault, removeGroupUser, removeGroupVault,
    removeUserVault, changeUserRole, changeVaultPolicy } from 'api_layer/requests/link';
import { createSaga } from 'helpers/redux/saga';

export default function* actionWatcher() {
    yield takeLatest(actions.LINK_GROUP_USER, addGroupUserSaga);
    yield takeLatest(actions.LINK_GROUP_VAULT, addGroupVaultSaga);
    yield takeLatest(actions.LINK_USER_VAULT, addUserVaultSaga);
    yield takeLatest(actions.UNLINK_GROUP_USER, removeGroupUserSaga);
    yield takeLatest(actions.UNLINK_GROUP_VAULT, removeGroupVaultSaga);
    yield takeLatest(actions.UNLINK_USER_VAULT, removeUserVaultSaga);
    yield takeLatest(actions.CHANGE_GROUP_USER_ROLE, changeUserRoleSaga);
    yield takeLatest(actions.CHANGE_USER_VAULT_POLICY, changeVaultPolicySaga);
}

export const addGroupUserSaga = createSaga(addGroupUser,
    { successAction: actions.linkGroupUserSuccess },
);
export const addGroupVaultSaga = createSaga(addGroupVault,
    { successAction: actions.linkGroupVaultSuccess },
);
export const addUserVaultSaga = createSaga(addUserVault,
    { successAction: actions.linkUserVaultSuccess },
);
export const removeGroupUserSaga = createSaga(removeGroupUser,
    { successAction: actions.unlinkGroupUserSuccess },
    { paramsInstead: true, successId: 'unlinkSuccess' },
);
export const changeUserRoleSaga = createSaga(changeUserRole,
    { successAction: actions.changeGroupUserRoleSuccess },
    { paramsInstead: true },
);
export const changeVaultPolicySaga = createSaga(changeVaultPolicy,
    { successAction: actions.changeUserVaultPolicySuccess },
    { paramsInstead: true },
);
export const removeGroupVaultSaga = createSaga(removeGroupVault,
    { successAction: actions.unlinkGroupVaultSuccess },
    { paramsInstead: true, successId: 'unlinkSuccess' },
);
export const removeUserVaultSaga = createSaga(removeUserVault,
    { successAction: actions.unlinkUserVaultSuccess },
    { paramsInstead: true, successId: 'unlinkSuccess' },
);
