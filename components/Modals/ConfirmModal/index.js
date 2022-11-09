import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import actions from '../../../redux/actions/modalModeActions';
import ConfirmModal from './ConfirmModal';

const mapDispatchToProps = dispatch => ({
    modalOpenMode: () => dispatch(actions.setOpenMode()),
});

export default connect(null,mapDispatchToProps)(injectIntl(ConfirmModal));
