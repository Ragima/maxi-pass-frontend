import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import vaultItemsActions from 'redux/actions/vaultItemActions';
import { client } from 'helpers/redux/actions';
import CopyMoveList from './CopyMoveList';

const mapDispatchToProps = dispatch => ({
    copyItem: client(dispatch, vaultItemsActions.copyItem),
    moveItem: client(dispatch, vaultItemsActions.moveItem),
});

export default connect(null, mapDispatchToProps)(injectIntl(CopyMoveList));
