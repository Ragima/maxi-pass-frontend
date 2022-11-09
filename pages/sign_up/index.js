import withIntl from 'components/HOC/withIntl';
import withRedirectIfAuth from 'components/HOC/withRedirectIfAuth';
import SignUp from 'pages_components/SignUp';

export default withRedirectIfAuth(withIntl(SignUp));
