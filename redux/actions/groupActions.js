import { actionsCreator } from 'redux/actions/index';

const actions = ['CREATE_GROUP', 'GET_GROUPS', 'CREATE_INNER_GROUP', 'DELETE_GROUP',
    'EDIT_GROUP', 'GET_GROUP', 'GENERATE_GROUP_REPORT', 'DELETE_PARENT_GROUP'];

export default actionsCreator(actions);
