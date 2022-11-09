
import { createSelector } from 'reselect';
import { getRelationsById } from 'helpers/data/dataTransform';
import _ from 'lodash';

export const getRelationsState = state => state.relations;

export const getGroupUsersState = createSelector(
    getRelationsState,
    relations => _.get(relations, 'group_users', []),
);

export const getGroupVaultsState = createSelector(
    getRelationsState,
    relations => _.get(relations, 'group_vaults', []),
);

export const getUserVaultsState = createSelector(
    getRelationsState,
    relations => _.get(relations, 'user_vaults', []),
);

export const createRelationsPicker = (relation, keyBy, key) => createSelector(
    getRelationsState, (relations, props) => _.get(props, 'id'),
    (relations, id) => getRelationsById(_.get(relations, relation), keyBy, id, key),
);

export const getUserGroupState = createSelector(
    getGroupUsersState, (state, props) => _.get(props, 'mainId'), (state, props) => _.get(props, 'user.id'),
    (relations, group_id, user_id) => _.find(relations, relation => _.isEqual(`${relation.group_id}`, `${group_id}`) && _.isEqual(`${relation.user_id}`, `${user_id}`)),
);

export const getUserVaultState = createSelector(
    getUserVaultsState, (state, props) => _.get(props, 'mainId'), (state, props) => _.get(props, 'user.id'),
    (relations, vault_id, user_id) => _.find(relations, relation => _.isEqual(`${relation.vault_id}`, `${vault_id}`) && _.isEqual(`${relation.user_id}`, `${user_id}`)),
);

export const getGroupVaults = createRelationsPicker('group_vaults', 'group_id', 'vault_id');
export const getVaultGroups = createRelationsPicker('group_vaults', 'vault_id', 'group_id');
export const getGroupUsers = createRelationsPicker('group_users', 'group_id', 'user_id');
export const getUserGroups = createRelationsPicker('group_users', 'user_id', 'group_id');
export const getUserVaults = createRelationsPicker('user_vaults', 'user_id', 'vault_id');
export const getVaultUsers = createRelationsPicker('user_vaults', 'vault_id', 'user_id');
