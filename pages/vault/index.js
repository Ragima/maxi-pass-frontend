import withIntl from 'components/HOC/withIntl';
import composedPageHoc from 'components/HOC/composedPageHoc';
import { connect } from "react-redux";
import { getVaultByIdState } from 'redux/selectors/vaultsSelectors';
import { getUsersByVaultIdState, getUsersWithoutVaultIdState } from 'redux/selectors/usersSelectors';
import { getGroupsByVaultIdState, getGroupsWithoutVaultIdState } from 'redux/selectors/groupsSelectors';
import vaultActions from 'redux/actions/vaultActions';
import linkActions from 'redux/actions/linkActions';
import { getInitialData, runAction } from 'helpers/initialize/initialize';
import { getCtxQuery } from 'helpers/data/dataTransform';
import { client } from 'helpers/redux/actions';
import { redirect } from 'helpers/auth/redirect';
import Vault from 'pages_components/Vault';
import { getIsAdminState } from "../../redux/selectors/userSelectors";

export const afterFunc = async (ctx) => {
    const query = getCtxQuery(ctx);
    try {
        await runAction(ctx, vaultActions.getVault, true);
        return query;
    } catch {
        redirect(`/vault_items/${query.id}`, ctx);
    }
};

getInitialData(Vault, [], [], afterFunc);

const mapStateToProps = (state, props) => ({
    vault: getVaultByIdState(state, props),
    users: getUsersByVaultIdState(state, props),
    groups: getGroupsByVaultIdState(state, props),
    unrelatedGroups: getGroupsWithoutVaultIdState(state, props),
    unrelatedUsers: getUsersWithoutVaultIdState(state, props),
    isAdmin: getIsAdminState(state, props),
});

const mapDispatchToProps = dispatch => ({
    addGroupVault: client(dispatch, linkActions.linkGroupVault),
    addUserVault: client(dispatch, linkActions.linkUserVault),
    removeGroupVault: client(dispatch, linkActions.unlinkGroupVault),
    removeUserVault: client(dispatch, linkActions.unlinkUserVault),
    deleteVault: client(dispatch, vaultActions.deleteVault),
});

export default connect(mapStateToProps, mapDispatchToProps)(composedPageHoc(withIntl(Vault)));
