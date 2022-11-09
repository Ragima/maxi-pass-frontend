import activityReducer, { initialState } from "redux/reducers/activityReducer";
import actions from 'redux/actions/activityActions';

describe('activityReducer', () => {
    it('should return the initial state', () => {
        expect(activityReducer(undefined, {})).toEqual(initialState);
    });
    it('should handle GET_ACTIVITIESS_SUCCESS', () => {
        expect(activityReducer({}, actions.getActivitiesSuccess({
            payload: [
                { id: 2, activity: 'a' },
                { id: 3, activity: 'b' }],
            other: {
                current_page: 1, 
                total_page: 2,
            } })))
            .toEqual({ data: [{ id: 2, activity: 'a' }, { id: 3, activity: 'b' }],
                current_page: 1, 
                total_page: 2 });
    });
});
