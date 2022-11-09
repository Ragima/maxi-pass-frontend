import React from 'react';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import configureStore from 'redux/store';
import GlobalStyles from 'styled_components/Global';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import ru from 'react-intl/locale-data/ru';
import locales from 'locales';
import FullLayout from 'components/Layouts/FullLayout';
import { getLanguageState } from 'redux/selectors/userSelectors';
import { ThemeProvider } from 'styled-components';
import { themes } from 'styled_components/styles';
import NotificationsWrap from 'components/NotificationsWrap';
import actions from 'redux/actions/userActions';
import { server } from 'helpers/redux/actions';
import { deleteAuthInfo } from 'helpers/auth/headers';
import routerEvents from 'next-router-events';
import NProgress from 'nprogress';
import Head from 'next/head';

addLocaleData([...en, ...ru]);

NProgress.configure({ parent: '.pushable', easing: 'ease', speed: 300, minimum: 0.4 });

routerEvents.on('routeChangeStart', NProgress.start);
routerEvents.on('routeChangeComplete', NProgress.done);
routerEvents.on('routeChangeError', NProgress.done);


export class ExampleApp extends App {
    static async getInitialProps(props) {
        const { Component, ctx } = props;
        let pageProps = {};
        if (ctx.isServer) {
            if (ctx.res) {
                ctx.res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            }
            try {
                await server(ctx, actions.validateToken)();
            } catch (error) {
                deleteAuthInfo(ctx);
            }
        }
        
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        
        return { pageProps };
    }

    render() {
        const {
            Component, pageProps, store,
        } = this.props;
        const locale = getLanguageState(store.getState());
        return (
            <Container>
                <Head>
                    <title>MaxiPass</title>
                    <link rel="shortcut icon" href="/static/favicon.ico" />
                </Head>
                <IntlProvider locale={locale} messages={locales[locale].messages}>
                    <Provider store={store}>
                        <ThemeProvider theme={themes.main}>
                            <>
                                <GlobalStyles />
                                <NotificationsWrap/>
                                <FullLayout>
                                    <Component {...pageProps} />
                                </FullLayout>
                            </>
                        </ThemeProvider>
                    </Provider>
                </IntlProvider>
            </Container>
        );
    }
}

export default withRedux(configureStore)(withReduxSaga(ExampleApp));
