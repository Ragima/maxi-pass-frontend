
import { createSelector } from 'reselect';
import _ from 'lodash';
import { createRelationSelector } from 'helpers/redux/selectors';
import { getGroupVaults, getUserVaults } from './relationsSelectors';

export const getVaultsState = state => state.vaults;

export const getVaultByIdState = createSelector(
    getVaultsState, (state, props) => props.id,
    (vaults, id) => _.find(vaults, vault => _.isEqual(`${vault.id}`, `${id}`)),
);

export const getVaultsByGroupIdState = createRelationSelector(getVaultsState, getGroupVaults);
export const getVaultsWithoutGroupIdState = createRelationSelector(getVaultsState, getGroupVaults, true);

export const getVaultsByUserIdState = createRelationSelector(getVaultsState, getUserVaults);
export const getVaultsWithoutUserIdState = createRelationSelector(getVaultsState, getUserVaults, true);
