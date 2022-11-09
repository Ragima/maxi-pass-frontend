import relationsReducer, { initialState } from "redux/reducers/relationsReducer";
import actions from 'redux/actions/linkActions';
import usersActions from 'redux/actions/usersActions';
import vaultActions from 'redux/actions/vaultActions';
import groupActions from 'redux/actions/groupActions';

describe('relationsReducer', () => {
    it('should return the initial state', () => {
        expect(relationsReducer(undefined, {})).toEqual(initialState);
    });
    it('should handle GET_USERS_SUCCESS', () => {
        expect(relationsReducer({ group_vaults: [] }, usersActions.getUsersSuccess({ other: { group_vaults: { data: [{ group_id: 3, vault_id: 2 }] } } })))
            .toEqual({ group_vaults: [{ group_id: 3, vault_id: 2 }] });
    });
    it('should handle GET_VAULTS_PAGE_SUCCESS', () => {
        expect(relationsReducer({ group_vaults: [] }, vaultActions.getVaultsPageSuccess({ other: { group_vaults: { data: [{ group_id: 3, vault_id: 2 }] } } })))
            .toEqual({ group_vaults: [{ group_id: 3, vault_id: 2 }] });
    });
    it('should handle GET_GROUP_SUCCESS', () => {
        expect(relationsReducer({ group_vaults: [] }, groupActions.getGroupSuccess({ other: { group_vaults: { data: [{ group_id: 3, vault_id: 2 }] } } })))
            .toEqual({ group_vaults: [{ group_id: 3, vault_id: 2 }] });
    });
    it('should handle GET_VAULT_SUCCESS', () => {
        expect(relationsReducer({ group_vaults: [] }, vaultActions.getVaultSuccess({ other: { group_vaults: { data: [{ group_id: 3, vault_id: 2 }] } } })))
            .toEqual({ group_vaults: [{ group_id: 3, vault_id: 2 }] });
    });
    it('should handle GET_USER_SUCCESS', () => {
        expect(relationsReducer({ group_vaults: [] }, usersActions.getUserSuccess({ other: { group_vaults: { data: [{ group_id: 3, vault_id: 2 }] } } })))
            .toEqual({ group_vaults: [{ group_id: 3, vault_id: 2 }] });
    });

    it('should handle LINK_GROUP_VAULT_SUCCESS and add new', () => {
        expect(relationsReducer({ group_vaults: [] }, actions.linkGroupVaultSuccess({ payload: { group_id: 3, vault_id: 2 } })))
            .toEqual({ group_vaults: [{ group_id: 3, vault_id: 2 }] });
    });
    it('should handle LINK_GROUP_VAULT_SUCCESS and add to existant', () => {
        expect(relationsReducer({ group_vaults: [{ id: 1, group_id: 4, vault_id: 5 }] }, actions.linkGroupVaultSuccess({ payload: { id: 2, group_id: 3, vault_id: 2 } })))
            .toEqual({ group_vaults: [{ id: 1, group_id: 4, vault_id: 5 }, { id: 2, group_id: 3, vault_id: 2 }] });
    });
    it('should handle LINK_GROUP_VAULT_SUCCESS and make it uniq', () => {
        expect(relationsReducer({ group_vaults: [{ id: 1, group_id: 4, vault_id: 5 }, { id: 2, group_id: 2, vault_id: 3 }] },
            actions.linkGroupVaultSuccess({ payload: { id: 2, group_id: 2, vault_id: 3 } })))
            .toEqual({ group_vaults: [{ id: 1, group_id: 4, vault_id: 5 }, { id: 2, group_id: 2, vault_id: 3 }] });
    });
    it('should handle LINK_GROUP_USER_SUCCESS and add new', () => {
        expect(relationsReducer({ group_users: [] }, actions.linkGroupUserSuccess({ payload: { group_id: 3, user_id: 2 } })))
            .toEqual({ group_users: [{ group_id: 3, user_id: 2 }] });
    });
    it('should handle LINK_GROUP_USER_SUCCESS and add to existant', () => {
        expect(relationsReducer({ group_users: [{ id: 1, group_id: 4, user_id: 5 }] }, actions.linkGroupUserSuccess({ payload: { id: 2, group_id: 3, user_id: 2 } })))
            .toEqual({ group_users: [{ id: 1, group_id: 4, user_id: 5 }, { id: 2, group_id: 3, user_id: 2 }] });
    });
    it('should handle LINK_GROUP_USER_SUCCESS and make it uniq', () => {
        expect(relationsReducer({ group_users: [{ id: 1, group_id: 4, user_id: 5 }, { id: 2, group_id: 2, user_id: 3 }] },
            actions.linkGroupUserSuccess({ payload: { id: 2, group_id: 2, user_id: 3 } })))
            .toEqual({ group_users: [{ id: 1, group_id: 4, user_id: 5 }, { id: 2, group_id: 2, user_id: 3 }] });
    });
    it('should handle LINK_USER_VAULT_SUCCESS and add new', () => {
        expect(relationsReducer({ user_vaults: [] }, actions.linkUserVaultSuccess({ payload: { vault_id: 3, user_id: 2 } })))
            .toEqual({ user_vaults: [{ vault_id: 3, user_id: 2 }] });
    });
    it('should handle LINK_USER_VAULT_SUCCESS and add to existant', () => {
        expect(relationsReducer({ user_vaults: [{ id: 1, vault_id: 4, user_id: 5 }] }, actions.linkUserVaultSuccess({ payload: { id: 2, vault_id: 3, user_id: 2 } })))
            .toEqual({ user_vaults: [{ id: 1, vault_id: 4, user_id: 5 }, { id: 2, vault_id: 3, user_id: 2 }] });
    });
    it('should handle LINK_USER_VAULT_SUCCESS and make it uniq', () => {
        expect(relationsReducer({ user_vaults: [{ id: 1, vault_id: 4, user_id: 5 }, { id: 2, vault_id: 2, user_id: 3 }] }, actions.linkUserVaultSuccess({ payload: { id: 2, vault_id: 2, user_id: 3 } })))
            .toEqual({ user_vaults: [{ id: 1, vault_id: 4, user_id: 5 }, { id: 2, vault_id: 2, user_id: 3 }] });
    });
    it('should handle UNLINK_GROUP_VAULT_SUCCESS if empty', () => {
        expect(relationsReducer({ group_vaults: [] }, actions.unlinkGroupVaultSuccess({ payload: { group_id: 3, vault_id: 2 } })))
            .toEqual({ group_vaults: [] });
    });
    it('should handle UNLINK_GROUP_VAULT_SUCCESS', () => {
        expect(relationsReducer({ group_vaults: [{ group_id: 4, vault_id: 5 }, { id: 2, group_id: 3, vault_id: 2 }] }, actions.unlinkGroupVaultSuccess({ payload: { group_id: '4', vault_id: '5' } })))
            .toEqual({ group_vaults: [{ id: 2, group_id: 3, vault_id: 2 }] });
    });
    it('should handle UNLINK_GROUP_USER_SUCCESS if empty', () => {
        expect(relationsReducer({ group_users: [] }, actions.unlinkGroupUserSuccess({ payload: { group_id: 3, user_id: 2 } })))
            .toEqual({ group_users: [] });
    });
    it('should handle UNLINK_GROUP_USER_SUCCESS', () => {
        expect(relationsReducer({ group_users: [{ group_id: 4, user_id: 5 }, { id: 4, group_id: 3, user_id: 2 }] }, actions.unlinkGroupUserSuccess({ payload: { id: 4, group_id: '3', user_id: '2' } })))
            .toEqual({ group_users: [{ group_id: 4, user_id: 5 }] });
    });
    it('should handle UNLINK_USER_VAULT_SUCCESS if empty', () => {
        expect(relationsReducer({ user_vaults: [] }, actions.unlinkUserVaultSuccess({ payload: { group_id: 3, vault_id: 2 } })))
            .toEqual({ user_vaults: [] });
    });
    it('should handle UNLINK_USER_VAULT_SUCCESS', () => {
        expect(relationsReducer({ user_vaults: [{ user_id: 4, vault_id: 5 }, { id: 1, user_id: '3', vault_id: '2' }] },
            actions.unlinkUserVaultSuccess({ payload: { id: 1, user_id: 3, vault_id: 2 } })))
            .toEqual({ user_vaults: [{ user_id: 4, vault_id: 5 }] });
    });
    it('should handle CHANGE_GROUP_USER_ROLE', () => {
        expect(relationsReducer({ group_users: [{ id: 0, user_id: 4, group_id: 5, role: 'lead' }, { id: 1, user_id: '3', group_id: '2', role: 'user' }] },
            actions.changeGroupUserRoleSuccess({ payload: { id: 0, user_id: 4, group_id: 2, data: { role: 'user' } } })))
            .toEqual({ group_users: [{ id: 0, user_id: 4, group_id: 5, role: 'user' }, { id: 1, user_id: '3', group_id: '2', role: 'user' }] });
    });
    it('should handle CHANGE_USER_VAULT_POLICY', () => {
        expect(relationsReducer({ user_vaults: [{ id: 0, user_id: 4, vault_id: 5, vault_writer: true }, { id: 1, user_id: '3', vault_id: '2', vault_writer: false }] },
            actions.changeUserVaultPolicySuccess({ payload: { id: 1, user_id: 4, vault_id: 2, data: { vault_writer: true } } })))
            .toEqual({ user_vaults: [{ id: 0, user_id: 4, vault_id: 5, vault_writer: true }, { id: 1, user_id: '3', vault_id: '2', vault_writer: true }] });
    });
});
