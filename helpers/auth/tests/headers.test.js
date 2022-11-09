import { parseJson, hasAuthInfo, updateAuthInfo, getAuthInfo, formatAuthInfo, authRequest, deleteAuthInfo } from 'helpers/auth/headers';

const authData = { 'access-token': 'asd', client: 1, uid: 4, expiry: '2', 'token-type': 'asd' };
const cookieToken = 'auth-headers=%7B%22access-token%22%3A%22asd%22%2C%22client%22%3A1%2C%22uid%22%3A4%2C%22expiry%22%3A%222%22%2C%22token-type%22%3A%22asd%22%7D';

const mockServer = () => {
    const ctx = { res: { headers: {}, getHeader: jest.fn(() => []) } };
    ctx.res.setHeader = jest.fn((key, data) => ctx.res.headers[key] = data);
    return ctx;
};
describe('headers', () => {
    describe('parseJson', () => {
        it('Should return JSON', () => {
            expect(parseJson('{"a": 1}')).toEqual({ a: 1 });
        });
        it('Should return input', () => {
            expect(parseJson('data')).toBe('data');
        });
    });
    
    describe('hasAuthInfo', () => {
        it('should return false if headers are absent', () => {
            expect(hasAuthInfo(null)).toEqual(false);
        });
        it('should return false if headers has no authKey info', () => {
            expect(hasAuthInfo({ 'access-token': 'asd' })).toEqual(false);
        });
        it('should return true if headers has all authKey info', () => {
            expect(hasAuthInfo(authData)).toEqual(true);
        });
        it('should return true if headers contaim master-key', () => {
            expect(hasAuthInfo({ ...authData, 'master-key': 'asdas' })).toEqual(true);
        });
    });
    
    
    describe('updateAuthInfo', () => {
        it('should return null if headers are absent', () => {
            expect(updateAuthInfo(null)).toEqual(null);
        });
        it('should set client cookies if ctx is not present', () => {
            updateAuthInfo(authData, {});
            expect(document.cookie).toEqual(cookieToken);
        });
        it('should set server cookies if ctx is present', () => {
            const ctx = mockServer();
            updateAuthInfo(authData, ctx);
            expect(ctx.res.headers['Set-Cookie']).toEqual([`${cookieToken}; Path=/`]);
        });
    });
    
    describe('deleteAuthInfo', () => {
        beforeEach(() => {
            document.cookie = '';
        });
        it('should delete auth cookies on client', () => {
            document.cookie = 'auth-headers=23';
            expect(getAuthInfo()).toEqual(23);
            deleteAuthInfo();
            expect(getAuthInfo()).toEqual(undefined);
        });
        it('should delete nothing is there is nothing to delete on server', () => {
            const ctx = mockServer();
            expect(getAuthInfo(ctx)).toEqual(undefined);
            deleteAuthInfo(ctx);
            expect(getAuthInfo(ctx)).toEqual(undefined);
        });
        it('should delete auth cookies on server', () => {
            const ctx = mockServer();
            updateAuthInfo(authData, ctx);
            expect(getAuthInfo(ctx)).toEqual(authData);
            deleteAuthInfo(ctx);
            expect(getAuthInfo(ctx)).toEqual(undefined);
        });
    });
    
    describe('getAuthInfo', () => {
        it('should get client cookies if ctx is not present', () => {
            document.cookie = 'auth-headers=23';
            expect(getAuthInfo({})).toEqual(23);
        });
        it('should get server cookies if ctx is present', () => {
            const ctx = { req: { headers: { cookie: 'auth-headers=hi' } } };
            expect(getAuthInfo(ctx)).toEqual('hi');
        });
    });
    
    describe('authInfoFormat', () => {
        it('should return empty object if there are no token keys', () => {
            expect(formatAuthInfo()).toEqual({});
        });
        it('should return only token keys', () => {
            expect(formatAuthInfo({ ...authData, a: 1, b: 2, c: 3 })).toEqual(authData);
        });
        it('should not update headers if it is absent', () => {
            expect(formatAuthInfo({ ...authData, 'master-key': undefined }, { ...authData, 'master-key': 'sss' })).toEqual({ ...authData, 'master-key': 'sss' });
        });
        it('should update headers if it is present', () => {
            expect(formatAuthInfo({ ...authData, 'master-key': 'sss' }, { ...authData, 'master-key': undefined })).toEqual({ ...authData, 'master-key': 'sss' });
        });
    });
    
    describe('authRequest', () => {
        describe('if success', () => {
            let request;
            beforeEach(() => {
                document.cookie = '';
            });
            it('should set cookies for client and return data', async () => {
                request = jest.fn(async () => ({ data: 'data', headers: authData }));
                expect(await authRequest(request, { payload: '2', ctx: {} })).toEqual('data');
                expect(getAuthInfo()).toEqual(authData);
            });
            it('should set cookies for server and return data', async () => {
                const ctx = mockServer();
                request = jest.fn(async () => ({ data: 'data', headers: authData }));
                expect(await authRequest(request, { payload: '2', ctx })).toEqual('data');
                expect(getAuthInfo(ctx)).toEqual(authData);
            });
        });  
        describe('if error', () => {
            let request;
            beforeEach(() => {
                document.cookie = '';
            });
            it('should set cookies for client and return data', async () => {
                request = jest.fn(async () => { throw { response: { headers: authData } }; });
                try {
                    await authRequest(request, { payload: '2', ctx: {} });
                } catch {
                    expect(getAuthInfo()).toEqual(authData);
                }
            });
            it('should set cookies for server and return data', async () => {
                const ctx = mockServer();
                request = jest.fn(async () => { throw { response: { headers: authData } }; });
                try {
                    await authRequest(request, { payload: '2', ctx });
                } catch {
                    expect(getAuthInfo(ctx)).toEqual(authData);
                }
            });
        });
        describe('if error 401', () => {
            let request;
            beforeEach(() => {
                document.cookie = '';
            });
            it('should delete cookies for client', async () => {
                document.cookie = cookieToken;
                request = jest.fn(async () => { throw { response: { headers: authData, status: 401 } }; });
                try {
                    await authRequest(request, { payload: '2', ctx: {} });
                } catch {
                    expect(getAuthInfo()).toEqual(undefined);
                }
            });
            it('should delete cookies for server', async () => {
                const ctx = mockServer();
                updateAuthInfo(authData, ctx);
                request = jest.fn(async () => { throw { response: { headers: authData, status: 401 } }; });
                try {
                    await authRequest(request, { payload: '2', ctx });
                } catch {
                    expect(getAuthInfo(ctx)).toEqual(undefined);
                }
            });
        });
    });
});
