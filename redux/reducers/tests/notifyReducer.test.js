import notifyReducer, { initialState } from "redux/reducers/notifyReducer";
import actions from 'redux/actions/notifyActions';

describe('notifyReducer', () => {
    it('should return the initial state', () => {
        expect(notifyReducer(undefined, {})).toEqual(initialState);
    });
    it('should set notify on show notify', () => {
        expect(notifyReducer(initialState, actions.showNotify({ payload: { type: 'Jon', message: 'lol' } }))).toEqual({ type: 'Jon', message: 'lol' });
    });
    it('should clear notify on clear notify', () => {
        expect(notifyReducer({ g: 'hi all' }, actions.clearNotify())).toEqual(initialState);
    });
});
