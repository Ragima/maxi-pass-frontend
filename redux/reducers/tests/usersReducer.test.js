import usersReducer, { initialState } from "redux/reducers/usersReducer";
import actions from 'redux/actions/usersActions';
import vaultActions from 'redux/actions/vaultActions';
import groupActions from 'redux/actions/groupActions';
import activityActions from 'redux/actions/activityActions';

describe('usersReducer', () => {
    it('should return the initial state', () => {
        expect(usersReducer(undefined, {})).toEqual(initialState);
    });
    it('should handle GET_USERS_SUCCESS', () => {
        expect(usersReducer([], actions.getUsersSuccess({
            payload: [
                { id: 2, title: 'a' },
                { id: 3, title: 'Personal' }] })))
            .toEqual([{ id: 2, title: 'a' },
                { id: 3, title: 'Personal' }]);
    });
    it('should handle GET_VAULT_SUCCESS', () => {
        expect(usersReducer([], vaultActions.getVaultSuccess({
            other: { users: { data: [
                { id: 2, title: 'a', role_id: 'admin' },
                { id: 3, title: 'Personal' }] } } })))
            .toEqual([{ id: 3, title: 'Personal' }]);
    });
    it('should handle GET_ACTIVITIES_SUCCESS', () => {
        expect(usersReducer([], activityActions.getActivitiesSuccess({
            other: { users: { data: [
                { id: 2, title: 'a', role_id: 'admin' },
                { id: 3, title: 'Personal' }] } } })))
            .toEqual([{ id: 3, title: 'Personal' }]);
    });
    it('should handle GET_VAULTs_PAGE_SUCCESS', () => {
        expect(usersReducer([], vaultActions.getVaultsPageSuccess({
            other: { users: { data: [
                { id: 2, title: 'a', role_id: 'admin' },
                { id: 3, title: 'Personal' }] } } })))
            .toEqual([{ id: 3, title: 'Personal' }]);
    });
    it('should handle GET_GROUP_SUCCESS', () => {
        expect(usersReducer([], groupActions.getGroupSuccess({
            other: { users: { data: [
                { id: 2, title: 'a', role_id: 'admin' },
                { id: 3, title: 'Personal' }] } } })))
            .toEqual([{ id: 3, title: 'Personal' }]);
    });
    it('should handle CREATE_USER_SUCCESS', () => {
        expect(usersReducer([{ id: 2, name: 'a' }], actions.createUserSuccess({ payload: { id: 3, title: 'Personal' } })))
            .toEqual([{ id: 2, name: 'a' }, { id: 3, title: 'Personal' }]);
    });
    it('should handle GET_USER_SUCCESS if vault with that id is not present', () => {
        expect(usersReducer([{ id: 2, name: 'a' }], actions.getUserSuccess({ payload: { id: 3, name: 'b' } })))
            .toEqual([{ id: 2, name: 'a' }, { id: 3, name: 'b' }]);
    });
    it('should handle GET_USER_SUCCESS if vault with that id is present', () => {
        expect(usersReducer([{ id: 2, name: 'a' }, { id: 4, name: 'a' }], actions.getUserSuccess({ payload: { id: 4, name: 'b' } })))
            .toEqual([{ id: 2, name: 'a' }, { id: 4, name: 'b' }]);
    });
    it('should handle DELETE_USER_SUCCESS', () => {
        expect(usersReducer([{ id: 2, name: 'a' }, { id: 3, name: 'a' }], actions.deleteUserSuccess({ payload: { id: 3 } })))
            .toEqual([{ id: 2, name: 'a' }]);
    });
    it('should handle RESTORE_USER_SUCCESS', () => {
        expect(usersReducer([{ id: 2, name: 'a', reset_pass: true }, { id: 3, name: 'a', reset_pass: true }], actions.restoreUserSuccess({ payload: { id: 3 } })))
            .toEqual([{ id: 2, name: 'a', reset_pass: true }, { id: 3, name: 'a', reset_pass: false }]);
    });
    it('should handle TOGGLE_BLOCK_SUCCESS', () => {
        expect(usersReducer([{ id: 2, name: 'a', blocked: true }, { id: 3, name: 'a', blocked: true }], actions.toggleBlockSuccess({ payload: { id: 3 } })))
            .toEqual([{ id: 2, name: 'a', blocked: true }, { id: 3, name: 'a', blocked: false }]);
    });
    it('should handle EDIT_USER_SUCCESS', () => {
        expect(usersReducer([{ id: 2, name: 'a' }, { id: 3, name: 'a' }], actions.editUserSuccess({ payload: { id: 3, name: 'b' } })))
            .toEqual([{ id: 2, name: 'a' }, { id: 3, name: 'b' }]);
    });
    it('should handle CHANGE_ROLE_SUCCESS', () => {
        expect(usersReducer([{ id: 2, name: 'a' }, { id: 3, name: 'a' }], actions.changeRoleSuccess({ payload: { id: 3, name: 'b' } })))
            .toEqual([{ id: 2, name: 'a' }, { id: 3, name: 'b' }]);
    });
});
