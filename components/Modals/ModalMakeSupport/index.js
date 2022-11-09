import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import vaultActions from 'redux/actions/vaultActions';
import groupActions from 'redux/actions/groupActions';
import usersActions from 'redux/actions/usersActions';
import activityActions from 'redux/actions/activityActions';
import { getUserNameEmailState } from 'redux/selectors/userSelectors';
import { client } from 'helpers/redux/actions';
import ModalMakeSupport from "./ModalMakeSupport";

const mapStateToProps = state => ({
    user: getUserNameEmailState(state),
});

const mapDispatchToProps = dispatch => ({
    generateVaultReport: client(dispatch, vaultActions.generateVaultReport),
    generateGroupReport: client(dispatch, groupActions.generateGroupReport),
    generateUserReport: client(dispatch, usersActions.generateUserReport),
    generateActivityReport: client(dispatch, activityActions.generateActivityReport),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ModalMakeSupport));
