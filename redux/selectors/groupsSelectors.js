
import { createSelector } from 'reselect';
import _ from 'lodash';
import { createRelationSelector } from 'helpers/redux/selectors';
import { getAllChildrens } from 'helpers/data/treeSearch';
import { getVaultGroups, getUserGroups } from './relationsSelectors';

export const getGroupsState = state => state.groups;

export const getGroupsByVaultIdState = createRelationSelector(getGroupsState, getVaultGroups);
export const getGroupsWithoutVaultIdState = createRelationSelector(getGroupsState, getVaultGroups, true);

export const getGroupsByUserIdState = createRelationSelector(getGroupsState, getUserGroups);
export const getGroupsWithoutUserIdState = createRelationSelector(getGroupsState, getUserGroups, true);

export const getGroupByIdState = createSelector(
    getGroupsState, (state, props) => props.id,
    (groups, id) => _.find(groups, group => _.isEqual(`${group.id}`, `${id}`)),
);

export const getGroupsWithoutParentGroup = createSelector(
    getGroupsState, (state, props) => props.id,
    (groups, id) => _.reject(groups, group => _.isEqual(`${group.id}`, `${id}`) || group.parent_group_id || _.map(getAllChildrens(group.id, groups), 'id').includes(id)),
);

export const getGroupsByGroupIdState = createSelector(
    getGroupsState, (state, props) => props.id,
    (groups, id) => getAllChildrens(id, groups),
);
