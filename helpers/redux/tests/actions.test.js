import { client, server } from 'helpers/redux/actions';

describe('actions client/server', () => {
    it('server success', async () => {
        const action = jest.fn(({ resolve, payload }) => resolve(payload));
        const ctx = { store: { dispatch: jest.fn(data => data) } };
        const result = await server(ctx, action)('something');
        expect(result).toEqual('something');
        expect(action).toBeCalled();
        expect(ctx.store.dispatch).toBeCalled();
    });
    it('server error', async () => {
        const action = jest.fn(({ reject, payload }) => reject(payload));
        const ctx = { store: { dispatch: jest.fn(data => data) } };
        try {
            await server(ctx, action)('something');
        } catch (error) {
            expect(error).toEqual('something');
        } finally {
            expect(action).toBeCalled();
            expect(ctx.store.dispatch).toBeCalled();
        }
    });
    it('client success', async () => {
        const action = jest.fn(({ resolve, payload }) => resolve(payload));
        const dispatch = jest.fn(data => data);
        const result = await client(dispatch, action)('something');
        expect(result).toEqual('something');
        expect(action).toBeCalled();
        expect(dispatch).toBeCalled();
    });
    it('client error', async () => {
        const action = jest.fn(({ reject, payload }) => reject(payload));
        const dispatch = jest.fn(data => data);
        try {
            await client(dispatch, action)('something');
        } catch (error) {
            expect(error).toEqual('something');
        } finally {
            expect(action).toBeCalled();
            expect(dispatch).toBeCalled();
        }
    });
});
