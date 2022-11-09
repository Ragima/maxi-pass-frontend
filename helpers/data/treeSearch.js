import _ from 'lodash';

export const isMatched = (data, search) => {
    return !!(search && _.toLower(_.get(data, 'data.name', '')).includes(_.toLower(search)));
};

export const searchInTree = (data, search) => {
    const results = [];
    _.each(data, (temp) => {
        if (isMatched(temp, search)) {
            results.push(temp);
        } else if (_.isObject(temp) && temp.children) {
            results.push(...searchInTree(temp.children, search));
        }
    });
    return results;   
};

export const getAllChildrens = (headId, data, results = []) => {
    const childs = _.filter(data, item => item.parent_group_id === headId);
    _.each(childs, (item) => {
        results = getAllChildrens(item.id, data, results);
    });
    return [...results, ...childs];   
};
