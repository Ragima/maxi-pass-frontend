import withRedirectIfNotAuth from 'components/HOC/withRedirectIfNotAuth';
import withIntl from 'components/HOC/withIntl';
import vaultItemActions from 'redux/actions/vaultItemActions';
import { getInitialData, runAction } from 'helpers/initialize/initialize';
import { getCtxQuery } from 'helpers/data/dataTransform';
import { connect } from "react-redux";
import { getVaultByIdState } from 'redux/selectors/vaultsSelectors';
import { getUserRoleState, getUserLeadState } from 'redux/selectors/userSelectors';
import { getVaultItemsByVaultIdState, getVaultItemByIdState } from 'redux/selectors/vaultItemsSelectors';
import { client } from 'helpers/redux/actions';
import VaultItems from 'pages_components/VaultItems';


export const afterFunc = async (ctx) => {
    const query = getCtxQuery(ctx);
    await runAction(ctx, vaultItemActions.getVaultItems, true);
    if (query && query.item_id && query.form) {
        await runAction(ctx, vaultItemActions.getVaultItem, true);
    }
    return query;
};

getInitialData(VaultItems, [], [], afterFunc);

const mapStateToProps = (state, props) => ({
    vault: getVaultByIdState(state, props),
    vault_items: getVaultItemsByVaultIdState(state, props),
    item: getVaultItemByIdState(state, props),
    role: getUserRoleState(state),
    isLead: getUserLeadState(state),
});

const mapDispatchToProps = dispatch => ({
    deleteVaultItem: client(dispatch, vaultItemActions.deleteVaultItem),
});


export default connect(mapStateToProps, mapDispatchToProps)(withRedirectIfNotAuth(withIntl(VaultItems)));
