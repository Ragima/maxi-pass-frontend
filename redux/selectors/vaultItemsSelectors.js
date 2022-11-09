
import { createSelector } from 'reselect';
import _ from 'lodash';

export const getVaultItemsState = state => state.vault_items;

export const getVaultItemsByVaultIdState = createSelector(
    getVaultItemsState, (state, props) => props.id, 
    (items, id) => _.filter(items, item => item.vault_id === id),
);

export const getVaultItemByIdState = createSelector(
    getVaultItemsState, (state, props) => props.item_id,
    (items, id) => _.find(items, item => _.toString(item.id) === _.toString(id)),
);
