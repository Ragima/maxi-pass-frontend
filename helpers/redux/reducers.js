import _ from 'lodash';

export const editAction = (state, payload, format) => _.map(state, item => (item.id === payload.id ? { ...item, ...format(payload) } : item));
export const deleteAction = (state, payload) => _.filter(state, item => item.id !== payload.id);
export const createAction = (state, payload, format) => [...state, format(payload)];
export const showAction = (state, payload, format) => (_.some(state, item => item.id === payload.id) ? editAction(state, payload, format) : createAction(state, payload, format));

export const chooseAction = (actions, type, action) => _.includes(_.compact(_.castArray(actions[type])), action.type);

export const CRUD = (state, action, actions, format) => {
    const payload = _.get(action, 'payload', {});
    if (chooseAction(actions, 'index', action)) return _.map(payload, format);
    if (chooseAction(actions, 'show', action)) return showAction(state, payload, format);
    if (chooseAction(actions, 'create', action)) return createAction(state, payload, format);
    if (chooseAction(actions, 'delete', action)) return deleteAction(state, payload);
    if (chooseAction(actions, 'edit', action)) return editAction(state, payload, format);
    return state;
};
