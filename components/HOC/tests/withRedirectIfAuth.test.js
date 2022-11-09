import React from 'react';
import { mountSmart, shallowSmart, mockStore } from "helpers/tests/enzymeHelpers";
import withRedirectIfAuth from 'components/HOC/withRedirectIfAuth';

import { redirectIfAuthenticated } from 'helpers/auth/redirect';

jest.mock('helpers/auth/redirect');

describe('withRedirectIfAuth', () => {
    let HOC;
    beforeEach(async () => {
        const Component = () => <div>Page</div>;
        Component.getInitialProps = async () => 'result';
        HOC = await withRedirectIfAuth(Component);
    });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<HOC/>);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<HOC/>);
        expect(wrap.find('Component')).toHaveLength(2);
    });
    it('should return result of initial props of inner component', async () => {
        const initialProps = await HOC.getInitialProps({});
        mountSmart(<HOC/>);
        expect(initialProps).toEqual('result');
    });
    it('should not return result of initial props of inner component', async () => {
        const Component = () => <div>Page</div>;
        HOC = await withRedirectIfAuth(Component);
        const initialProps = await HOC.getInitialProps({});
        mountSmart(<HOC/>);
        expect(initialProps).toEqual({});
    });
    it('should return empty object if auth data is present', async () => {
        process.browser = true;
        redirectIfAuthenticated.mockImplementationOnce(() => true);
        const initialProps = await HOC.getInitialProps({});
        mountSmart(<HOC/>);
        expect(initialProps).toEqual({});
    });
    it('should return component data if auth data is not present', async () => {
        process.browser = true;
        redirectIfAuthenticated.mockImplementationOnce(() => false);
        const initialProps = await HOC.getInitialProps({});
        mountSmart(<HOC/>);
        expect(initialProps).toEqual('result');
    });
});
