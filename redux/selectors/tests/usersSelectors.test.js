import { getUsersState, getUserByIdState, getUsersByVaultIdState, getUsersWithoutVaultIdState,
    getUsersByGroupIdState, getUsersWithoutGroupIdState, getUserWithNameEmailState, getRestoredUsersState, getNotRestoredUsersState } from "../usersSelectors";

describe('usersSelectors', () => {
    const state = {
        relations: {
            group_vaults: [{ group_id: 1, vault_id: 2 }, { group_id: 3, vault_id: 4 }, { group_id: 3, vault_id: 2 }],
            group_users: [{ group_id: 1, user_id: 2 }, { group_id: 3, user_id: 4 }, { group_id: 3, user_id: 2 }],
            user_vaults: [{ user_id: 1, vault_id: 2 }, { user_id: 3, vault_id: 4 }, { user_id: 3, vault_id: 2 }],
        },
        users: [{ id: 2 }, { id: 4 }, { id: 1, reset_pass: true }, { id: 3, reset_pass: true }],
    };
    describe('getUsersState', () => {
        it('should return the empty array', () => {
            expect(getUsersState(state)).toEqual([{ id: 2 }, { id: 4 }, { id: 1, reset_pass: true }, { id: 3, reset_pass: true }]);
        });
    });
    describe('getUserWithNameEmailState', () => {
        it('should return the empty array', () => {
            expect(getUserWithNameEmailState({ users: [{ id: 2, name: 'A', email: 'B' }, { id: 4 }] }))
                .toEqual([{ id: 2, name: 'A', email: 'B', nameEmail: 'A\nB' }, { id: 4 }]);
        });
    });
    describe('getUsersByVaultIdState', () => {
        it('should return filled array', () => {
            expect(getUsersByVaultIdState(state, { id: 2 })).toEqual([{ id: 1, reset_pass: true }, { id: 3, reset_pass: true }]);
        });
        it('should return empty array', () => {
            expect(getUsersByVaultIdState(state, { id: 56 })).toEqual([]);
        });
    });
    describe('getUsersWithoutVaultIdState', () => {
        it('should return empty array', () => {
            expect(getUsersWithoutVaultIdState(state, { id: 2 })).toEqual([{ id: 2 }, { id: 4 }]);
        });
        it('should return filled array', () => {
            expect(getUsersWithoutVaultIdState(state, { id: 4 })).toEqual([{ id: 2 }, { id: 4 }, { id: 1, reset_pass: true }]);
        });
    });
    describe('getRestoredUsersState', () => {
        it('should return filled array', () => {
            expect(getRestoredUsersState(state)).toEqual([{ id: 1, reset_pass: true }, { id: 3, reset_pass: true }]);
        });
    });
    describe('getNotRestoredUsersState', () => {
        it('should return filled array', () => {
            expect(getNotRestoredUsersState(state)).toEqual([{ id: 2 }, { id: 4 }]);
        });
    });
    describe('getUsersByGroupIdState', () => {
        it('should return filled array', () => {
            expect(getUsersByGroupIdState(state, { id: 3 })).toEqual([{ id: 2 }, { id: 4 }]);
        });
        it('should return empty array', () => {
            expect(getUsersByGroupIdState(state, { id: 56 })).toEqual([]);
        });
    });
    describe('getUsersWithoutGroupIdState', () => {
        it('should return empty array', () => {
            expect(getUsersWithoutGroupIdState(state, { id: 3 })).toEqual([{ id: 1, reset_pass: true }, { id: 3, reset_pass: true }]);
        });
        it('should return filled array', () => {
            expect(getUsersWithoutGroupIdState(state, { id: 78 })).toEqual([{ id: 2 }, { id: 4 }, { id: 1, reset_pass: true }, { id: 3, reset_pass: true }]);
        });
    });
    describe('getUserByIdState', () => {
        it('should return empty array', () => {
            expect(getUserByIdState(state, { id: 1 })).toEqual({ id: 1, reset_pass: true });
        });
        it('should return filled array', () => {
            expect(getUserByIdState(state, { id: 44 })).toEqual();
        });
    });
});
