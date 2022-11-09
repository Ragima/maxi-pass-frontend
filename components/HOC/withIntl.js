import { injectIntl } from 'react-intl';
import React from 'react';

const withIntl = (Page) => {
    const getInitProps = Page.getInitialProps;
    const Component = injectIntl(Page);
    return class extends React.Component {
        static async getInitialProps(ctx) {
            let pageProps = {};
            if (getInitProps) {
                pageProps = await getInitProps(ctx);
            }
            return pageProps;
        }

        render() {
            return <Component {...this.props}/>;
        }
    };
};

export default withIntl;
