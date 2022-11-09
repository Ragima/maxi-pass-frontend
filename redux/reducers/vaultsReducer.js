import _ from 'lodash';
import actions from 'redux/actions/vaultActions';
import usersActions from 'redux/actions/usersActions';
import userActions from 'redux/actions/userActions';
import groupActions from 'redux/actions/groupActions';
import vaultItemActions from 'redux/actions/vaultItemActions';
import { CRUD } from 'helpers/redux/reducers';

export const initialState = [];

const formatVault = vault => vault;

const crudActions = {
    index: [actions.GET_VAULTS_SUCCESS, actions.GET_VAULTS_PAGE_SUCCESS],
    show: actions.GET_VAULT_SUCCESS,
    create: actions.CREATE_VAULT_SUCCESS,
    delete: actions.DELETE_VAULT_SUCCESS,
    edit: actions.EDIT_VAULT_SUCCESS,
};

export default (state = initialState, action) => {
    const other = _.get(action, 'other', {});
    switch (action.type) {
    case groupActions.GET_GROUP_SUCCESS:
    case userActions.GET_HOME_PAGE_SUCCESS:
    case usersActions.GET_USER_SUCCESS: return _.chain(other.vaults).get('data', []).map(formatVault).value();
    case vaultItemActions.GET_VAULT_ITEMS_SUCCESS: return _.castArray(formatVault(_.get(other, 'vault.data', {})));
    default: return CRUD(state, action, crudActions, formatVault);
    }
};
