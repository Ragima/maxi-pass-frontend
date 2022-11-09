import { actionsCreator } from 'redux/actions/index';

const actions = ['SIGN_IN', 'VALIDATE_TOKEN', 'SIGN_UP', 'SIGN_OUT',
    'CLEAR_STORE', 'GET_HOME_PAGE', 'UPDATE_SETTINGS', 'RESET_PASSWORD',
    'CHANGE_PASSWORD', 'ENABLE_TWO_FACTOR', 'DISABLE_TWO_FACTOR', 'RESET_TWO_FACTOR'];

export default actionsCreator(actions);
