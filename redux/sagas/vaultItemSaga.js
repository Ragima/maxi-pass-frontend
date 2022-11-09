import { takeLatest } from 'redux-saga/effects';
import actions from 'redux/actions/vaultItemActions';
import { getVaultItems, deleteVaultItem, createVaultItem, editVaultItem, getVaultItem, copyItem, moveItem,
    deleteDocument, createDocument, editDocument, getDocument,
} from 'api_layer/requests/vault';
import { createSaga } from 'helpers/redux/saga';

export default function* actionWatcher() {
    yield takeLatest(actions.GET_VAULT_ITEMS, getVaultItemsSaga);
    yield takeLatest(actions.DELETE_VAULT_ITEM, deleteVaultItemSaga);
    yield takeLatest(actions.CREATE_VAULT_ITEM, createVaultItemSaga);
    yield takeLatest(actions.EDIT_VAULT_ITEM, editVaultItemSaga);
    yield takeLatest(actions.GET_VAULT_ITEM, getVaultItemSaga);
    yield takeLatest(actions.COPY_ITEM, copyItemSaga);
    yield takeLatest(actions.MOVE_ITEM, moveItemSaga);
    yield takeLatest(actions.DELETE_DOCUMENT, deleteDocumentSaga);
    yield takeLatest(actions.CREATE_DOCUMENT, createDocumentSaga);
    yield takeLatest(actions.UPDATE_DOCUMENT, editDocumentSaga);
    yield takeLatest(actions.GET_DOCUMENT, getDocumentSaga);
}

export const getVaultItemsSaga = createSaga(getVaultItems,
    { successAction: actions.getVaultItemsSuccess },
);

export const getVaultItemSaga = createSaga(getVaultItem,
    { successAction: actions.getVaultItemSuccess },
);

export const createVaultItemSaga = createSaga(createVaultItem,
    { successAction: actions.createVaultItemSuccess },
    { successId: 'vaultItemCreated' },
);

export const editVaultItemSaga = createSaga(editVaultItem,
    { successAction: actions.editVaultItemSuccess },
    { successId: 'vaultItemEdited' },
);

export const copyItemSaga = createSaga(copyItem,
    { successAction: actions.copyItemSuccess },
    { successId: 'itemCopied' },
);

export const moveItemSaga = createSaga(moveItem,
    { successAction: actions.moveItemSuccess },
    { successId: 'itemMoved' },
);

export const deleteVaultItemSaga = createSaga(deleteVaultItem,
    { successAction: actions.deleteVaultItemSuccess },
    { paramsInstead: true, successId: 'vaultItemDeleted' },
);

export const deleteDocumentSaga = createSaga(deleteDocument,
    { successAction: actions.deleteDocumentSuccess },
);

export const getDocumentSaga = createSaga(getDocument,
    { successAction: actions.getDocumentSuccess },
);

export const createDocumentSaga = createSaga(createDocument,
    { successAction: actions.createDocumentSuccess },
);

export const editDocumentSaga = createSaga(editDocument,
    { successAction: actions.updateDocumentSuccess },
);
