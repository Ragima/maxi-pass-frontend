import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import { getActivitiesState } from 'redux/selectors/activitiesSelectors';
import { getUserWithNameEmailState } from 'redux/selectors/usersSelectors';
import actions from 'redux/actions/activityActions';
import { client } from 'helpers/redux/actions';
import ActivityTable from './ActivityTable';


const mapStateToProps = state => ({
    activities: getActivitiesState(state),
    users: getUserWithNameEmailState(state),
});

const mapDispatchToProps = dispatch => ({
    getActivities: client(dispatch, actions.getActivities),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ActivityTable));
