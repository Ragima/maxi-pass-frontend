import { actionsCreator } from 'redux/actions/index';

const actions = ['LINK_GROUP_VAULT', 'LINK_GROUP_USER', 'LINK_USER_VAULT', 'UNLINK_GROUP_VAULT',
    'UNLINK_GROUP_USER', 'UNLINK_USER_VAULT', 'CHANGE_USER_VAULT_POLICY', 'CHANGE_GROUP_USER_ROLE'];

export default actionsCreator(actions);
