import actions from 'redux/actions/activityActions';
import _ from 'lodash';

export const initialState = {};

const formatActivity = activity => activity;

export default (state = initialState, action) => {
    const payload = _.get(action, 'payload', {});
    const other = _.get(action, 'other', {});
    switch (action.type) {
    case actions.GET_ACTIVITIES_SUCCESS:
        return { data: _.map(payload, formatActivity), ...other };
    default:
        return state;
    }
};
