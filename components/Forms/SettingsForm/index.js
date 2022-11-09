import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import actions from 'redux/actions/userActions';
import { getUserNameState } from 'redux/selectors/userSelectors';
import { client } from 'helpers/redux/actions';
import SettingsForm from './SettingsForm';

const mapDispatchToProps = dispatch => ({
    updateSettings: client(dispatch, actions.updateSettings),
});

const mapStateToProps = state => ({
    initialValues: getUserNameState(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SettingsForm));
