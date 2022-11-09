
import actions from 'redux/actions/notifyActions';

export const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
    case actions.SHOW_NOTIFY: {
        return { ...action.payload };
    }
    case actions.CLEAR_NOTIFY: return initialState;
    default:
        return state;
    }
};
