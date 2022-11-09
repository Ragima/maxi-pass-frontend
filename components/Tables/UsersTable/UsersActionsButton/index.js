import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { getIsAdminState, getUserLeadState } from "redux/selectors/userSelectors";
import { client } from "helpers/redux/actions";
import actions from "redux/actions/usersActions";
import action from 'redux/actions/modalModeActions';
import UsersActionsButton from "./UsersActionsButton";
import { getModalModeState } from 'redux/selectors/modalModeSelectors';

const mapStateToProps = state => ({
    isAdmin: getIsAdminState(state),
    isLead: getUserLeadState(state),
    isOpenModal: getModalModeState(state),
});

const mapDispatchToProps = dispatch => ({
    deleteUser: client(dispatch, actions.deleteUser),
    changeUserRole: client(dispatch, actions.changeRole),
    changeRoleSupport: client(dispatch, actions.changeRoleSupport),
    toggleBlock: client(dispatch, actions.toggleBlock),
    modalOpenMode: () => dispatch(action.setOpenMode()),
    modalCloseMode: () => dispatch(action.setCloseMode()),
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(UsersActionsButton));
