import _ from 'lodash';
import actions from 'redux/actions/vaultItemActions';
import itemTypes from 'constants/itemTypes';
import { parseItemsValues } from 'helpers/data/dataTransform';
import { CRUD } from 'helpers/redux/reducers';

const types = {
    LoginItem: itemTypes.login,
    ServerItem: itemTypes.server,
    CreditCardItem: itemTypes.card,
};

export const initialState = [];

const formatDocuments = documents => _.map(documents, doc => ({ name: doc.data.file, id: doc.data.id }));

const formatVaultItem = (vaultItem, other) => {
    const tags = _.get(vaultItem, 'tags');
    const title = _.get(vaultItem, 'title');
    const content = {
        ...parseItemsValues(vaultItem.content),
        title,
        tags,
    };
    const vaults = _.get(other, 'vaults.data', undefined);
    return {
        ...vaultItem,
        content,
        vaults,
        documents: formatDocuments(vaultItem.documents),
        tags: _.words(tags, /[^,. ]+/g),
        type: types[_.get(vaultItem, 'entity_type')],
    };
};

const crudActions = {
    index: actions.GET_VAULT_ITEMS_SUCCESS,
    show: actions.GET_VAULT_ITEM_SUCCESS,
    create: actions.CREATE_VAULT_ITEM_SUCCESS,
    delete: actions.DELETE_VAULT_ITEM_SUCCESS,
    edit: actions.EDIT_VAULT_ITEM_SUCCESS,
};

export default (state = initialState, action) => {
    const other = _.get(action, 'other', {});

    switch (action.type) {
    default: return CRUD(state, action, crudActions, data => formatVaultItem(data, other));
    }
};
