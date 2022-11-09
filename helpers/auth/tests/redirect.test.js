import { isAuthenticated, redirectIfAuthenticated, redirectInNotAuthenticated, redirectToHome, redirectToLogin } from "helpers/auth/redirect";
import { updateAuthInfo, deleteAuthInfo } from "helpers/auth/headers";
import Router from 'next/router';

jest.mock('next/router');

const mockServer = (mock) => {
    const ctx = { res: { headers: {}, getHeader: jest.fn(() => []), end: jest.fn(), writeHead: mock } };
    ctx.res.setHeader = jest.fn((key, data) => ctx.res.headers[key] = data);
    return ctx;
};

const authData = { 'access-token': 'asd', client: 1, uid: 4, expiry: '2', 'token-type': 'asd' };

describe('redirect', () => {
    beforeEach(() => {
        process.browser = true;
    });
    it('should return false if auth data is missing on client', () => {
        document.cookie = '';
        expect(isAuthenticated()).toEqual(false);
    });

    it('should return true if auth data is present on client', () => {
        document.cookie = '';
        updateAuthInfo(authData);
        expect(isAuthenticated()).toEqual(true);
    });
    it('should return true if auth data is present on server', () => {
        const ctx = mockServer();
        updateAuthInfo(authData, ctx);
        expect(isAuthenticated(ctx)).toEqual(true);
    });
    it('should return false if auth data is missing on server', () => {
        const ctx = mockServer();
        deleteAuthInfo(ctx);
        expect(isAuthenticated(ctx)).toEqual(false);
    });
    describe('redirectIfAuthenticated', () => {
        let mockRouter;    
        beforeEach(() => {
            process.browser = true;
            mockRouter = jest.fn();
            Router.push.mockImplementationOnce(mockRouter);
        });
        it('should redirect to homepage if authorized on client', () => {
            process.browser = true;
            updateAuthInfo(authData);
            expect(redirectIfAuthenticated()).toEqual(true);
            expect(mockRouter).toBeCalled();
        });
        it('should redirect to homepage if authorized on server', () => {
            process.browser = false;
            const mockWriteHead = jest.fn();
            const ctx = mockServer(mockWriteHead);
            updateAuthInfo(authData, ctx);
            expect(redirectIfAuthenticated(ctx)).toEqual(true);
            expect(mockWriteHead).toBeCalledWith(302, { Location: '/vaults' });
        });
        it('should not redirect to homepage if not authorized on client', () => {
            process.browser = true;
            deleteAuthInfo();
            expect(redirectIfAuthenticated()).toEqual(false);
            expect(mockRouter).not.toBeCalled();
        });
        it('should not redirect to homepage if not authorized on server', () => {
            process.browser = false;
            const mockWriteHead = jest.fn();
            const ctx = mockServer(mockWriteHead);
            deleteAuthInfo(ctx);
            expect(redirectIfAuthenticated(ctx)).toEqual(false);
            expect(mockWriteHead).not.toBeCalledWith(302, { Location: '/vaults' });
        });
    });
    describe('redirectInNotAuthenticated', () => {
        let mockRouter;    
        beforeEach(() => {
            process.browser = true;
            mockRouter = jest.fn();
            Router.push.mockImplementationOnce(mockRouter);
        });
        it('should redirect to login if not authorized on client', () => {
            process.browser = true;
            deleteAuthInfo();
            expect(redirectInNotAuthenticated()).toEqual(true);
            expect(Router.push).toBeCalled();
        });
        it('should redirect to login if not authorized on server', () => {
            process.browser = false;
            const mockWriteHead = jest.fn();
            const ctx = mockServer(mockWriteHead);
            deleteAuthInfo(ctx);
            expect(redirectInNotAuthenticated(ctx)).toEqual(true);
            expect(mockWriteHead).toBeCalledWith(302, { Location: '/login' });
        });
        it('should not redirect to login if authorized on client', () => {
            process.browser = true;
            updateAuthInfo(authData);
            expect(redirectInNotAuthenticated()).toEqual(false);
            expect(mockRouter).not.toBeCalled();
        });
        it('should not redirect to login if authorized on server', () => {
            process.browser = false;
            const mockWriteHead = jest.fn();
            const ctx = mockServer(mockWriteHead);
            updateAuthInfo(authData, ctx);
            expect(redirectInNotAuthenticated(ctx)).toEqual(false);
            expect(mockWriteHead).not.toBeCalledWith(302, { Location: '/login' });
        });
    });
});

describe('redirectToHome', () => {
    let mockRouter;    
    beforeEach(() => {
        process.browser = true;
        mockRouter = jest.fn();
        Router.push.mockImplementationOnce(mockRouter);
    });
    it('should redirect to homepage if on server', () => {
        process.browser = false;
        const mockWriteHead = jest.fn();
        const ctx = mockServer(mockWriteHead);
        redirectToHome(ctx);
        expect(mockWriteHead).toBeCalledWith(302, { Location: '/vaults' });
    });
    it('should redirect to settings if on server if pasword expired', () => {
        process.browser = false;
        const mockWriteHead = jest.fn();
        const ctx = mockServer(mockWriteHead);
        redirectToHome(ctx, { password_expired: true });
        expect(mockWriteHead).toBeCalledWith(302, { Location: '/settings' });
    });
});

describe('redirectToLogin', () => {
    let mockRouter;    
    beforeEach(() => {
        process.browser = true;
        mockRouter = jest.fn();
        Router.push.mockImplementationOnce(mockRouter);
    });
    it('should redirect to login if on server', () => {
        process.browser = false;
        const mockWriteHead = jest.fn();
        const ctx = mockServer(mockWriteHead);
        redirectToLogin(ctx);
        expect(mockWriteHead).toBeCalledWith(302, { Location: '/login' });
    });
    it('should redirect to login with teamName if on server', () => {
        process.browser = false;
        const mockWriteHead = jest.fn();
        const ctx = mockServer(mockWriteHead);
        redirectToLogin(ctx, 'aaa');
        expect(mockWriteHead).toBeCalledWith(302, { Location: '/login/aaa' });
    });
});
