import actions from 'redux/actions/linkActions';
import usersActions from 'redux/actions/usersActions';
import vaultsActions from 'redux/actions/vaultActions';
import groupActions from 'redux/actions/groupActions';
import _ from 'lodash';

export const initialState = {
    group_vaults: [],
    group_users: [],
    user_vaults: [],
};

const relationKeys = ['group_vaults', 'group_users', 'user_vaults'];

const addUniq = (state, payload, key) => ({ ...state, [key]: _.uniqBy([...state[key], ..._.castArray(payload)], 'id') });
const removeRelation = (state, payload, key) => ({ ...state,
    [key]: _.filter(state[key], item => !_.every(_.keys(payload), key => `${item[key]}` === `${payload[key]}`)),
});
const updateRelation = (state, payload, key) => ({ ...state,
    [key]: _.map(state[key], relation => (`${relation.id}` === `${payload.id}`
        ? ({ ...relation, ...payload.data })
        : relation),
    ) });


const formatRelations = relations => _.mapValues(_.pick(relations, relationKeys), relation => _.get(relation, 'data', []));

export default (state = initialState, action) => {
    const payload = _.get(action, 'payload', {});
    const other = _.get(action, 'other', {});
    switch (action.type) {
    case usersActions.GET_USER_SUCCESS:
    case vaultsActions.GET_VAULTS_PAGE_SUCCESS:
    case vaultsActions.GET_VAULT_SUCCESS:
    case groupActions.GET_GROUP_SUCCESS:
    case usersActions.GET_USERS_SUCCESS: return formatRelations(other);
    case actions.LINK_GROUP_VAULT_SUCCESS: return addUniq(state, payload, 'group_vaults');
    case actions.LINK_GROUP_USER_SUCCESS: return addUniq(state, payload, 'group_users');
    case actions.LINK_USER_VAULT_SUCCESS: return addUniq(state, payload, 'user_vaults');
    case actions.UNLINK_GROUP_VAULT_SUCCESS: return removeRelation(state, payload, 'group_vaults');
    case actions.UNLINK_GROUP_USER_SUCCESS: return removeRelation(state, payload, 'group_users');
    case actions.UNLINK_USER_VAULT_SUCCESS: return removeRelation(state, payload, 'user_vaults');
    case actions.CHANGE_GROUP_USER_ROLE_SUCCESS: return updateRelation(state, payload, 'group_users');
    case actions.CHANGE_USER_VAULT_POLICY_SUCCESS: return updateRelation(state, payload, 'user_vaults');
    default:
        return state;
    }
};
