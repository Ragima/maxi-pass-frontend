import React from 'react';
import { mountSmart, shallowSmart, mockStore, resizeTo } from "helpers/tests/enzymeHelpers";
import Login, { afterFunc } from 'pages/login';

describe('Login', () => {
    const store = mockStore({});
    it('should match snapshot', () => {
        const wrap = shallowSmart(<Login/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<Login />, store);
        expect(wrap.find('Login')).toHaveLength(1);
    });
    it('should render text if computer size', () => {
        const wrap = mountSmart(<Login />, store);
        expect(wrap.find('Text')).toHaveLength(2);
    });
    it('should not render text if mobile size', () => {
        resizeTo('mobile');
        const wrap = mountSmart(<Login />, store);
        expect(wrap.find('Text')).toHaveLength(1);
    });
});

describe('afterFunc', () => {
    it('should call action is query is present', () => {
        const ctx = {
            store: {
                dispatch: jest.fn(),
            },
            query: { account_confirmation_success: '1231' },
        };
        afterFunc(ctx);
        expect(ctx.store.dispatch).toBeCalled();
    });
    it('should call action is query unlock is present', () => {
        const ctx = {
            store: {
                dispatch: jest.fn(),
            },
            query: { unlock: '1231' },
        };
        afterFunc(ctx);
        expect(ctx.store.dispatch).toBeCalled();
    });
    it('should not call action is query is not present', () => {
        const ctx = {
            store: {
                dispatch: jest.fn(),
            },
            query: {},
        };
        afterFunc(ctx);
        expect(ctx.store.dispatch).not.toBeCalled();
    });
});
