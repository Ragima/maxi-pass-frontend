import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import actions from 'redux/actions/vaultItemActions';
import { client } from 'helpers/redux/actions';
import FileInput from './FileInput';

const mapDispatchToProps = dispatch => ({
    getDocument: client(dispatch, actions.getDocument),
});

export default connect(null, mapDispatchToProps)(injectIntl(FileInput));
