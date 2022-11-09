import withRedirectIfNotAdmin from 'components/HOC/withRedirectIfNotAdmin';
import withRedirectIfNotAuth from 'components/HOC/withRedirectIfNotAuth';
import { getInitialData, runAction } from 'helpers/initialize/initialize';
import actions from 'redux/actions/activityActions';
import withIntl from 'components/HOC/withIntl';
import ActivitiesSettings from 'pages_components/ActivitiesSettings';

export const afterFunc = async (ctx) => {
    try {
        const data = await runAction(ctx, actions.getActivitiesSettings);
        return { data };
    } catch {
        return { data: [] };
    }
};

getInitialData(ActivitiesSettings, [], [], afterFunc);

export default withRedirectIfNotAuth(withRedirectIfNotAdmin(withIntl(ActivitiesSettings)));
