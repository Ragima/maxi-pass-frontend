
import watchers, * as saga from "redux/sagas/linkSaga";
import actions from "redux/actions/linkActions";
import { watchersTests } from 'helpers/tests/enzymeHelpers';


describe('watchers', () => {
    watchersTests([
        [actions.LINK_GROUP_USER, saga.addGroupUserSaga],
        [actions.LINK_GROUP_VAULT, saga.addGroupVaultSaga],
        [actions.LINK_USER_VAULT, saga.addUserVaultSaga],
        [actions.UNLINK_GROUP_USER, saga.removeGroupUserSaga],
        [actions.UNLINK_GROUP_VAULT, saga.removeGroupVaultSaga],
        [actions.UNLINK_USER_VAULT, saga.removeUserVaultSaga],
        [actions.CHANGE_GROUP_USER_ROLE, saga.changeUserRoleSaga],
        [actions.CHANGE_USER_VAULT_POLICY, saga.changeVaultPolicySaga],
    ], watchers);
});
