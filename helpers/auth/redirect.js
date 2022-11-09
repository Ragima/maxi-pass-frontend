import Router from 'next/router';
import _ from 'lodash';
import { getAuthInfo, hasAuthInfo, deleteAuthInfo } from "./headers";

export const isAuthenticated = ctx => hasAuthInfo(getAuthInfo(ctx));

export const redirectIfAuthenticated = (ctx) => {
    if (isAuthenticated(ctx)) {
        redirect("/vaults", ctx);
        return true;
    }
    return false;
};

export const redirectInNotAuthenticated = (ctx) => {
    if (!isAuthenticated(ctx)) {
        redirect("/login", ctx);
        return true;
    }
    return false;
};

export const redirect = (target, ctx = {}) => {
    if (!process.browser) {
        ctx.res.writeHead(302, { Location: target });
        ctx.res.end();
    } else {
        Router.push(target);
    }
};

export const redirectToHome = (ctx, data) => {
    const shouldChangePass = _.get(data, 'password_expired', false);
    const target = !shouldChangePass ? '/vaults' : '/settings'; 
    redirect(target, ctx);
};

export const redirectToLogin = (ctx, teamName) => {
    const target = teamName ? `/login/${teamName}` : '/login';
    deleteAuthInfo(ctx);
    redirect(target, ctx);
};
