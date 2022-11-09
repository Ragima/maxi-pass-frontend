import composedPageHoc from 'components/HOC/composedPageHoc';
import { getInitialData } from 'helpers/initialize/initialize';
import actions from 'redux/actions/groupActions';
import Groups from 'pages_components/Groups';

getInitialData(Groups, [actions.getGroups]);

export default composedPageHoc(Groups);
