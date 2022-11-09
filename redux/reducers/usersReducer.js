import actions from 'redux/actions/usersActions';
import vaultActions from 'redux/actions/vaultActions';
import groupActions from 'redux/actions/groupActions';
import activityActions from 'redux/actions/activityActions';
import { CRUD } from 'helpers/redux/reducers';
import _ from 'lodash';
import roles from 'constants/userRoles';

export const initialState = [];

const formatUser = user => user;

const crudActions = {
    index: actions.GET_USERS_SUCCESS,
    show: actions.GET_USER_SUCCESS,
    create: actions.CREATE_USER_SUCCESS,
    delete: actions.DELETE_USER_SUCCESS,
    edit: [actions.EDIT_USER_SUCCESS, actions.CHANGE_ROLE_SUCCESS, actions.CHANGE_ROLE_SUPPORT_SUCCESS],
};

export default (state = initialState, action) => {
    const other = _.get(action, 'other', {});
    const payload = _.get(action, 'payload', {});

    switch (action.type) {
    case groupActions.GET_GROUP_SUCCESS:
    case vaultActions.GET_VAULTS_PAGE_SUCCESS:
    case activityActions.GET_ACTIVITIES_SUCCESS:
    case vaultActions.GET_VAULT_SUCCESS: return _.chain(other.users).get('data', []).filter(user => user.role_id !== roles.admin).value();
    case actions.RESTORE_USER_SUCCESS: return _.map(state, user => (user.id !== payload.id ? user : { ...user, reset_pass: false }));
    case actions.TOGGLE_BLOCK_SUCCESS: return _.map(state, user => (user.id !== payload.id ? user : { ...user, blocked: !user.blocked }));
    default: return CRUD(state, action, crudActions, formatUser);
    }
};
