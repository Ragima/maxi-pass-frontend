import React from 'react';
import { mountSmart, shallowSmart, mockStore } from "helpers/tests/enzymeHelpers";
import withRedirectIfNotAdmin from 'components/HOC/withRedirectIfNotAdmin';

import { redirect } from 'helpers/auth/redirect';

jest.mock('helpers/auth/redirect');

describe('withRedirectIfNotAdmin', () => {
    let HOC;
    beforeEach(async () => {
        const Component = () => <div>Page</div>;
        Component.getInitialProps = async () => 'result';
        HOC = await withRedirectIfNotAdmin(Component);
    });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<HOC/>);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<HOC/>);
        expect(wrap.find('Component')).toHaveLength(2);
    });
    it('should not return result of initial props of inner component', async () => {
        const Component = () => <div>Page</div>;
        HOC = await withRedirectIfNotAdmin(Component);
        const initialProps = await HOC.getInitialProps({ store: { getState: () => ({ user: { role_id: 'admin' } }) } });
        mountSmart(<HOC/>);
        expect(initialProps).toEqual({});
    });
    it('should not redirect user if it is admin', async () => {
        redirect.mockImplementationOnce(() => {});
        await HOC.getInitialProps({ store: { getState: () => ({ user: { role_id: 'admin' } }) } });
        mountSmart(<HOC/>);
        expect(redirect).not.toBeCalled();
    });
    
    it('should redirect user if not admin', async () => {
        redirect.mockImplementationOnce(() => {});
        await HOC.getInitialProps({ store: { getState: () => ({ user: { role_id: 'user' } }) } });
        mountSmart(<HOC/>);
        expect(redirect).toBeCalled();
    });
});
