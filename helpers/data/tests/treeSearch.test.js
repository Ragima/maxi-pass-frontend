import { searchInTree, isMatched, getAllChildrens } from 'helpers/data/treeSearch';
import _ from 'lodash';

describe('isMatched', () => {
    it('should return false if search is empty', () => {
        expect(isMatched({ data: { name: 'hi' } }, '')).toEqual(false);
    });
    it('should return false if data is empty', () => {
        expect(isMatched({}, 'hi')).toEqual(false);
    });
    it('should return false if data is not equal to search', () => {
        expect(isMatched({ data: { name: 'hi' } }, 'hi all')).toEqual(false);
    });
    it('should return true if data includes search', () => {
        expect(isMatched({ data: { name: 'hi all' } }, 'hi')).toEqual(true);
    });
    it('should return true if data is equal to search', () => {
        expect(isMatched({ data: { name: 'hi' } }, 'hi')).toEqual(true);
    });
});

describe('searchInTree', () => {
    it('should return empty results data is empty', () => {
        const data = [];
        expect(searchInTree(data, 'hi')).toEqual([]);
    });
    it('should return only data with name 1', () => {
        const data = [{ data: { name: '1' } }, { data: { name: '2' } }];
        expect(searchInTree(data, '1')).toEqual([{ data: { name: '1' } }]);
    });
    it('should return only data with name 2', () => {
        const data = [{ data: { name: '1' } }, { data: { name: '2' } }];
        expect(searchInTree(data, '2')).toEqual([{ data: { name: '2' } }]);
    });
    it('should return empty array with name 3', () => {
        const data = [{ data: { name: '1' } }, { data: { name: '2' } }];
        expect(searchInTree(data, '3')).toEqual([]);
    });
    it('should return all data if they contain search', () => {
        const data = [{ data: { name: '11' } }, { data: { name: '21' } }];
        expect(searchInTree(data, '1')).toEqual(data);
    });
    it('should return data with name 1 and its children if they contain search', () => {
        const data = [{ data: { name: '11', children: [{ data: { name: '33' } }] } }, { data: { name: '21' } }];
        expect(searchInTree(data, '11')).toEqual([{ data: { name: '11', children: [{ data: { name: '33' } }] } }]);
    });
    it('should return data with name 33 if they contain search', () => {
        const data = [{ data: { name: '11' }, children: [{ data: { name: '33' } }] }, { data: { name: '21' } }];
        expect(searchInTree(data, '3')).toEqual([{ data: { name: '33' } }]);
    });
});


describe('getAllChildrens', () => {
    it('should return empty array if data is not defined', () => {
        expect(getAllChildrens(undefined, undefined, undefined)).toEqual([]);
    });
    it('should return empty array if there are no childrens', () => {
        expect(getAllChildrens(2, [{ id: 1, parent_group_id: null }, { id: 2, parent_group_id: null }]))
            .toEqual([]);
    });
    it('should return all chidrens based on given data', () => {
        expect(_.orderBy(getAllChildrens(3, [
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
        ]), 'id'))
            .toEqual(_.orderBy([{ id: 6, parent_group_id: 3 },
                { id: 7, parent_group_id: 3 },
                { id: 8, parent_group_id: 3 },
                { id: 9, parent_group_id: 6 },
                { id: 10, parent_group_id: 6 },
                { id: 11, parent_group_id: 6 },
                { id: 12, parent_group_id: 9 }], 'id'));
    });
});
