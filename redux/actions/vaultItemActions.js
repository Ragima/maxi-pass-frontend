import { actionsCreator } from 'redux/actions/index';

const actions = ['GET_VAULT_ITEMS', 'GET_VAULT_ITEM', 'DELETE_VAULT_ITEM', 'EDIT_VAULT_ITEM', 'CREATE_VAULT_ITEM', 'COPY_ITEM', 'MOVE_ITEM',
    'GET_DOCUMENT', 'CREATE_DOCUMENT', 'DELETE_DOCUMENT', 'UPDATE_DOCUMENT',
];

export default actionsCreator(actions);
