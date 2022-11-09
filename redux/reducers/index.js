import { combineReducers } from 'redux';
import userReducer from './userReducer';
import menuReducer from './menuReducer';
import vaultsReducer from './vaultsReducer';
import groupsReducer from './groupsReducer';
import vaultItemsReducer from './vaultItemsReducer';
import notifyReducer from './notifyReducer';
import usersReducer from './usersReducer';
import invitationReducer from './invitationReducer';
import activityReducer from './activityReducer';
import relationsReducer from './relationsReducer';
import modalModeReducer from './modalModeReducer';

const combinedReducer = combineReducers({
    user: userReducer,
    menu: menuReducer,
    vaults: vaultsReducer,
    groups: groupsReducer,
    invitations: invitationReducer,
    activities: activityReducer,
    notify: notifyReducer,
    users: usersReducer,
    vault_items: vaultItemsReducer,
    relations: relationsReducer,
    modalMode: modalModeReducer,
});

export default (state, action) => {
    const stateCopy = action.type === 'CLEAR_STORE' ? undefined : { ...state };
    return combinedReducer(stateCopy, action);
};
