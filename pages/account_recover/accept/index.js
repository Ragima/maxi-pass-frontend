import withIntl from 'components/HOC/withIntl';
import withRedirectIfAuth from 'components/HOC/withRedirectIfAuth';
import { getInitialData } from 'helpers/initialize/initialize';
import { getCtxQuery } from 'helpers/data/dataTransform';
import Accept from 'pages_components/Accept';

getInitialData(Accept, [], [], getCtxQuery);

export default withRedirectIfAuth(withIntl(Accept));
