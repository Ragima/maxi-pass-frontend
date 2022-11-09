import { filterData, makeTree, deleteTree, getVaultsThroughGroups, fillWithEmpty, parseItemsValues, filterByIds, getRelationsById,
    filterByRelation, filterByRelationId, getCtxQuery, formatMultipleInput, copyToClipboard, formatDate, directToSite } from 'helpers/data/dataTransform';

describe('formatDate', () => {
    it('should return proper date', () => {
        expect(formatDate(new Date(1996))).toEqual('1970/01/01 03:00');
    });
    it('should return proper date for numbers greater than 9', () => {
        expect(formatDate(new Date(1996, 11, 22, 22, 22, 22))).toEqual('1996/12/22 22:22');
    });
    it('should return invalid data', () => {
        expect(formatDate()).toEqual('Invalid date');
    });
});
describe('directToSite', () => {
    it('should call directToSite without http url if showLink prop is peresent', () => {
        window.open = jest.fn();
        directToSite('');
        expect(window.open).not.toBeCalled();
    });
    it('should call directToSite with http', () => {
        window.open = jest.fn();
        directToSite('facebook.com');
        expect(window.open).toBeCalledWith('http://facebook.com', '_blank');
    });
    it('should call directToSite without http', () => {
        window.open = jest.fn();
        directToSite('http://facebook.com');
        expect(window.open).toBeCalledWith('http://facebook.com', '_blank');
    });
    it('should call directToSite without https', () => {
        window.open = jest.fn();
        directToSite('https://facebook.com');
        expect(window.open).toBeCalledWith('http://facebook.com', '_blank');
    });
});

describe('getRelationsById', () => {
    it('should return empty array if data is not defined', () => {
        expect(getRelationsById(undefined, undefined, undefined, undefined)).toEqual([]);
    });
    it('should return filtered data', () => {
        expect(getRelationsById([{ id: 1, sid: 3 }, { id: 2, sid: 3 }], 'sid', 3, 'id')).toEqual([1, 2]);
    });
    it('should return filtered data 2', () => {
        expect(getRelationsById([{ id: 1, sid: 3 }, { id: 2, sid: 3 }, { id: 5, sid: 4 }], 'id', 5, 'sid')).toEqual([4]);
    });
});

describe('filterByRelation', () => {
    it('should return empty array if data is not defined', () => {
        expect(filterByRelation(undefined, undefined, undefined, undefined)).toEqual([]);
    });
    it('should filter by vaults', () => {
        expect(filterByRelation([{ id: 1 }, { id: 4 }], [{ id: 4, sid: 4 }, { id: 3, sid: 2 }], 'sid'))
            .toEqual([{ id: 4 }]);
    });
    it('should filter by vaults to empty array', () => {
        expect(filterByRelation([{ id: 1 }, { id: 4 }], [{ id: 4, sid: 3 }, { id: 3, sid: 2 }], 'sid'))
            .toEqual([]);
    });
    it('should filter empty by vaults', () => {
        expect(filterByRelation([{ id: 1 }, { id: 4 }], [{ id: 4, sid: 4 }, { id: 3, sid: 2 }], 'sid', true))
            .toEqual([{ id: 1 }]);
    });
});

describe('filterByIds', () => {
    it('should return empty array if data is not defined', () => {
        expect(filterByIds(undefined, undefined)).toEqual([]);
    });
    it('should return filtered data', () => {
        expect(filterByIds([{ id: 1 }, { id: 2 }], [1])).toEqual([{ id: 1 }]);
    });
    it('should return rejected data', () => {
        expect(filterByIds([{ id: 1 }, { id: 2 }], [1], true)).toEqual([{ id: 2 }]);
    });
    it('should return rejected data 2', () => {
        expect(filterByIds([{ id: 1 }, { id: 2 }, { id: 3 }], [1, 3])).toEqual([{ id: 1 }, { id: 3 }]);
    });
});

describe('filterData', () => {
    it('should return empty array if data is not defined', () => {
        expect(filterData(undefined, 'd')).toEqual([]);
    });
    it('should return full data if filter is empty', () => {
        expect(filterData([{ name: 'some' }, { name: '2' }], '', ['name'])).toEqual([{ name: 'some' }, { name: '2' }]);
    });
    it('should return full data if filter is not defined', () => {
        expect(filterData([{ name: 'some' }, { name: '2' }], undefined, ['name'])).toEqual([{ name: 'some' }, { name: '2' }]);
    });
    it('should return filtered data if there are any matches', () => {
        expect(filterData([{ name: 'some' }, { name: '2' }], 's', ['name'])).toEqual([{ name: 'some' }]);
    });
    it('should return filtered data if there are any matches with full match', () => {
        expect(filterData([{ name: 'some' }, { name: '2' }], '2', ['name'])).toEqual([{ name: '2' }]);
    });
    it('should return empty data if there are no matches', () => {
        expect(filterData([{ name: 'some' }, { name: '2' }], '3', ['name'])).toEqual([]);
    });
    it('should return filtered data if there are any matches with full match but no filtered keys', () => {
        expect(filterData([{ name: 'some' }, { name: '2' }], '2', [])).toEqual([{ name: '2' }]);
    });
    it('should return filtered data if there are any matches with full match and matched keys', () => {
        expect(filterData([{ name: 'some', s: 'ad' }, { name: 'ad' }], 'ad', ['s'])).toEqual([{ name: 'some', s: 'ad' }]);
    });
});

describe('makeTree', () => {
    it('should return empty array if data is not defined', () => {
        expect(makeTree([])).toEqual([]);
    });
    it('should return transfomed array without children', () => {
        expect(makeTree([{ id: 1, parent_group_id: null }, { id: 2, parent_group_id: null }]))
            .toEqual([{ data: { id: 1, parent_group_id: null } }, { data: { id: 2, parent_group_id: null } }]);
    });
    it('should return full tree based on given data', () => {
        expect(makeTree([
            { id: 1, parent_group_id: null },
            { id: 2, parent_group_id: null },
            { id: 3, parent_group_id: null },
            { id: 4, parent_group_id: null },
            { id: 5, parent_group_id: 1 },
            { id: 6, parent_group_id: 3 },
            { id: 7, parent_group_id: 3 },
            { id: 8, parent_group_id: 3 },
            { id: 9, parent_group_id: 6 },
            { id: 10, parent_group_id: 6 },
            { id: 11, parent_group_id: 6 },
            { id: 12, parent_group_id: 9 },
        ]))
            .toEqual([
                { data: { id: 1, parent_group_id: null }, children: [{ data: { id: 5, parent_group_id: 1 } }] },
                { data: { id: 2, parent_group_id: null }, children: undefined },
                { data: { id: 3, parent_group_id: null },
                    children: [
                        { data: { id: 6, parent_group_id: 3 },
                            children: [
                                { data: { id: 9, parent_group_id: 6 }, 
                                    children: [
                                        { data: { id: 12, parent_group_id: 9 } },
                                    ] },
                                { data: { id: 10, parent_group_id: 6 } },
                                { data: { id: 11, parent_group_id: 6 } },
                            ] },
                        { data: { id: 7, parent_group_id: 3 } },
                        { data: { id: 8, parent_group_id: 3 } },
                    ] },
                { data: { id: 4, parent_group_id: null }, children: undefined },
            ]);
    });
    it('should return full tree based on given data if one of group has no real parent', () => {
        expect(makeTree([
            { id: 1, parent_group_id: 99 },
            { id: 2, parent_group_id: null },
            { id: 3, parent_group_id: null },
            { id: 4, parent_group_id: null },
            { id: 5, parent_group_id: 1 },
            { id: 6, parent_group_id: 3 },
            { id: 7, parent_group_id: 3 },
            { id: 8, parent_group_id: 3 },
            { id: 9, parent_group_id: 6 },
            { id: 10, parent_group_id: 6 },
            { id: 11, parent_group_id: 6 },
            { id: 12, parent_group_id: 9 },
        ]))
            .toEqual([
                { data: { id: 1, parent_group_id: null }, children: [{ data: { id: 5, parent_group_id: 1 } }] },
                { data: { id: 2, parent_group_id: null }, children: undefined },
                { data: { id: 3, parent_group_id: null },
                    children: [
                        { data: { id: 6, parent_group_id: 3 },
                            children: [
                                { data: { id: 9, parent_group_id: 6 }, 
                                    children: [
                                        { data: { id: 12, parent_group_id: 9 } },
                                    ] },
                                { data: { id: 10, parent_group_id: 6 } },
                                { data: { id: 11, parent_group_id: 6 } },
                            ] },
                        { data: { id: 7, parent_group_id: 3 } },
                        { data: { id: 8, parent_group_id: 3 } },
                    ] },
                { data: { id: 4, parent_group_id: null }, children: undefined },
            ]);
    });
});

describe('deleteTree', () => {
    it('should return empty array if data is not defined', () => {
        expect(deleteTree(null, null)).toEqual([]);
    });
    it('should return filtered array without children', () => {
        expect(deleteTree([{ id: 1, parent_group_id: null }, { id: 2, parent_group_id: null }], 1))
            .toEqual([{ id: 2, parent_group_id: null }]);
    });
    it('should return tree without 1 lvl branch', () => {
        expect(deleteTree([
            { id: 1, parent_group_id: null },
            { id: 2, parent_group_id: null },
            { id: 3, parent_group_id: null },
            { id: 4, parent_group_id: null },
            { id: 5, parent_group_id: 1 },
            { id: 6, parent_group_id: 3 },
            { id: 7, parent_group_id: 3 },
            { id: 8, parent_group_id: 3 },
            { id: 9, parent_group_id: 6 },
            { id: 10, parent_group_id: 6 },
            { id: 11, parent_group_id: 6 },
            { id: 12, parent_group_id: 9 },
        ], 1))
            .toEqual([
                { id: 2, parent_group_id: null },
                { id: 3, parent_group_id: null },
                { id: 4, parent_group_id: null },
                { id: 6, parent_group_id: 3 },
                { id: 7, parent_group_id: 3 },
                { id: 8, parent_group_id: 3 },
                { id: 9, parent_group_id: 6 },
                { id: 10, parent_group_id: 6 },
                { id: 11, parent_group_id: 6 },
                { id: 12, parent_group_id: 9 },
            ]);
    });
    it('should return tree without 4 lvl branch', () => {
        expect(deleteTree([
            { id: 1, parent_group_id: null },
            { id: 2, parent_group_id: null },
            { id: 3, parent_group_id: null },
            { id: 4, parent_group_id: null },
            { id: 5, parent_group_id: 1 },
            { id: 6, parent_group_id: 3 },
            { id: 7, parent_group_id: 3 },
            { id: 8, parent_group_id: 3 },
            { id: 9, parent_group_id: 6 },
            { id: 10, parent_group_id: 6 },
            { id: 11, parent_group_id: 6 },
            { id: 12, parent_group_id: 9 },
        ], 3))
            .toEqual([
                { id: 1, parent_group_id: null },
                { id: 2, parent_group_id: null },
                { id: 4, parent_group_id: null },
                { id: 5, parent_group_id: 1 },
            ]);
    });
});

describe('filterByRelationId', () => {
    it('should return undefined if data is not defined', () => {
        expect(filterByRelationId(undefined, undefined, undefined, undefined, undefined)).toEqual(undefined);
    });
    it('should filter data by id', () => {
        expect(filterByRelationId([{ id: 4, sid: 3 }, { id: 4, sid: 2 }, { id: 1, sid: 2 }], [{ id: 1 }, { id: 4 }], 'sid', 3, 'id'))
            .toEqual([{ id: 4 }]);
    });
    it('should filter data by id 2', () => {
        expect(filterByRelationId([{ id: 4, sid: 3 }, { id: 4, sid: 2 }, { id: 1, sid: 2 }], [{ id: 1 }, { id: 4 }], 'sid', 2, 'id'))
            .toEqual([{ id: 1 }, { id: 4 }]);
    });
    it('should filter data to empty', () => {
        expect(filterByRelationId([{ id: 4, sid: 3 }, { id: 3, sid: 2 }], [{ id: 1 }, { id: 4 }], 'sid', 7, 'id'))
            .toEqual([]);
    });
    it('should return initial data if no id', () => {
        expect(filterByRelationId([{ id: 4, sid: 3 }, { id: 3, sid: 2 }], [{ id: 1 }, { id: 4 }], 'sid', null, 'id'))
            .toEqual([{ id: 1 }, { id: 4 }]);
    });
});

describe('getCtxQuery', () => {
    it('should return empty object if data is not defined', () => {
        expect(getCtxQuery(undefined)).toEqual({});
    });
    it('should return query', () => {
        expect(getCtxQuery({ query: 'asda' })).toEqual('asda');
    });
});

describe('copyToClipboard', () => {
    it('should return undefined object if data is not defined', () => {
        expect(copyToClipboard(undefined)).toEqual(undefined);
    });
    it('should return query', () => {
        Object.defineProperty(window.document, 'execCommand', jest.fn());
        const mock = {
            current: {
                type: 'password',
                select: jest.fn(),
                blur: jest.fn(),
            },
        };
        const docMock = { execCommand: jest.fn() };
        copyToClipboard(mock, docMock);
        expect(mock.current.select).toBeCalled();
        expect(mock.current.blur).toBeCalled();
        expect(mock.current.type).toEqual('password');
        expect(docMock.execCommand).toBeCalled();
    });
});


describe('formatMultipleInput', () => {
    const keys = { label: 'label', value: 'value', count: 'count' };
    it('should return empty object if data is not defined', () => {
        expect(formatMultipleInput(undefined, keys)).toEqual({ count: 1, label0: '', value0: '' });
    });
    it('should return all values', () => {
        expect(formatMultipleInput({ 0: { value: 1, label: 1 }, 3: { value: 2, label: 2 } }, keys))
            .toEqual({ count: 3, label0: 1, value0: 1, label1: 2, value1: 2, label2: '', value2: '' });
    });
    it('should return all values even without label', () => {
        expect(formatMultipleInput({ 0: { value: 1, label: 1 }, 3: { value: 2 } }, keys))
            .toEqual({ count: 3, label0: 1, value0: 1, label1: '', value1: 2, label2: '', value2: '' });
    });
    it('should return all values without one which has no value', () => {
        expect(formatMultipleInput({ 0: { value: 1, label: 1 }, 3: { label: 2 } }, keys))
            .toEqual({ count: 2, label0: 1, value0: 1, label1: '', value1: '' });
    });
    it('should return all values without one which has no value and no ordered', () => {
        expect(formatMultipleInput({ 0: { value: 1, label: 1 }, 3: { label: 2 }, 4: { value: 3, label: 3 } }, keys))
            .toEqual({ count: 3, label0: 1, value0: 1, label1: 3, value1: 3, label2: '', value2: '' });
    });
});

describe('getVaultsThroughGroups', () => {
    it('should return undefined object if data is not defined', () => {
        expect(getVaultsThroughGroups(undefined, undefined)).toEqual([]);
    });
    it('should proper relations', () => {
        expect(getVaultsThroughGroups([{ id: 1 }, { id: 2 }], [{ id: 22 }, { id: 44 }],
            [{ group_id: 1, vault_id: 11 }, { group_id: 1, vault_id: 22 }, { group_id: 1, vault_id: 33 }, { group_id: 2, vault_id: 22 }, { group_id: 2, vault_id: 44 }]))
            .toEqual([{ group: { id: 1 }, vaults: [{ id: 22 }] }, { group: { id: 2 }, vaults: [{ id: 22 }, { id: 44 }] }]);
    });
    it('should proper relations if ther are no connections', () => {
        expect(getVaultsThroughGroups([{ id: 1 }, { id: 2 }, { id: 3 }], [{ id: 22 }, { id: 44 }, { id: 77 }],
            [{ group_id: 1, vault_id: 11 }, { group_id: 1, vault_id: 22 }, { group_id: 1, vault_id: 33 }, { group_id: 2, vault_id: 22 }, { group_id: 2, vault_id: 44 },
                { group_id: 3, vault_id: 55 }, { group_id: 3, vault_id: 66 }]))
            .toEqual([{ group: { id: 1 }, vaults: [{ id: 22 }] }, { group: { id: 2 }, vaults: [{ id: 22 }, { id: 44 }] }]);
    });
    it('should proper relations if', () => {
        expect(getVaultsThroughGroups([{ id: 14 }, { id: 2 }, { id: 3 }],
            [{ id: 1 }, { id: 6 }, { id: 2 }], [{ group_id: 2, vault_id: 2 }]))
            .toEqual([{ group: { id: 2 }, vaults: [{ id: 2 }] }]);
    });
});

describe('fillWithEmpty', () => {
    it('should return undefined object if data is not defined', () => {
        expect(fillWithEmpty(undefined, undefined)).toEqual({});
    });
    it('should fill object with empty fields', () => {
        expect(fillWithEmpty([
            { name: 'a', component: 'input' },
            { name: 'b', component: 'multiple_input' },
            { name: 'c', component: 'password_generator' },
            { name: 'd', component: 'checkbox' },
            { name: 'f', component: 'tree' },
            { name: 'e' },
        ], {})).toEqual({ a: '', b: {}, c: '', d: false, e: '', f: '' });
    });
    it('should not change object', () => {
        expect(fillWithEmpty([
            { name: 'a', component: 'input' },
            { name: 'b', component: 'multiple_input' },
            { name: 'c', component: 'password_generator' },
            { name: 'd', component: 'checkbox' },
            { name: 'f', component: 'tree' },
            { name: 'e' },
        ], { a: 'a', b: { a: '' }, c: 'c', d: true, f: 0, e: undefined })).toEqual({ a: 'a', b: { a: '' }, c: 'c', d: true, e: '', f: 0 });
    });
    it('should fill empty fields', () => {
        expect(fillWithEmpty([
            { name: 'a', component: 'input' },
            { name: 'b', component: 'multiple_input' },
            { name: 'c', component: 'password_generator' },
            { name: 'd', component: 'checkbox' },
            { name: 'f', component: 'tree' },
            { name: 'e' },
        ], { a: 'a', c: 'c', f: 0, e: undefined })).toEqual({ a: 'a', b: {}, c: 'c', d: false, e: '', f: 0 });
    });
});

describe('parseItemsValues', () => {
    it('should return undefined object if data is not defined', () => {
        expect(parseItemsValues(undefined)).toEqual({});
    });
    it('should return proper data 1', () => {
        const data = {
            idLabel: 1,
            idLabelWeb: 1,
            newLabel0: "",
            newTextFieldLink0: "",
            newTextFieldName0: "",
            newValue0: "",
        };
        expect(parseItemsValues(data)).toEqual({});
    });
    it('should return proper data 2', () => {
        const data = {
            newTextFieldName0: 'w1',
            newTextFieldLink0: 'w1',
            newTextFieldName1: '',
            newTextFieldLink1: '',
            idLabelWeb: 2,
            newLabel0: 'l1',
            newValue0: 'l1',
            newLabel1: 'l2',
            newValue1: 'l2',
            newLabel2: '',
            newValue2: '',
            idLabel: 3,
        };
        expect(parseItemsValues(data)).toEqual({
            web_addresses: {
                0: {
                    label: 'w1',
                    value: 'w1',
                },
            },
            labels: {
                0: {
                    label: 'l1',
                    value: 'l1',
                },
                1: {
                    label: 'l2',
                    value: 'l2',
                },
            } });
    });
    it('should return proper data 3', () => {
        const data = {
            newLabel0: 'l1',
            newValue0: 'l1',
            newLabel1: 'l2',
            newValue1: 'l2',
            newLabel2: '',
            newValue2: '',
        };
        expect(parseItemsValues(data)).toEqual({
            labels: {
                0: {
                    label: 'l1',
                    value: 'l1',
                },
                1: {
                    label: 'l2',
                    value: 'l2',
                },
            } });
    });
    it('should return proper data 4', () => {
        const data = {
            newTextFieldName0: 'w1',
            newTextFieldLink0: 'w1',
            newTextFieldName1: '',
            newTextFieldLink1: '',
        };
        expect(parseItemsValues(data)).toEqual({
            web_addresses: {
                0: {
                    label: 'w1',
                    value: 'w1',
                },
            } });
    });
});
