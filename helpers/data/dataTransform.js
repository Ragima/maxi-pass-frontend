import _ from 'lodash';
import inputTypes from 'constants/multipleInputKeys';

export const filterData = (data, filter, filterBy = []) => _.filter(data, item => _.some(item, (value, key) => (_.isEmpty(filterBy) || _.includes(filterBy, key))
&& _.isString(value)
&& _.toLower(value).includes(_.toLower(filter))));

export const directToSite = (value) => {
    if (!value) return;

    const url = _.toString(value); 
    window.open(`http://${url.replace(/^(https?|ftp):\/\//, "")}`, '_blank');
};

const appendLeadingZeroes = (n) => {
    if (n <= 9) {
        return `0${n}`;
    }
    return n;
};

export const formatDate = (date) => {
    if (!date) return 'Invalid date';

    const dateTime = new Date(date);
    const year = dateTime.getFullYear();
    const month = appendLeadingZeroes(dateTime.getMonth() + 1);
    const day = appendLeadingZeroes(dateTime.getDate());
    const hour = appendLeadingZeroes(dateTime.getHours());
    const minute = appendLeadingZeroes(dateTime.getMinutes());
    return `${year}/${month}/${day} ${hour}:${minute}`; 
};


const filterUnparentGroups = (groups) => {
    const groupsIds = _.map(groups, 'id');
    return _.map(groups, group => (groupsIds.includes(group.parent_group_id) ? group : ({ ...group, parent_group_id: null })));
};

export const makeTree = (groups) => {
    const filteredGroups = filterUnparentGroups(groups);
    const groupedDataByParentId = _.groupBy(filteredGroups, 'parent_group_id');
    return fillTree(groupedDataByParentId.null, groupedDataByParentId);
};

const fillTree = (tree, possibleChildrens) => {
    return _.map(tree, (group) => {
        const children = possibleChildrens[group.id];
        if (children) {
            return { data: group, children: fillTree(children, possibleChildrens) };
        } 
        return { data: group };
    });
};

export const deleteTree = (groups, id) => {
    const groupedDataByParentId = _.groupBy(groups, 'parent_group_id');
    const branchToDelete = _.find(groups, group => group.id === id);
    const idsToDelete = [];
    deleteBranch(branchToDelete, groupedDataByParentId, idsToDelete);
    return _.filter(groups, group => !idsToDelete.includes(group.id));
};

const deleteBranch = (branch, possibleChildrens, idsToDelete) => {
    if (!branch) return;

    idsToDelete.push(branch.id);
    const children = possibleChildrens[branch.id];
    if (children) {
        _.each(children, (child) => {
            deleteBranch(child, possibleChildrens, idsToDelete);
        });
    } 
};

export const filterByIds = (data, ids, returnEmpty) => {
    const filterFunc = returnEmpty ? _.reject : _.filter;
    return filterFunc(data, item => ids.includes(item.id));
};

export const getRelationsById = (data, keyBy, id, key) => _.chain(data)
    .groupBy(keyBy)
    .get(id, [])
    .map(key)
    .value();

export const filterByRelation = (data, relation, key, returnEmpty) => {
    const filterFunc = returnEmpty ? _.reject : _.filter;
    return filterFunc(data, item => _.some(relation, rel => _.get(rel, key) === item.id));
};

export const filterByRelationId = (relations, data, keyBy, id, key) => {
    if (!id) return data;

    const ids = getRelationsById(relations, keyBy, id, key);
    return filterByIds(data, ids);
};

export const getCtxQuery = ctx => _.get(ctx, 'query', {});

export const formatMultipleInput = (data = [], keys) => {
    const dataFields = [..._.filter(_.values(data), 'value'), {}];
    return _.reduce(dataFields, (acc, cur, index) => {
        return { ...acc,
            [`${keys.label}${index}`]: _.get(cur, 'label', ''),
            [`${keys.value}${index}`]: _.get(cur, 'value', ''),
        };
    }, { [keys.count]: _.size(dataFields) });
};

export const copyToClipboard = (inputNode, doc = document) => {
    if (_.get(inputNode, 'current')) {
        const type = inputNode.current.type;
        inputNode.current.type = '';
        inputNode.current.select();
        doc.execCommand("copy");
        inputNode.current.type = type;
        inputNode.current.selectionEnd = inputNode.current.selectionStart;
        inputNode.current.blur();
    }
};

export const getVaultsThroughGroups = (groups, vaults, groupVaults) => {
    const vaultsId = _.map(vaults, 'id');
    return _.chain(groups)
        .map((group) => {
            const groupVaultsIds = getRelationsById(groupVaults, 'group_id', group.id, 'vault_id');
            const vaultsThroughGroups = _.intersection(groupVaultsIds, vaultsId);
            return {
                group,
                vaults: filterByIds(vaults, vaultsThroughGroups),
            };
        })
        .filter(item => !_.isEmpty(item.vaults))
        .value();
};

const getInitialValue = (type) => {
    switch (type) {
    case 'input': return '';
    case 'multiple_input': return {};
    case 'password_generator': return '';
    case 'checkbox': return false;
    case 'tree': return '';
    default: return '';
    } 
};

export const fillWithEmpty = (fields = [], data = {}) => {
    const fieldNames = _.compact(fields);
    const dataClone = _.cloneDeep(data);
    return _.reduce(fieldNames, (acc, cur) => {
        const key = _.get(cur, 'name');
        return { ...acc, [key]: _.isUndefined(data[key]) ? getInitialValue(cur.component) : data[key] };
    }, dataClone);
};

export const parseItemsValues = (data) => {
    let result = _.cloneDeep(data);
    const allKeys = _.values(inputTypes);
    const dataKeys = _.keys(data);
    _.each(allKeys, (keys) => {
        result = _.omitBy(result, (item, key) => _.includes(key, keys.label) || _.includes(key, keys.value) || _.includes(key, keys.count));
        const labelKeys = _.orderBy(_.filter(dataKeys, key => key.includes(keys.label)));
        const valuesKeys = _.orderBy(_.filter(dataKeys, key => key.includes(keys.value)));
        result = {
            ...result,
            [keys.key]: _.reduce(labelKeys, (acc, cur, index) => {
                const label = _.get(data, cur, '');
                const value = _.get(data, valuesKeys[index], '');
                return value === '' ? acc : ({ ...acc, [index]: { label, value } });
            }, {}), 
        };
    });
    return _.omitBy(result, item => _.isEmpty(item));
};
