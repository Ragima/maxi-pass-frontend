import React from 'react';
import { mountSmart, shallowSmart, mockStore } from "helpers/tests/enzymeHelpers";
import withIntl from 'components/HOC/withIntl';

describe('withIntl', () => {
    let HOC;
    beforeEach(async () => {
        const Component = () => <div>Page</div>;
        Component.getInitialProps = async () => 'result';
        HOC = await withIntl(Component);
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
        HOC = await withIntl(Component);
        const initialProps = await HOC.getInitialProps({});
        mountSmart(<HOC/>);
        expect(initialProps).toEqual({});
    });
});
