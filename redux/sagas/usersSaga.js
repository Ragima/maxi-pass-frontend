import { takeLatest } from 'redux-saga/effects';
import actions from 'redux/actions/usersActions';
import {
    createUser, getUsers, deleteUser, editUser, changeUserRole,
    getUser, restoreUser, toggleBlock, generateReport, changeRoleSupport,
} from 'api_layer/requests/users';
import { createSaga } from 'helpers/redux/saga';

export default function* actionWatcher() {
    yield takeLatest(actions.CREATE_USER, createUserSaga);
    yield takeLatest(actions.GET_USERS, getUsersSaga);
    yield takeLatest(actions.DELETE_USER, deleteUserSaga);
    yield takeLatest(actions.EDIT_USER, editUserSaga);
    yield takeLatest(actions.CHANGE_ROLE, changeUserRoleSaga);
    yield takeLatest(actions.CHANGE_ROLE_SUPPORT, changeRoleSupportSaga);
    yield takeLatest(actions.GET_USER, getUserSaga);
    yield takeLatest(actions.RESTORE_USER, restoreUserSaga);
    yield takeLatest(actions.TOGGLE_BLOCK, toggleBlockSaga);
    yield takeLatest(actions.GENERATE_USER_REPORT, generateUserReportSaga);
}

export const createUserSaga = createSaga(createUser,
    { successAction: actions.createUserSuccess },
    { successId: 'userCreated' },
);

export const deleteUserSaga = createSaga(deleteUser,
    { successAction: actions.deleteUserSuccess },
    { successId: 'userDeleted', paramsInstead: true },
);

export const generateUserReportSaga = createSaga(generateReport,
    { successAction: actions.generateUserReportSuccess },
    { successId: 'reportSent' },
);

export const restoreUserSaga = createSaga(restoreUser,
    { successAction: actions.restoreUserSuccess },
    { paramsInstead: true, successId: 'passwordReseted' },
);

export const editUserSaga = createSaga(editUser,
    { successAction: actions.editUserSuccess },
    { successId: 'userEdited', paramsInstead: true },
);

export const toggleBlockSaga = createSaga(toggleBlock,
    { successAction: actions.toggleBlockSuccess },
    { successId: 'userBlocked', paramsInstead: true },
);

export const changeUserRoleSaga = createSaga(changeUserRole,
    { successAction: actions.changeRoleSuccess },
    { successId: 'roleChanged' },
);

export const changeRoleSupportSaga = createSaga(changeRoleSupport,
    { successAction: actions.changeRoleSupportSuccess },
    { successId: 'roleChanged' },
);

export const getUsersSaga = createSaga(getUsers,
    { successAction: actions.getUsersSuccess },
);

export const getUserSaga = createSaga(getUser,
    { successAction: actions.getUserSuccess },
);
