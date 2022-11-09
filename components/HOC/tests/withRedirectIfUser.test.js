import React from 'react';
import { mountSmart, shallowSmart, mockStore } from "helpers/tests/enzymeHelpers";
import withRedirectIfUser from 'components/HOC/withRedirectIfUser';

import { redirect } from 'helpers/auth/redirect';

jest.mock('helpers/auth/redirect');

describe('withRedirectIfUser', () => {
    let HOC;
    beforeEach(async () => {
        const Component = () => <div>Page</div>;
        Component.getInitialProps = async () => 'result';
        HOC = await withRedirectIfUser(Component);
    });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<HOC/>);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<HOC/>);
        expect(wrap.find('Component')).toHaveLength(2);
    });
    it('should not redirect user if it is admin and page has no initialProps', async () => {
        const ComponentA = () => <div>Page</div>;
        ComponentA.getInitialProps = null;
        const HOCs = await withRedirectIfUser(ComponentA);
        redirect.mockImplementationOnce(() => {});
        await HOCs.getInitialProps({ store: { getState: () => ({ user: { role_id: 'admin' } }) }, pathname: '/' });
        mountSmart(<HOCs/>);
        expect(redirect).not.toBeCalled();
    });
    it('should not redirect user if it is admin', async () => {
        redirect.mockImplementationOnce(() => {});
        await HOC.getInitialProps({ store: { getState: () => ({ user: { role_id: 'admin' } }) }, pathname: '/' });
        mountSmart(<HOC/>);
        expect(redirect).not.toBeCalled();
    });
    
    it('should redirect user if it is user and pathname is /', async () => {
        redirect.mockImplementationOnce(() => {});
        await HOC.getInitialProps({ store: { getState: () => ({ user: { role_id: 'user' } }) }, pathname: '/' });
        mountSmart(<HOC/>);
        expect(redirect).toBeCalled();
    });
});
