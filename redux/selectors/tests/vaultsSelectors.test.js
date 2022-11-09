import { getVaultsState, getVaultByIdState, getVaultsByGroupIdState, getVaultsWithoutGroupIdState,
    getVaultsByUserIdState, getVaultsWithoutUserIdState } from "../vaultsSelectors";

describe('vaultsSelectors', () => {
    const state = {
        relations: {
            group_vaults: [{ group_id: 1, vault_id: 2 }, { group_id: 3, vault_id: 4 }, { group_id: 3, vault_id: 2 }],
            group_users: [{ group_id: 1, user_id: 2 }, { group_id: 3, user_id: 4 }, { group_id: 3, user_id: 2 }],
            user_vaults: [{ user_id: 1, vault_id: 2 }, { user_id: 3, vault_id: 4 }, { user_id: 3, vault_id: 2 }],
        },
        vaults: [{ id: 2 }, { id: 4 }, { id: 1 }, { id: 3 }],
    };
    describe('getVaultsState', () => {
        it('should return the empty array', () => {
            expect(getVaultsState(state)).toEqual([{ id: 2 }, { id: 4 }, { id: 1 }, { id: 3 }]);
        });
    });
    describe('getVaultsByGroupIdState', () => {
        it('should return filled array', () => {
            expect(getVaultsByGroupIdState(state, { id: 3 })).toEqual([{ id: 2 }, { id: 4 }]);
        });
        it('should return empty array', () => {
            expect(getVaultsByGroupIdState(state, { id: 56 })).toEqual([]);
        });
    });
    describe('getVaultsWithoutGroupIdState', () => {
        it('should return empty array', () => {
            expect(getVaultsWithoutGroupIdState(state, { id: 3 })).toEqual([{ id: 1 }, { id: 3 }]);
        });
        it('should return filled array', () => {
            expect(getVaultsWithoutGroupIdState(state, { id: 1 })).toEqual([{ id: 4 }, { id: 1 }, { id: 3 }]);
        });
    });
    describe('getVaultsByUserIdState', () => {
        it('should return filled array', () => {
            expect(getVaultsByUserIdState(state, { id: 3 })).toEqual([{ id: 2 }, { id: 4 }]);
        });
        it('should return empty array', () => {
            expect(getVaultsByUserIdState(state, { id: 56 })).toEqual([]);
        });
    });
    describe('getVaultsWithoutUserIdState', () => {
        it('should return empty array', () => {
            expect(getVaultsWithoutUserIdState(state, { id: 3 })).toEqual([{ id: 1 }, { id: 3 }]);
        });
        it('should return filled array', () => {
            expect(getVaultsWithoutUserIdState(state, { id: 78 })).toEqual([{ id: 2 }, { id: 4 }, { id: 1 }, { id: 3 }]);
        });
    });
    describe('getVaultByIdState', () => {
        it('should return empty array', () => {
            expect(getVaultByIdState(state, { id: 1 })).toEqual({ id: 1 });
        });
        it('should return filled array', () => {
            expect(getVaultByIdState(state, { id: 44 })).toEqual();
        });
    });
});
