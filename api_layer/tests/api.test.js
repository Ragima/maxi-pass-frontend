jest.mock('api_layer/index');
import { apiInstance } from 'api_layer/index';

jest.mock('api_layer/index');

const { apiCreator } = jest.requireActual('api_layer/index');


describe('api_layer', () => {
    beforeEach(() => {
        apiInstance.get.mockImplementation((url, { params, auth }) => ({ url, params, auth }));
        apiInstance.post.mockImplementation((url, data, { auth }) => ({ url, data, auth }));
        apiInstance.delete.mockImplementation((url, { params, auth }) => ({ url, params, auth }));
        apiInstance.put.mockImplementation((url, data, { auth }) => ({ url, data, auth }));
    });
    it('should update for get request', async () => {
        const api = apiCreator(apiInstance);
        expect(await api.get('/url')('data', 'auth')).toEqual({ url: '/url', params: 'data', auth: 'auth' });
    });
    it('should update for post request', async () => {
        const api = apiCreator(apiInstance);
        expect(await api.post('/url')('data', 'auth')).toEqual({ url: '/url', data: 'data', auth: 'auth' });
    });
    it('should update for put request', async () => {
        const api = apiCreator(apiInstance);
        expect(await api.put('/url')('data', 'auth')).toEqual({ url: '/url', data: 'data', auth: 'auth' });
    });
    it('should update for delete request', async () => {
        const api = apiCreator(apiInstance);
        expect(await api.delete('/url')('data', 'auth')).toEqual({ url: '/url', params: 'data', auth: 'auth' });
    });
});
