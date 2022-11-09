import { takeLatest } from 'redux-saga/effects';
import actions from 'redux/actions/userActions';
import { signIn, validateToken, signUp, signOut, getHomePage,
    updateSettings, resetPassword, changePassword, enableTwoFactor, disableTwoFactor, resetTwoFactor } from 'api_layer/requests/auth';
import { createSaga } from 'helpers/redux/saga';
import { redirectToHome } from 'helpers/auth/redirect';

export default function* actionWatcher() {
    yield takeLatest(actions.SIGN_IN, signInSaga);
    yield takeLatest(actions.VALIDATE_TOKEN, validateTokenSaga);
    yield takeLatest(actions.SIGN_UP, signUpSaga);
    yield takeLatest(actions.SIGN_OUT, signOutSaga);
    yield takeLatest(actions.GET_HOME_PAGE, getHomePageSaga);
    yield takeLatest(actions.UPDATE_SETTINGS, updateSettingsSaga);
    yield takeLatest(actions.RESET_PASSWORD, resetPasswordSaga);
    yield takeLatest(actions.CHANGE_PASSWORD, changePasswordSaga);
    yield takeLatest(actions.ENABLE_TWO_FACTOR, enableTwoFactorSaga);
    yield takeLatest(actions.DISABLE_TWO_FACTOR, disableTwoFactorSaga);
    yield takeLatest(actions.RESET_TWO_FACTOR, resetTwoFactorSaga);
}

export const signInSaga = createSaga(signIn,
    { successAction: actions.signInSuccess, onSuccess: redirectToHome },
    { successId: 'loginSuccess' },
);

export const resetPasswordSaga = createSaga(resetPassword,
    { successAction: actions.resetPasswordSuccess },
    { successId: 'resetRequestSended' },
);

export const changePasswordSaga = createSaga(changePassword,
    { successAction: actions.changePasswordSuccess },
    { successId: 'passwordChanged' },
);

export const updateSettingsSaga = createSaga(updateSettings,
    { successAction: actions.updateSettingsSuccess },
    { successId: 'settingsUpdated' },
);

export const enableTwoFactorSaga = createSaga(enableTwoFactor,
    { successAction: actions.enableTwoFactorSuccess, onSuccess: redirectToHome },
    { successId: 'twoFactorEnabled' },
);

export const disableTwoFactorSaga = createSaga(disableTwoFactor,
    { successAction: actions.disableTwoFactorSuccess, onSuccess: redirectToHome },
    { successId: 'twoFactorDisabled' },
);

export const resetTwoFactorSaga = createSaga(resetTwoFactor,
    { successAction: actions.resetTwoFactorSuccess },
    { successId: 'twoFactorReseted' },
);

export const validateTokenSaga = createSaga(validateToken,
    { successAction: actions.validateTokenSuccess },
    { showError: false },
);

export const getHomePageSaga = createSaga(getHomePage,
    { successAction: actions.getHomePageSuccess },
);

export const signUpSaga = createSaga(signUp,
    { successAction: actions.signUpSuccess, onSuccess: redirectToHome },
    { successId: 'successRegister' },
);

export const signOutSaga = createSaga(signOut,
    { successAction: actions.clearStore },
);
