import { actionsCreator } from 'redux/actions/index';

const actions = ['GET_ACTIVITIES', 'GET_ACTIVITIES_SETTINGS', 'MARK_ACTIVITY', 'UNMARK_ACTIVITY', 'GENERATE_ACTIVITY_REPORT'];

export default actionsCreator(actions);
