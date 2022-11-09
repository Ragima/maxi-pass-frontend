import actions from 'redux/actions/invitationActions';
import userActions from 'redux/actions/userActions';
import usersActions from 'redux/actions/usersActions';
import { CRUD } from 'helpers/redux/reducers';
import _ from 'lodash';

export const initialState = [];

const formatInvitation = invitation => invitation;

const crudActions = {
    index: actions.GET_INVITATIONS_SUCCESS,
    create: actions.CREATE_INVITATION_SUCCESS,
    delete: actions.DELETE_INVITATION_SUCCESS,
    edit: actions.RESEND_INVITATION_SUCCESS,
};

export default (state = initialState, action) => {
    const other = _.get(action, 'other', {});

    switch (action.type) {
    case userActions.GET_HOME_PAGE_SUCCESS: return _.chain(other.invitations).get('data', []).map(formatInvitation).value();
    case usersActions.GET_USERS_SUCCESS: return _.chain(other.invitations).get('data', []).map(formatInvitation).value();
    default: return CRUD(state, action, crudActions, formatInvitation);
    }
};
