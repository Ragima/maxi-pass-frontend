import vaultsReducer, { initialState } from "redux/reducers/vaultsReducer";
import actions from 'redux/actions/vaultActions';
import usersActions from 'redux/actions/usersActions';
import groupActions from 'redux/actions/groupActions';
import userActions from 'redux/actions/userActions';
import vaultItemActions from 'redux/actions/vaultItemActions';

describe('vaultsReducer', () => {
    it('should return the initial state', () => {
        expect(vaultsReducer(undefined, {})).toEqual(initialState);
    });
    it('should handle GET_VAULTS_SUCCESS', () => {
        expect(vaultsReducer([], actions.getVaultsSuccess({
            payload: [
                { id: 2, title: 'a' },
                { id: 3, title: 'Personal' }] })))
            .toEqual([{ id: 2, title: 'a' },
                { id: 3, title: 'Personal' }]);
    });
    it('should handle GET_VAULT_ITEMS_SUCCESS', () => {
        expect(vaultsReducer([], vaultItemActions.getVaultItemsSuccess({
            other: { vault: { data: { id: 2, title: 'a' } } } })))
            .toEqual([{ id: 2, title: 'a' }]);
    });
    it('should handle GET_VAULTS_PAGE_SUCCESS', () => {
        expect(vaultsReducer([], actions.getVaultsPageSuccess({
            payload: [
                { id: 2, title: 'a' },
                { id: 3, title: 'Personal' }] })))
            .toEqual([{ id: 2, title: 'a' },
                { id: 3, title: 'Personal' }]);
    });
    it('should handle GET_USER_SUCCESS', () => {
        expect(vaultsReducer([], usersActions.getUserSuccess({
            other: { vaults: { data: [{ id: 2, title: 'a' },
                { id: 3, title: 'Personal' }] } },
        })))
            .toEqual([{ id: 2, title: 'a' },
                { id: 3, title: 'Personal' }]);
    });
    it('should handle GET_HOME_PAGE_SUCCESS', () => {
        expect(vaultsReducer([], userActions.getHomePageSuccess({
            other: { vaults: { data: [{ id: 2, title: 'a' },
                { id: 3, title: 'Personal' }] } },
        })))
            .toEqual([{ id: 2, title: 'a' },
                { id: 3, title: 'Personal' }]);
    });
    it('should handle GET_GROUP_SUCCESS', () => {
        expect(vaultsReducer([], groupActions.getGroupSuccess({
            other: { vaults: { data: [{ id: 2, title: 'a' },
                { id: 3, title: 'Personal' }] } },
        })))
            .toEqual([{ id: 2, title: 'a' },
                { id: 3, title: 'Personal' }]);
    });
    it('should handle CREATE_VAULT_SUCCESS', () => {
        expect(vaultsReducer([{ id: 2, name: 'a' }], actions.createVaultSuccess({ payload: { id: 3, title: 'Personal' } })))
            .toEqual([{ id: 2, name: 'a' }, { id: 3, title: 'Personal' }]);
    });
    it('should handle GET_VAULT_SUCCESS if vault with that id is not present', () => {
        expect(vaultsReducer([{ id: 2, name: 'a' }], actions.getVaultSuccess({ payload: { id: 3, name: 'b' } })))
            .toEqual([{ id: 2, name: 'a' }, { id: 3, name: 'b' }]);
    });
    it('should handle GET_VAULT_SUCCESS if vault with that id is present', () => {
        expect(vaultsReducer([{ id: 2, name: 'a' }, { id: 4, name: 'a' }], actions.getVaultSuccess({ payload: { id: 4, name: 'b' } })))
            .toEqual([{ id: 2, name: 'a' }, { id: 4, name: 'b' }]);
    });
    it('should handle DELETE_VAULT_SUCCESS', () => {
        expect(vaultsReducer([{ id: 2, name: 'a' }, { id: 3, name: 'a' }], actions.deleteVaultSuccess({ payload: { id: 3 } })))
            .toEqual([{ id: 2, name: 'a' }]);
    });
    it('should handle EDIT_VAULT_SUCCESS', () => {
        expect(vaultsReducer([{ id: 2, name: 'a' }, { id: 3, name: 'a' }], actions.editVaultSuccess({ payload: { id: 3, name: 'b' } })))
            .toEqual([{ id: 2, name: 'a' }, { id: 3, name: 'b' }]);
    });
});
