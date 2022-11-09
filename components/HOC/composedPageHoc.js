import withRedirectIfNotAuth from 'components/HOC/withRedirectIfNotAuth';
import withRedirectIfUser from 'components/HOC/withRedirectIfUser';


export default Page => withRedirectIfUser(withRedirectIfNotAuth(Page));
