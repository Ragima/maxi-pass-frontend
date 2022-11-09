
import watchers, * as saga from "redux/sagas/activitySaga";
import actions from "redux/actions/activityActions";
import { watchersTests } from 'helpers/tests/enzymeHelpers';

describe('watchers', () => {
    watchersTests([
        [actions.GET_ACTIVITIES, saga.getActivitiesSaga],
        [actions.GET_ACTIVITIES_SETTINGS, saga.getActivitiesSettingsSaga],
        [actions.MARK_ACTIVITY, saga.markActivitySaga],
        [actions.UNMARK_ACTIVITY, saga.unmarkActivitySaga],
        [actions.GENERATE_ACTIVITY_REPORT, saga.generateActivityReportSaga],
    ], watchers);
});
