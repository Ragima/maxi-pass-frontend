import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import groupSaga from './groupSaga';
import vaultSaga from './vaultSaga';
import usersSaga from './usersSaga';
import invitationSaga from './invitationSaga';
import linkSaga from './linkSaga';
import vaultItemSaga from './vaultItemSaga';
import activitySaga from './activitySaga';

export default function* rootSaga() {
    yield all([
        userSaga(),
        groupSaga(),
        vaultSaga(),
        usersSaga(),
        invitationSaga(),
        linkSaga(),
        vaultItemSaga(),
        activitySaga(),
    ]);
}
