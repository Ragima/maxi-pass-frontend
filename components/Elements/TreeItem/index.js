import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import actions from 'redux/actions/groupActions';
import { client } from 'helpers/redux/actions';
import TreeItem from './TreeItem';

const mapDispatchToProps = dispatch => ({
    deleteGroup: client(dispatch, actions.deleteGroup),
});

export default connect(null, mapDispatchToProps)(injectIntl(TreeItem));
