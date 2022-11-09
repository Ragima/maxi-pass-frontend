
import _ from 'lodash';
import actions from 'redux/actions/menuActions';

export const initialState = {
    isOpen: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
    case actions.SHOW_MENU: return { isOpen: true };
    case actions.HIDE_MENU: return { isOpen: false };
    default:
        return state;
    }
};
