import { takeLatest } from 'redux-saga/effects';
import actions from 'redux/actions/activityActions';
import { getActivities, getActivitiesSettings, markActivity, unmarkActivity, generateReport } from 'api_layer/requests/activity';
import { createSaga } from 'helpers/redux/saga';

export default function* actionWatcher() {
    yield takeLatest(actions.GET_ACTIVITIES, getActivitiesSaga);
    yield takeLatest(actions.GET_ACTIVITIES_SETTINGS, getActivitiesSettingsSaga);
    yield takeLatest(actions.MARK_ACTIVITY, markActivitySaga);
    yield takeLatest(actions.UNMARK_ACTIVITY, unmarkActivitySaga);
    yield takeLatest(actions.GENERATE_ACTIVITY_REPORT, generateActivityReportSaga);
}

export const getActivitiesSaga = createSaga(getActivities,
    { successAction: actions.getActivitiesSuccess },
);
export const getActivitiesSettingsSaga = createSaga(getActivitiesSettings,
    { successAction: actions.getActivitiesSettingsSuccess },
);
export const markActivitySaga = createSaga(markActivity,
    { successAction: actions.markActivitySuccess },
    { successId: 'activityMarked' },
);
export const generateActivityReportSaga = createSaga(generateReport,
    { successAction: actions.generateActivityReportSuccess },
    { successId: 'reportSent' },
);
export const unmarkActivitySaga = createSaga(unmarkActivity,
    { successAction: actions.unmarkActivitySuccess },
    { successId: 'activityUnmarked' },
);
