import { getGroupsState, getGroupsByVaultIdState, getGroupsWithoutVaultIdState, getGroupsByGroupIdState,
    getGroupsByUserIdState, getGroupsWithoutUserIdState, getGroupByIdState, getGroupsWithoutParentGroup } from "../groupsSelectors";

describe('groupsSelectors', () => {
    const state = {
        relations: {
            group_vaults: [{ group_id: 1, vault_id: 2 }, { group_id: 3, vault_id: 4 }, { group_id: 3, vault_id: 2 }],
            group_users: [{ group_id: 1, user_id: 2 }, { group_id: 3, user_id: 4 }, { group_id: 3, user_id: 2 }],
            user_vaults: [{ user_id: 1, vault_id: 2 }, { user_id: 3, vault_id: 4 }, { user_id: 3, vault_id: 2 }],
        },
        groups: [{ id: 1 }, { id: 3 }],
    };
    describe('getGroupsState', () => {
        it('should return the empty array', () => {
            expect(getGroupsState(state)).toEqual([{ id: 1 }, { id: 3 }]);
        });
    });
    describe('getGroupsByVaultIdState', () => {
        it('should return filled array', () => {
            expect(getGroupsByVaultIdState(state, { id: 2 })).toEqual([{ id: 1 }, { id: 3 }]);
        });
        it('should return empty array', () => {
            expect(getGroupsByVaultIdState(state, { id: 56 })).toEqual([]);
        });
    });
    describe('getGroupsWithoutVaultIdState', () => {
        it('should return empty array', () => {
            expect(getGroupsWithoutVaultIdState(state, { id: 2 })).toEqual([]);
        });
        it('should return filled array', () => {
            expect(getGroupsWithoutVaultIdState(state, { id: 4 })).toEqual([{ id: 1 }]);
        });
    });
    describe('getGroupsByUserIdState', () => {
        it('should return filled array', () => {
            expect(getGroupsByUserIdState(state, { id: 2 })).toEqual([{ id: 1 }, { id: 3 }]);
        });
        it('should return empty array', () => {
            expect(getGroupsByUserIdState(state, { id: 56 })).toEqual([]);
        });
    });
    describe('getGroupsWithoutUserIdState', () => {
        it('should return empty array', () => {
            expect(getGroupsWithoutUserIdState(state, { id: 2 })).toEqual([]);
        });
        it('should return filled array', () => {
            expect(getGroupsWithoutUserIdState(state, { id: 4 })).toEqual([{ id: 1 }]);
        });
    });
    describe('getGroupByIdState', () => {
        it('should return empty array', () => {
            expect(getGroupByIdState(state, { id: 1 })).toEqual({ id: 1 });
        });
        it('should return filled array', () => {
            expect(getGroupByIdState(state, { id: 4 })).toEqual();
        });
    });
    describe('getGroupsWithoutParentGroup', () => {
        const state = {
            groups: [{ id: 1, parent_group_id: 3 }, { id: 3, parent_group_id: null }, { id: 4, parent_group_id: 1 }, { id: 5, parent_group_id: null }],
        };
        it('should return filled array if group inside given', () => {
            expect(getGroupsWithoutParentGroup(state, { id: 1 })).toEqual([{ id: 5, parent_group_id: null }]);
        });
        it('should return empty array', () => {
            expect(getGroupsWithoutParentGroup(state, { id: 5 })).toEqual([{ id: 3, parent_group_id: null }]);
        });
        it('should return filled array', () => {
            expect(getGroupsWithoutParentGroup(state, { id: 7 })).toEqual([{ id: 3, parent_group_id: null }, { id: 5, parent_group_id: null }]);
        });
    });
    describe('getGroupsByGroupIdState', () => {
        const state = {
            groups: [{ id: 1, parent_group_id: 3 }, { id: 3, parent_group_id: null }, { id: 4, parent_group_id: 1 }, { id: 5, parent_group_id: null }],
        };
        it('should return filled array if group inside given', () => {
            expect(getGroupsByGroupIdState(state, { id: 3 })).toEqual([{ id: 4, parent_group_id: 1 }, { id: 1, parent_group_id: 3 }]);
        });
        it('should return empty array', () => {
            expect(getGroupsByGroupIdState(state, { id: 5 })).toEqual([]);
        });
    });
});
