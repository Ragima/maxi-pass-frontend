import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import actions from 'redux/actions/notifyActions';
import { getNotifyState } from 'redux/selectors/notifySelectors';
import NotificationsWrap from './NotificationsWrap';

const mapDispatchToProps = dispatch => ({
    clearNotify: () => dispatch(actions.clearNotify()),
});

const mapStateToProps = state => ({
    notify: getNotifyState(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(NotificationsWrap));
