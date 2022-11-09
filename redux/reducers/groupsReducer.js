import actions from 'redux/actions/groupActions';
import usersActions from 'redux/actions/usersActions';
import vaultActions from 'redux/actions/vaultActions';
import userActions from 'redux/actions/userActions';
import { CRUD } from 'helpers/redux/reducers';
import _ from 'lodash';

export const initialState = [];

const formatGroup = group => ({ ...group, parent_group_id: _.get(group, 'parent_group_id', null) });

const crudActions = {
    index: actions.GET_GROUPS_SUCCESS,
    show: [],
    create: actions.CREATE_GROUP_SUCCESS,
    delete: actions.DELETE_GROUP_SUCCESS,
    edit: [actions.EDIT_GROUP_SUCCESS, actions.CREATE_INNER_GROUP_SUCCESS],
};

export default (state = initialState, action) => {
    const other = _.get(action, 'other', {});
    const payload = _.get(action, 'payload', {});

    switch (action.type) {
    case usersActions.GET_USER_SUCCESS: 
    case vaultActions.GET_VAULT_SUCCESS:
    case actions.GET_GROUP_SUCCESS: 
    case vaultActions.GET_VAULTS_PAGE_SUCCESS:
    case userActions.GET_HOME_PAGE_SUCCESS:
    case usersActions.GET_USERS_SUCCESS: return _.chain(other.groups).get('data', []).map(formatGroup).value();
    case actions.DELETE_PARENT_GROUP_SUCCESS: return _.map(state, item => (item.id === payload.innerId ? ({ ...item, parent_group_id: null }) : item));
    default: return CRUD(state, action, crudActions, formatGroup);
    }
};
