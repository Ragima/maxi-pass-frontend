import { setCookie, parseCookies, destroyCookie } from 'nookies';
import _ from 'lodash';
import { redirect } from 'helpers/auth/redirect';

export const parseJson = (data) => {
    let headers;
    try {
        headers = JSON.parse(data);
    } catch (error) {
        headers = data;
    }
    return headers;
};

const authInfoKeysWithouMaster = ['access-token', 'client', 'uid', 'expiry', 'token-type'];
const authInfoKeys = [...authInfoKeysWithouMaster, 'master-key'];

export const hasAuthInfo = (headers) => {
    return !!(headers && _.every(authInfoKeysWithouMaster, key => headers[key]));
};

export const updateAuthInfo = (headers, ctx = {}) => {
    if (!hasAuthInfo(headers)) return null;

    const oldAuthToken = getAuthInfo(ctx);
    const authToken = formatAuthInfo(headers, oldAuthToken);
    setCookie(ctx, 'auth-headers', JSON.stringify(authToken), { path: '/' });
};

export const getAuthInfo = (ctx) => {
    return parseJson(parseCookies(ctx, { path: '/' })['auth-headers']);
};

export function formatAuthInfo(newHeaders, oldHeaders = {}) {
    return _.reduce(authInfoKeys, (acc, cur) => ({ ...acc, [cur]: _.get(newHeaders, cur, acc[cur]) }), oldHeaders);
}

export function deleteAuthInfo(ctx) {
    return destroyCookie(ctx, 'auth-headers', { path: '/' });
}

export const authRequest = async (request, { payload, ctx }) => {
    const authInfo = getAuthInfo(ctx);
    try {
        const { data, headers } = await request(payload, authInfo);
        updateAuthInfo(headers, ctx);
        return data;   
    } catch (error) {
        const headers = _.get(error, 'response.headers');
        const message = _.get(error, 'response.data.errors');
        if (_.get(error, 'response.status') === 401 && getAuthInfo(ctx)) {
            deleteAuthInfo(ctx);
            redirect('/login', ctx);
        } else {
            updateAuthInfo(headers, ctx);
        }
        throw message;
    }
}; 
