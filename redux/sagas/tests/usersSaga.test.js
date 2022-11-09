
import watchers, * as saga from "redux/sagas/usersSaga";
import actions from "redux/actions/usersActions";
import { watchersTests } from 'helpers/tests/enzymeHelpers';

describe('watchers', () => {
    watchersTests([
        [actions.CREATE_USER, saga.createUserSaga],
        [actions.GET_USERS, saga.getUsersSaga],
        [actions.DELETE_USER, saga.deleteUserSaga],
        [actions.EDIT_USER, saga.editUserSaga],
        [actions.CHANGE_ROLE, saga.changeUserRoleSaga],
        [actions.GET_USER, saga.getUserSaga],
        [actions.RESTORE_USER, saga.restoreUserSaga],
        [actions.TOGGLE_BLOCK, saga.toggleBlockSaga],
        [actions.GENERATE_USER_REPORT, saga.generateUserReportSaga],
    ], watchers);
});
