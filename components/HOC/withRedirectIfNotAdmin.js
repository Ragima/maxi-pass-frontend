import React from 'react';
import { getIsAdminState } from 'redux/selectors/userSelectors';
import { redirect } from 'helpers/auth/redirect';

const withRedirectIfNotAdmin = (Page) => {
    return class extends React.Component {
        static async getInitialProps(ctx) {
            let pageProps = {};
            const isAdmin = getIsAdminState(ctx.store.getState());
            if (!isAdmin) {
                redirect('/', ctx);
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

export default withRedirectIfNotAdmin;
