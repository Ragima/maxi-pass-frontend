import { createSelector } from 'reselect';
import _ from 'lodash';
import { createRelationSelector } from 'helpers/redux/selectors';
import { getGroupUsers, getVaultUsers } from './relationsSelectors';

export const getUsersState = state => state.users;

export const getUserWithNameEmailState = createSelector(
    getUsersState,
    users => _.map(users, user => ({ ...user, nameEmail: user.name && user.email ? `${user.name}\n${user.email}` : undefined })),
);

export const getUserByIdState = createSelector(
    getUsersState, (state, props) => props.id,
    (users, id) => _.find(users, user => _.isEqual(`${user.id}`, `${id}`)),
);

export const getRestoredUsersState = createSelector(
    getUsersState, users => _.filter(users, 'reset_pass'),
);

export const getNotRestoredUsersState = createSelector(
    getUsersState, users => _.reject(users, 'reset_pass'),
);

export const getUsersByVaultIdState = createRelationSelector(getUserWithNameEmailState, getVaultUsers);
export const getUsersWithoutVaultIdState = createRelationSelector(getUserWithNameEmailState, getVaultUsers, true);

export const getUsersByGroupIdState = createRelationSelector(getUserWithNameEmailState, getGroupUsers);
export const getUsersWithoutGroupIdState = createRelationSelector(getUserWithNameEmailState, getGroupUsers, true);
