import { apiInstance } from 'api_layer';
import MockAdapter from 'axios-mock-adapter';

const authData = { 'access-token': 'asd', client: 1, uid: 4, expiry: '2', 'token-type': 'asd' };

describe('apiInstance', () => {
    it('should update headers if auth is present', async () => {
        const mock = new MockAdapter(apiInstance);
        await mock.onGet('/asd').reply(200, 'hi');
        const request = await apiInstance.interceptors.request.handlers[0].fulfilled({ auth: authData, otherData: {} });
        expect(request).toEqual({ headers: { common: authData }, otherData: {} });
    });
    it('should not update headers if auth is not present', async () => {
        const mock = new MockAdapter(apiInstance);
        await mock.onGet('/asd').reply(200, 'hi');
        const request = await apiInstance.interceptors.request.handlers[0].fulfilled({ otherData: {} });
        expect(request).toEqual({ headers: { common: {} }, otherData: {} });
    });
});
