import { injectIntl } from 'react-intl';
import ModalWrap from './ModalWrap';
import actions from '../../../redux/actions/modalModeActions';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
    modalOpenMode: () => dispatch(actions.setOpenMode()),
});

export default connect(null,mapDispatchToProps)(injectIntl(ModalWrap));
