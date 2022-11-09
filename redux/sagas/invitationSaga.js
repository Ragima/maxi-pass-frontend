import { takeLatest } from 'redux-saga/effects';
import actions from 'redux/actions/invitationActions';
import { createInvitation, getInvitations, deleteInvitation, resendInvitation, acceptInvitation } from 'api_layer/requests/invitation';
import { createSaga } from 'helpers/redux/saga';

export default function* actionWatcher() {
    yield takeLatest(actions.CREATE_INVITATION, createInvitationSaga);
    yield takeLatest(actions.GET_INVITATIONS, getInvitationsSaga);
    yield takeLatest(actions.DELETE_INVITATION, deleteInvitationSaga);
    yield takeLatest(actions.RESEND_INVITATION, resendInvitationSaga);
    yield takeLatest(actions.ACCEPT_INVITATION, acceptInvitationSaga);
}

export const createInvitationSaga = createSaga(createInvitation,
    { successAction: actions.createInvitationSuccess },
    { successId: 'invitationCreated' },
);

export const resendInvitationSaga = createSaga(resendInvitation,
    { successAction: actions.resendInvitationSuccess },
    { successId: 'invitationResended' },
);

export const deleteInvitationSaga = createSaga(deleteInvitation,
    { successAction: actions.deleteInvitationSuccess },
    { successId: 'invitationDeleted', paramsInstead: true },
);

export const getInvitationsSaga = createSaga(getInvitations,
    { successAction: actions.getInvitationsSuccess },
    { showError: false },
);

export const acceptInvitationSaga = createSaga(acceptInvitation,
    { successAction: actions.acceptInvitationSuccess },
    { successId: 'loginSuccess' },
);
