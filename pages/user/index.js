import withIntl from 'components/HOC/withIntl';
import composedPageHoc from 'components/HOC/composedPageHoc';
import { connect } from "react-redux";
import { getVaultsByUserIdState, getVaultsWithoutUserIdState } from 'redux/selectors/vaultsSelectors';
import { getUserByIdState } from 'redux/selectors/usersSelectors';
import { getGroupVaultsState } from 'redux/selectors/relationsSelectors';
import { getGroupsByUserIdState, getGroupsWithoutUserIdState } from 'redux/selectors/groupsSelectors';
import linkActions from 'redux/actions/linkActions';
import usersActions from 'redux/actions/usersActions';
import { getInitialData } from 'helpers/initialize/initialize';
import { getCtxQuery } from 'helpers/data/dataTransform';
import { client } from 'helpers/redux/actions';
import User from 'pages_components/User';

getInitialData(User, [], [usersActions.getUser], getCtxQuery);

const mapStateToProps = (state, props) => ({
    user: getUserByIdState(state, props),
    groups: getGroupsByUserIdState(state, props),
    vaults: getVaultsByUserIdState(state, props),
    unrelatedGroups: getGroupsWithoutUserIdState(state, props),
    unrelatedVaults: getVaultsWithoutUserIdState(state, props),
    groupVaults: getGroupVaultsState(state),
});

const mapDispatchToProps = dispatch => ({
    addGroupUser: client(dispatch, linkActions.linkGroupUser),
    addUserVault: client(dispatch, linkActions.linkUserVault),
    deleteUser: client(dispatch, usersActions.deleteUser),
    removeGroupUser: client(dispatch, linkActions.unlinkGroupUser),
    removeUserVault: client(dispatch, linkActions.unlinkUserVault),
});

export default connect(mapStateToProps, mapDispatchToProps)(composedPageHoc(withIntl(User)));
