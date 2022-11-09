import { getGroupVaults, getVaultGroups, getGroupUsers, getUserVaults, getVaultUsers, getUserGroups,
    getUserGroupState, getUserVaultState } from "../relationsSelectors";

describe('relationsSelectors', () => {
    const state = {
        relations: {
            group_vaults: [{ group_id: 1, vault_id: 2 }, { group_id: 3, vault_id: 4 }, { group_id: 3, vault_id: 2 }],
            group_users: [{ group_id: 1, user_id: 2 }, { group_id: 3, user_id: 4 }, { group_id: 3, user_id: 2 }],
            user_vaults: [{ user_id: 1, vault_id: 2 }, { user_id: 3, vault_id: 4 }, { user_id: 3, vault_id: 2 }],
        },
    };
    describe('getUserGroupState', () => {
        it('should return the empty array', () => {
            expect(getUserGroupState(state, undefined)).toEqual(undefined);
        });
        it('should return all data', () => {
            expect(getUserGroupState(state, { mainId: '3', user: { id: '4' } })).toEqual({ group_id: 3, user_id: 4 });
        });
        it('should return empty data', () => {
            expect(getUserGroupState(state, { mainId: 3, user: { id: 5 } })).toEqual(undefined);
        });
    });
    describe('getUserVaultState', () => {
        it('should return the empty array', () => {
            expect(getUserVaultState(state, undefined)).toEqual(undefined);
        });
        it('should return all data', () => {
            expect(getUserVaultState(state, { mainId: 4, user: { id: 3 } })).toEqual({ vault_id: 4, user_id: 3 });
        });
        it('should return empty data', () => {
            expect(getUserVaultState(state, { mainId: 3, user: { id: 5 } })).toEqual(undefined);
        });
    });
    describe('getGroupVaults', () => {
        it('should return the empty array', () => {
            expect(getGroupVaults(state, undefined)).toEqual([]);
        });
        it('should return all data', () => {
            expect(getGroupVaults(state, { id: 3 })).toEqual([4, 2]);
        });
        it('should return empty data', () => {
            expect(getGroupVaults(state, { id: 2 })).toEqual([]);
        });
    });
    describe('getVaultGroups', () => {
        it('should return the empty array', () => {
            expect(getVaultGroups(state, undefined)).toEqual([]);
        });
        it('should return all data', () => {
            expect(getVaultGroups(state, { id: 2 })).toEqual([1, 3]);
        });
        it('should return empty data', () => {
            expect(getVaultGroups(state, { id: 6 })).toEqual([]);
        });
    });
    describe('getUserVaults', () => {
        it('should return the empty array', () => {
            expect(getUserVaults(state, undefined)).toEqual([]);
        });
        it('should return all data', () => {
            expect(getUserVaults(state, { id: 3 })).toEqual([4, 2]);
        });
        it('should return empty data', () => {
            expect(getUserVaults(state, { id: 6 })).toEqual([]);
        });
    });
    describe('getVaultUsers', () => {
        it('should return the empty array', () => {
            expect(getVaultUsers(state, undefined)).toEqual([]);
        });
        it('should return all data', () => {
            expect(getVaultUsers(state, { id: 2 })).toEqual([1, 3]);
        });
        it('should return empty data', () => {
            expect(getVaultUsers(state, { id: 6 })).toEqual([]);
        });
    });
    describe('getUserGroups', () => {
        it('should return the empty array', () => {
            expect(getUserGroups(state, undefined)).toEqual([]);
        });
        it('should return all data', () => {
            expect(getUserGroups(state, { id: 2 })).toEqual([1, 3]);
        });
        it('should return empty data', () => {
            expect(getUserGroups(state, { id: 6 })).toEqual([]);
        });
    });
    describe('getGroupUsers', () => {
        it('should return the empty array', () => {
            expect(getGroupUsers(state, undefined)).toEqual([]);
        });
        it('should return all data', () => {
            expect(getGroupUsers(state, { id: 3 })).toEqual([4, 2]);
        });
        it('should return empty data', () => {
            expect(getGroupUsers(state, { id: 6 })).toEqual([]);
        });
    });
});
