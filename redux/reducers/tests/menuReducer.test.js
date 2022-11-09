import menuReducer, { initialState } from "redux/reducers/menuReducer";
import actions from 'redux/actions/menuActions';

describe('menuReducer', () => {
    it('should return the initial state', () => {
        expect(menuReducer(undefined, {})).toEqual(initialState);
    });
    it('should set isOpen to false on hideMenu', () => {
        expect(menuReducer(initialState, actions.hideMenu())).toEqual({ isOpen: false });
    });
    it('should set isOpen to true on showMenu', () => {
        expect(menuReducer(initialState, actions.showMenu())).toEqual({ isOpen: true });
    });
});
