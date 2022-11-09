import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import actions from '../../../redux/actions/modalModeActions';
import { getModalModeState } from '../../../redux/selectors/modalModeSelectors';
import VaultTablePopup from './VaultsTablePopup';


const mapStateToProps = state => {
  
  return {
    isOpenModal: getModalModeState(state),
  }};
  
  export const mapDispatchToProps = dispatch => ({
      modalOpenMode: () => dispatch(actions.setOpenMode()),
      modalCloseMode: () => dispatch(actions.setCloseMode()),
  });

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(VaultTablePopup));
