import { getUserRoleState, getUserNameState, getUserNameEmailState } from "../userSelectors";

describe('userSelectors', () => {
    const state = {
        user: {
            lead: false,
            role_id: 'user',
            first_name: 'f',
            last_name: 'l',
            name: 'n',
        },
    };
    describe('getUserNameState', () => {
        it('should return the proper keys', () => {
            expect(getUserNameState(state)).toEqual({ first_name: 'f',
                last_name: 'l',
                name: 'n' });
        });
    });
    describe('getUserRoleState', () => {
        it('should return user if lead is false', () => {
            expect(getUserRoleState(state)).toEqual('user');
        });
        it('should return admin if lead is true', () => {
            expect(getUserRoleState({ ...state, user: { ...state.user, lead: true } })).toEqual('admin');
        });
    });
    describe('getUserNameEmailState', () => {
        it('should return user if lead is false', () => {
            const state = {
                user: {
                    lead: false,
                    role_id: 'user',
                    first_name: 'f',
                    last_name: 'l',
                    name: 'n',
                    email: 'a',
                },
            };
            expect(getUserNameEmailState(state)).toEqual({ ...state.user, nameEmail: 'n\na' });
        });
        it('should return admin if lead is true', () => {
            expect(getUserNameEmailState(state)).toEqual(state.user);
        });
    });
});
