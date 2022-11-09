import { client, server } from "helpers/redux/actions";
import groupActions from "redux/actions/groupActions";
import vaultActions from "redux/actions/vaultActions";
import { getCtxQuery } from "helpers/data/dataTransform";

export const runAction = async (ctx, action, withQuery) => {
    const { isServer } = ctx;
    const query = withQuery ? getCtxQuery(ctx) : undefined;
    if (isServer) {
        return server(ctx, action)(query);
    } 
    return client(ctx.store.dispatch, action)(query);
};

export default async (ctx, dispatch) => {
    const actions = [groupActions.getGroups, vaultActions.getVaults];
    for (const action of actions) {
        try {
            await runAction(ctx, action);
        } catch {
            continue;
        }
    }
    return true;
};


export const getInitialData = (Component, actions, queryActions = [], afterFunc) => {
    Component.getInitialProps = async (ctx) => {
        for (const action of actions) {
            try {
                await runAction(ctx, action);
            } catch {
                continue;
            }
        }
        for (const action of queryActions) {
            try {
                await runAction(ctx, action, true);
            } catch {
                continue;
            }
        }
        if (afterFunc) return afterFunc(ctx);
        return true;
    };
};
