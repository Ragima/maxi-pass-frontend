import init, { getInitialData } from 'helpers/initialize/initialize';

jest.mock('helpers/redux/actions');
import { client, server } from "helpers/redux/actions";

describe('initialize', () => {
    it('should return true', async () => {
        server.mockImplementation(() => { return async () => { return {}; }; });
        expect(await init({})).toBeTruthy();
    });
    it('should return true if ctx is absent', async () => {
        client.mockImplementation(() => { return async () => { return {}; }; });
        expect(await init()).toBeTruthy();
    });
    it('should continue if error', async () => {
        client.mockImplementation(() => { return async () => { throw new Error('sd'); }; });
        expect(await init()).toBeTruthy();
    });
});

describe('getInitialData', () => {
    it('should return true if server actions', async () => {
        const component = {};
        server.mockImplementation(() => { return async () => { return {}; }; });
        getInitialData(component, [{}], [{}]);
        expect(await component.getInitialProps({ isServer: true, store: { dispatch: jest.fn() } })).toBeTruthy();
    });
    it('should return true if client actions', async () => {
        const component = {};
        client.mockImplementation(() => { return async () => { return {}; }; });
        getInitialData(component, [{}], [{}]);
        expect(await component.getInitialProps({ isServer: false, store: { dispatch: jest.fn() } })).toBeTruthy();
    });
    it('should return undefined and call afterFunc if client actions', async () => {
        const component = {};
        const func = jest.fn();
        client.mockImplementation(() => { return async () => { return {}; }; });
        getInitialData(component, [{}], undefined, func);
        expect(await component.getInitialProps({ isServer: false, store: { dispatch: jest.fn() } })).toEqual(undefined);
        expect(func).toBeCalled();
    });
    it('should return value and call afterFunc if client actions', async () => {
        const component = {};
        const func = jest.fn(() => 'value');
        client.mockImplementation(() => { return async () => { return {}; }; });
        getInitialData(component, [{}], undefined, func);
        expect(await component.getInitialProps({ isServer: false, store: { dispatch: jest.fn() } })).toEqual('value');
        expect(func).toBeCalled();
    });
    it('should continue if error', async () => {
        const component = {};
        client.mockImplementation(() => { return async () => { throw new Error('sd'); }; });
        getInitialData(component, [{}], [{}]);
        expect(await component.getInitialProps({ isServer: false, store: { dispatch: jest.fn() } })).toBeTruthy();
    });
});
