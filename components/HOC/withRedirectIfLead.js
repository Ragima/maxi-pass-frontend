import React from 'react';
import { getUserLeadState } from 'redux/selectors/userSelectors';
import { redirect } from '../../helpers/auth/redirect';

const withRedirectIfLead = (Page) => {
    return class extends React.Component {
        static async getInitialProps(ctx) {
            let pageProps = {};
            const isLead = getUserLeadState(ctx.store.getState());
            if (isLead) {
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

export default withRedirectIfLead;
