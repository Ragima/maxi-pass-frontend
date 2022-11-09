import groupsReducer, { initialState } from "redux/reducers/groupsReducer";
import actions from 'redux/actions/groupActions';
import usersActions from 'redux/actions/usersActions';
import userActions from 'redux/actions/userActions';
import vaultsActions from 'redux/actions/vaultActions';

describe('groupsReducer', () => {
    it('should return the initial state', () => {
        expect(groupsReducer(undefined, {})).toEqual(initialState);
    });
    it('should handle GET_GROUPS_SUCCESS', () => {
        expect(groupsReducer([], actions.getGroupsSuccess({
            payload: [
                { id: 2, title: 'a', parent_group_id: 5 },
                { id: 3, title: 'Personal', parent_group_id: 2 }] })))
            .toEqual([{ id: 2, title: 'a', parent_group_id: 5 },
                { id: 3, title: 'Personal', parent_group_id: 2 }]);
    });
    it('should handle GET_VAULTS_PAGE_SUCCESS', () => {
        expect(groupsReducer([], vaultsActions.getVaultsPageSuccess({
            payload: {},
            other: { groups: { data: [{ id: 2, title: 'a', parent_group_id: 5 },
                { id: 3, title: 'Personal', parent_group_id: 2 }] } } })))
            .toEqual([{ id: 2, title: 'a', parent_group_id: 5 },
                { id: 3, title: 'Personal', parent_group_id: 2 }]);
    });
    it('should handle GET_HOME_PAGE_SUCCESS', () => {
        expect(groupsReducer([], userActions.getHomePageSuccess({
            payload: {},
            other: { groups: { data: [{ id: 2, title: 'a', parent_group_id: 5 },
                { id: 3, title: 'Personal', parent_group_id: 2 }] } } })))
            .toEqual([{ id: 2, title: 'a', parent_group_id: 5 },
                { id: 3, title: 'Personal', parent_group_id: 2 }]);
    });
    it('should handle GET_GROUP_SUCCESS', () => {
        expect(groupsReducer([], actions.getGroupSuccess({
            payload: {},
            other: { groups: { data: [{ id: 2, title: 'a' },
                { id: 3, title: 'Personal' }] } } })))
            .toEqual([{ id: 2, title: 'a', parent_group_id: null },
                { id: 3, title: 'Personal', parent_group_id: null }]);
    });
    it('should handle GET_VAULT_SUCCESS', () => {
        expect(groupsReducer([], vaultsActions.getVaultSuccess({
            payload: {},
            other: { groups: { data: [{ id: 2, title: 'a' },
                { id: 3, title: 'Personal' }] } } })))
            .toEqual([{ id: 2, title: 'a', parent_group_id: null },
                { id: 3, title: 'Personal', parent_group_id: null }]);
    });
    it('should handle GET_USERS_SUCCESS', () => {
        expect(groupsReducer([], usersActions.getUsersSuccess({
            payload: {},
            other: { groups: { data: [{ id: 2, title: 'a', parent_group_id: 5 },
                { id: 3, title: 'Personal', parent_group_id: 2 }] } } })))
            .toEqual([{ id: 2, title: 'a', parent_group_id: 5 },
                { id: 3, title: 'Personal', parent_group_id: 2 }]);
    });
    it('should handle GET_USER_SUCCESS', () => {
        expect(groupsReducer([], usersActions.getUserSuccess({
            payload: {},
            other: { groups: { data: [{ id: 2, title: 'a' },
                { id: 3, title: 'Personal' }] } } })))
            .toEqual([{ id: 2, title: 'a', parent_group_id: null },
                { id: 3, title: 'Personal', parent_group_id: null }]);
    });
    it('should handle CREATE_GROUP_SUCCESS', () => {
        expect(groupsReducer([{ id: 2, name: 'a' }], actions.createGroupSuccess({ payload: { id: 3, title: 'Personal' } })))
            .toEqual([{ id: 2, name: 'a' }, { id: 3, title: 'Personal', parent_group_id: null }]);
    });
    // it('should handle GET_GROUP_SUCCESS if vault with that id is not present', () => {
    //     expect(groupsReducer([{ id: 2, name: 'a' }], actions.getGroupSuccess({ payload: { id: 3, name: 'b' } })))
    //         .toEqual([{ id: 2, name: 'a' }, { id: 3, name: 'b', parent_group_id: null }]);
    // });
    // it('should handle GET_GROUP_SUCCESS if vault with that id is present', () => {
    //     expect(groupsReducer([{ id: 2, name: 'a' }, { id: 4, name: 'a' }], actions.getGroupSuccess({ payload: { id: 4, name: 'b' } })))
    //         .toEqual([{ id: 2, name: 'a' }, { id: 4, name: 'b', parent_group_id: null }]);
    // });
    it('should handle DELETE_GROUP_SUCCESS', () => {
        expect(groupsReducer([{ id: 2, name: 'a' }, { id: 3, name: 'a' }], actions.deleteGroupSuccess({ payload: { id: 3 } })))
            .toEqual([{ id: 2, name: 'a' }]);
    });
    it('should handle DELETE_PARENT_GROUP_SUCCESS', () => {
        expect(groupsReducer([{ id: 2, name: 'a' }, { id: 3, name: 'a', parent_group_id: 4 }], actions.deleteParentGroupSuccess({ payload: { innerId: 3 } })))
            .toEqual([{ id: 2, name: 'a' }, { id: 3, name: 'a', parent_group_id: null }]);
    });
    it('should handle EDIT_GROUP_SUCCESS', () => {
        expect(groupsReducer([{ id: 2, name: 'a' }, { id: 3, name: 'a' }], actions.editGroupSuccess({ payload: { id: 3, name: 'b' } })))
            .toEqual([{ id: 2, name: 'a' }, { id: 3, name: 'b', parent_group_id: null }]);
    });
    it('should handle CREATE_INNER_SUCCESS', () => {
        expect(groupsReducer([{ id: 2, name: 'a' }, { id: 3, name: 'a' }], actions.createInnerGroupSuccess({ payload: { id: 3, name: 'b' } })))
            .toEqual([{ id: 2, name: 'a' }, { id: 3, name: 'b', parent_group_id: null }]);
    });
});
