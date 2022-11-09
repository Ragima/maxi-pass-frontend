import vaultItemsReducer, { initialState } from "redux/reducers/vaultItemsReducer";
import actions from 'redux/actions/vaultItemActions';

describe('vaultItemsReducer', () => {
    it('should return the initial state', () => {
        expect(vaultItemsReducer(undefined, {})).toEqual(initialState);
    });
    it('should handle GET_VAULT_ITEMS_SUCCESS', () => {
        expect(vaultItemsReducer([], actions.getVaultItemsSuccess({
            payload: [
                { id: 2, title: 'a', entity_type: 'CreditCardItem', documents: [{ data: { file: 'h.co', id: 1 } }] },
                { id: 3, title: 'b', tags: 'asda, aaa,aasd aaa.asds', content: { }, entity_type: 'LoginItem', vault_id: 1 },
            ] })))
            .toEqual([{ id: 2, title: 'a', type: 'credit_card', content: { title: 'a', tags: undefined }, tags: [], entity_type: 'CreditCardItem', documents: [{ name: 'h.co', id: 1 }] },
                { id: 3, title: 'b', content: { title: 'b', tags: 'asda, aaa,aasd aaa.asds' }, documents: [], entity_type: 'LoginItem', vault_id: 1, type: 'login', tags: ['asda', 'aaa', 'aasd', 'aaa', 'asds'] }]);
    });
    it('should handle CREATE_VAULT_ITEM_SUCCESS', () => {
        expect(vaultItemsReducer([{ id: 2, name: 'a' }], actions.createVaultItemSuccess({ payload: { id: 3, title: 'b' } })))
            .toEqual([{ id: 2, name: 'a' }, { id: 3, title: 'b', documents: [], content: { title: 'b', tags: undefined }, type: undefined, tags: [] }]);
    });
    it('should handle DELETE_VAULT_ITEM_SUCCESS', () => {
        expect(vaultItemsReducer([{ id: 2, name: 'a' }, { id: 3, name: 'a' }], actions.deleteVaultItemSuccess({ payload: { id: 3 } })))
            .toEqual([{ id: 2, name: 'a' }]);
    });
    it('should handle EDIT_VAULT_ITEM_SUCCESS', () => {
        expect(vaultItemsReducer([{ id: 2, name: 'a' }, { id: 3, title: 'a' }], actions.editVaultItemSuccess({ payload: { id: 3, title: 'b' } })))
            .toEqual([{ id: 2, name: 'a' }, { id: 3, title: 'b', documents: [], content: { title: 'b', tags: undefined }, type: undefined, tags: [] }]);
    });
    it('should handle GET_VAULT_ITEM_SUCCESS', () => {
        expect(vaultItemsReducer([{ id: 2, name: 'a' }, { id: 3, title: 'a' }], actions.getVaultItemSuccess({ payload: { id: 3, title: 'b' } })))
            .toEqual([{ id: 2, name: 'a' }, { id: 3, title: 'b', documents: [], content: { title: 'b', tags: undefined }, type: undefined, tags: [] }]);
    });
    it('should handle GET_VAULT_ITEM_SUCCESS with vaults', () => {
        expect(vaultItemsReducer([{ id: 2, name: 'a' }, { id: 3, title: 'a' }], actions.getVaultItemSuccess({ payload: { id: 3, title: 'b' }, other: { vaults: { data: [1, 2] } } })))
            .toEqual([{ id: 2, name: 'a' }, { id: 3, title: 'b', documents: [], content: { title: 'b', tags: undefined }, type: undefined, tags: [], vaults: [1, 2] }]);
    });
    it('should handle GET_VAULT_ITEM_SUCCESS if it is not present', () => {
        expect(vaultItemsReducer([{ id: 2, name: 'a' }], actions.getVaultItemSuccess({ payload: { id: 3, title: 'b' } })))
            .toEqual([{ id: 2, name: 'a' }, { id: 3, title: 'b', documents: [], content: { title: 'b', tags: undefined }, type: undefined, tags: [] }]);
    });
});
