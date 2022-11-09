
import watchers, * as saga from "redux/sagas/userSaga";
import actions from "redux/actions/userActions";
import { watchersTests } from 'helpers/tests/enzymeHelpers';

describe('watchers', () => {
    watchersTests([
        [actions.SIGN_IN, saga.signInSaga],
        [actions.VALIDATE_TOKEN, saga.validateTokenSaga],
        [actions.SIGN_UP, saga.signUpSaga],
        [actions.SIGN_OUT, saga.signOutSaga],
        [actions.GET_HOME_PAGE, saga.getHomePageSaga],
        [actions.UPDATE_SETTINGS, saga.updateSettingsSaga],
        [actions.RESET_PASSWORD, saga.resetPasswordSaga],
        [actions.CHANGE_PASSWORD, saga.changePasswordSaga],
        [actions.ENABLE_TWO_FACTOR, saga.enableTwoFactorSaga],
        [actions.DISABLE_TWO_FACTOR, saga.disableTwoFactorSaga],
        [actions.RESET_TWO_FACTOR, saga.resetTwoFactorSaga],
    ], watchers);
});
