import _ from 'lodash';
import { shallow, mount } from "enzyme";
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import React from 'react';
import configureStore from "redux-mock-store";
import i18nConfig from 'locales';
import { ThemeProvider } from 'styled-components';
import { themes } from 'styled_components/styles';
import { Responsive } from 'semantic-ui-react';
import { testSaga } from 'redux-saga-test-plan';

export { act } from 'react-dom/test-utils';

jest.mock('helpers/data/validations', () => ({
    parentGroup: jest.fn(() => false),
    updateGroup: jest.fn(() => false),
    inviteUser: jest.fn(() => false),
}));


export const shallowSmart = (component, store, context) => {
    console.error = jest.fn();
    const core = (
        <IntlProvider locale="en" messages={i18nConfig.en.messages}>
            <ThemeProvider theme={themes.main}>
                {component}
            </ThemeProvider>
        </IntlProvider>
    );
    if (store) {
        return shallow(
            <Provider store={store}>
                {core}
            </Provider>, context);
    }
    return shallow(core, context);
};

export const mountSmart = (component, store, options) => {
    console.error = jest.fn();
    const core = (
        <IntlProvider locale="en" messages={i18nConfig.en.messages}>
            <ThemeProvider theme={themes.main}>
                {component}
            </ThemeProvider>        
        </IntlProvider>
    );
    if (store) {
        return mount(
            <Provider store={store}>
                {core}
            </Provider>, options);
    }
    return mount(core, options);
};

export const checkDispatchedActions = (store, actions) => {
    const actionsInStore = store.getActions().map(action => action.type);
    return _.isEqual(actionsInStore.sort(), actions.sort());
};

export const watchersTests = (data, mainWatchers) => {
    it('should watchers', () => {
        let begin = testSaga(mainWatchers);
        _.each(data, ([action, saga]) => {
            begin = begin
                .next()
                .takeLatest(action, saga);
        });
        begin.finish().isDone();
    });
};

export const mockStore = configureStore();

const sizes = {
    mobile: Responsive.onlyMobile.minWidth,
    tablet: Responsive.onlyTablet.minWidth,
    computer: Responsive.onlyComputer.minWidth,
};

export const resizeTo = (type) => {
    global.window.innerWidth = sizes[type];
    global.window.dispatchEvent(new Event('resize'));
};
