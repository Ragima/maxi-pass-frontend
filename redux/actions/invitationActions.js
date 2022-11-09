import { actionsCreator } from 'redux/actions/index';

const actions = ['CREATE_INVITATION', 'GET_INVITATIONS', 'DELETE_INVITATION', 'RESEND_INVITATION', 'ACCEPT_INVITATION'];

export default actionsCreator(actions);
