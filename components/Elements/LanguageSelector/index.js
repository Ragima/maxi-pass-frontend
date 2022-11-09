import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import { getLanguageState } from 'redux/selectors/userSelectors';
import actions from 'redux/actions/userActions';
import { client } from 'helpers/redux/actions';
import LanguageSelector from './LanguageSelector';

const mapStateToProps = state => ({
    language: getLanguageState(state),
});

const mapDispatchToProps = dispatch => ({
    updateSettings: client(dispatch, actions.updateSettings),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(LanguageSelector));
