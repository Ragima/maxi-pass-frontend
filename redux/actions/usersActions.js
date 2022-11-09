import { actionsCreator } from 'redux/actions/index';

const actions = ['CREATE_USER', 'GET_USERS', 'DELETE_USER', 'EDIT_USER', 'CHANGE_ROLE', 'CHANGE_ROLE_SUPPORT', 'GET_USER', 'RESTORE_USER', 'TOGGLE_BLOCK', 'GENERATE_USER_REPORT'];

export default actionsCreator(actions);
