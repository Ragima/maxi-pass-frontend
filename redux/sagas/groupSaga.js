import { takeLatest } from 'redux-saga/effects';
import actions from 'redux/actions/groupActions';
import { createGroup, getGroups, createInnerGroup,
    deleteGroup, editGroup, getGroup, generateReport, deleteParentGroup } from 'api_layer/requests/group';
import { createSaga } from 'helpers/redux/saga';

export default function* actionWatcher() {
    yield takeLatest(actions.CREATE_GROUP, createGroupSaga);
    yield takeLatest(actions.GET_GROUPS, getGroupsSaga);
    yield takeLatest(actions.CREATE_INNER_GROUP, createInnerGroupSaga);
    yield takeLatest(actions.DELETE_GROUP, deleteGroupSaga);
    yield takeLatest(actions.EDIT_GROUP, editGroupSaga);
    yield takeLatest(actions.GET_GROUP, getGroupSaga);
    yield takeLatest(actions.GENERATE_GROUP_REPORT, generateGroupReportSaga);
    yield takeLatest(actions.DELETE_PARENT_GROUP, deleteParentGroupSaga);
}

export const createGroupSaga = createSaga(createGroup,
    { successAction: actions.createGroupSuccess },
    { successId: 'groupCreated' },
);

export const deleteGroupSaga = createSaga(deleteGroup,
    { successAction: actions.deleteGroupSuccess },
    { successId: 'groupDeleted', paramsInstead: true },
);

export const editGroupSaga = createSaga(editGroup,
    { successAction: actions.editGroupSuccess },
    { successId: 'groupEdited' },
);

export const createInnerGroupSaga = createSaga(createInnerGroup,
    { successAction: actions.createInnerGroupSuccess },
    { successId: 'groupCreated' },
);

export const deleteParentGroupSaga = createSaga(deleteParentGroup,
    { successAction: actions.deleteParentGroupSuccess },
    { successId: 'groupParentDeleted', paramsInstead: true },
);

export const getGroupsSaga = createSaga(getGroups,
    { successAction: actions.getGroupsSuccess },
);

export const getGroupSaga = createSaga(getGroup,
    { successAction: actions.getGroupSuccess },
);

export const generateGroupReportSaga = createSaga(generateReport,
    { successAction: actions.generateGroupReportSuccess },
    { successId: 'reportSent' },
);
