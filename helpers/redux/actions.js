export const server = (ctx, action) => payload => new Promise((resolve, reject) => ctx.store.dispatch(action({ payload, resolve, reject, ctx })));

export const client = (dispatch, action) => payload => new Promise((resolve, reject) => dispatch(action({ payload, resolve, reject, ctx: {} })));
