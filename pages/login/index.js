import withIntl from 'components/HOC/withIntl';
import withRedirectIfAuth from 'components/HOC/withRedirectIfAuth';
import actions from 'redux/actions/notifyActions';
import { getCtxQuery } from 'helpers/data/dataTransform';
import { getInitialData } from 'helpers/initialize/initialize';
import _ from 'lodash';
import Login from 'pages_components/Login';

export const afterFunc = async (ctx) => {
    const query = getCtxQuery(ctx);
    const showNotify = _.get(query, 'account_confirmation_success', false);
    const showUnlockNotify = _.get(query, 'unlock', false);
    if (showNotify) ctx.store.dispatch(actions.showNotify({ payload: { type: 'success', message: 'successRegister' } }));
    if (showUnlockNotify) ctx.store.dispatch(actions.showNotify({ payload: { type: 'success', message: 'unlocked' } }));
    return query;
};

getInitialData(Login, [], [], afterFunc);

export default withRedirectIfAuth(withIntl(Login));
