import actions from 'redux/actions/modalModeActions.js';

export const initialState = {
    isOpen: false,
    isCloseModeOnClick: false,
};

export default (state = initialState, action) => {
    switch(action.type){
        case actions.SET_OPEN_MODE: return {...state, isOpen: true};
        case actions.SET_CLOSE_MODE: return {...state,isOpen: false};
        case actions.SET_CLOSE_ON_CLICK:return {...state, isCloseModeOnClick:!state.isCloseModeOnClick}
        default:
            return state;
    }
};