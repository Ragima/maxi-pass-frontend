import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import actions from 'redux/actions/activityActions';
import { client } from 'helpers/redux/actions';
import ActivitiesSettingsTable from './ActivitiesSettingsTable';

const mapDispatchToProps = dispatch => ({
    markActivity: client(dispatch, actions.markActivity),
    unmarkActivity: client(dispatch, actions.unmarkActivity),
});

export default connect(null, mapDispatchToProps)(injectIntl(ActivitiesSettingsTable));
