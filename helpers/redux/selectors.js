import { createSelector } from 'reselect';
import { filterByIds } from 'helpers/data/dataTransform';

export const createRelationSelector = (getData, getIds, returnEmpty) => createSelector(
    getData, getIds,
    (data, ids) => filterByIds(data, ids, returnEmpty),
);
