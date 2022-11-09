import composedPageHoc from 'components/HOC/composedPageHoc';
import withIntl from 'components/HOC/withIntl';
import { connect } from "react-redux";
import { getVaultsByGroupIdState, getVaultsWithoutGroupIdState } from 'redux/selectors/vaultsSelectors';
import { getUsersByGroupIdState, getUsersWithoutGroupIdState } from 'redux/selectors/usersSelectors';
import { getGroupsByGroupIdState, getGroupsWithoutParentGroup, getGroupByIdState } from 'redux/selectors/groupsSelectors';
import groupActions from 'redux/actions/groupActions';
import linkActions from 'redux/actions/linkActions';
import { getInitialData } from 'helpers/initialize/initialize';
import { getCtxQuery } from 'helpers/data/dataTransform';
import { client } from 'helpers/redux/actions';
import Group from 'pages_components/Group';

getInitialData(Group, [], [groupActions.getGroup], getCtxQuery);

const mapStateToProps = (state, props) => ({
    group: getGroupByIdState(state, props),
    users: getUsersByGroupIdState(state, props),
    groups: getGroupsByGroupIdState(state, props),
    vaults: getVaultsByGroupIdState(state, props),
    unrelatedGroups: getGroupsWithoutParentGroup(state, props),
    unrelatedUsers: getUsersWithoutGroupIdState(state, props),
    unrelatedVaults: getVaultsWithoutGroupIdState(state, props),
});

const mapDispatchToProps = dispatch => ({
    addGroupUser: client(dispatch, linkActions.linkGroupUser),
    addGroupVault: client(dispatch, linkActions.linkGroupVault),
    createInnerGroup: client(dispatch, groupActions.createInnerGroup),
    removeGroupUser: client(dispatch, linkActions.unlinkGroupUser),
    removeGroupVault: client(dispatch, linkActions.unlinkGroupVault),
    deleteGroup: client(dispatch, groupActions.deleteGroup),
});

export default connect(mapStateToProps, mapDispatchToProps)(composedPageHoc(withIntl(Group)));
