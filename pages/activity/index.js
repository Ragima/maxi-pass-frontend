import composedPageHoc from 'components/HOC/composedPageHoc';
import { getInitialData } from 'helpers/initialize/initialize';
import actions from 'redux/actions/activityActions';
import Activity from 'pages_components/Activity';

getInitialData(Activity, [actions.getActivities], []);

export default composedPageHoc(Activity);
