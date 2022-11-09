
import watchers, * as saga from "redux/sagas/vaultItemSaga";
import actions from "redux/actions/vaultItemActions";
import { watchersTests } from 'helpers/tests/enzymeHelpers';

describe('watchers', () => {
    watchersTests([
        [actions.GET_VAULT_ITEMS, saga.getVaultItemsSaga],
        [actions.DELETE_VAULT_ITEM, saga.deleteVaultItemSaga],
        [actions.CREATE_VAULT_ITEM, saga.createVaultItemSaga],
        [actions.EDIT_VAULT_ITEM, saga.editVaultItemSaga],
        [actions.GET_VAULT_ITEM, saga.getVaultItemSaga],
        [actions.COPY_ITEM, saga.copyItemSaga],
        [actions.MOVE_ITEM, saga.moveItemSaga],
        [actions.DELETE_DOCUMENT, saga.deleteDocumentSaga],
        [actions.CREATE_DOCUMENT, saga.createDocumentSaga],
        [actions.UPDATE_DOCUMENT, saga.editDocumentSaga],
        [actions.GET_DOCUMENT, saga.getDocumentSaga],
    ], watchers);
});
