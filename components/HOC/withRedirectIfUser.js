import React from 'react';
import { getUserRoleState } from 'redux/selectors/userSelectors';
import roles from 'constants/userRoles';
import userPages from 'constants/userPages';
import { redirect } from '../../helpers/auth/redirect';

const withRedirectIfUser = (Page) => {
    return class extends React.Component {
        static async getInitialProps(ctx) {
            let pageProps = {};
            const { pathname } = ctx;
            const role = getUserRoleState(ctx.store.getState());
            if (role === roles.user && !userPages.includes(pathname)) {
                redirect('/vaults', ctx);
                return {};
            }
            if (Page.getInitialProps) {
                pageProps = await Page.getInitialProps(ctx);
            }
            return pageProps;
        }

        render() {
            return <Page {...this.props}/>;
        }
    };
};

export default withRedirectIfUser;
