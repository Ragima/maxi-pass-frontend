
import watchers, * as saga from "redux/sagas/invitationSaga";
import actions from "redux/actions/invitationActions";
import { watchersTests } from 'helpers/tests/enzymeHelpers';

describe('watchers', () => {
    watchersTests([
        [actions.CREATE_INVITATION, saga.createInvitationSaga],
        [actions.GET_INVITATIONS, saga.getInvitationsSaga],
        [actions.DELETE_INVITATION, saga.deleteInvitationSaga],
        [actions.RESEND_INVITATION, saga.resendInvitationSaga],
        [actions.ACCEPT_INVITATION, saga.acceptInvitationSaga],
    ], watchers);
});
