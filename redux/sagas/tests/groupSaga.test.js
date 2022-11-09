
import watchers, * as saga from "redux/sagas/groupSaga";
import actions from "redux/actions/groupActions";
import { watchersTests } from 'helpers/tests/enzymeHelpers';

describe('watchers', () => {
    watchersTests([
        [actions.CREATE_GROUP, saga.createGroupSaga],
        [actions.GET_GROUPS, saga.getGroupsSaga],
        [actions.CREATE_INNER_GROUP, saga.createInnerGroupSaga],
        [actions.DELETE_GROUP, saga.deleteGroupSaga],
        [actions.EDIT_GROUP, saga.editGroupSaga],
        [actions.GET_GROUP, saga.getGroupSaga],
        [actions.GENERATE_GROUP_REPORT, saga.generateGroupReportSaga],
        [actions.DELETE_PARENT_GROUP, saga.deleteParentGroupSaga],
    ], watchers);
});
