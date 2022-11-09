import { createSelector } from 'reselect';
import roles from 'constants/userRoles';
import _ from 'lodash';

export const getUserState = state => state.user;

export const getUserEmailState = createSelector(
    getUserState,
    user => user.email,
);

export const getLanguageState = createSelector(
    getUserState,
    user => _.get(user, 'locale', 'en'),
);

export const getTeamNameState = createSelector(
    getUserState,
    user => user.team_name,
);

export const getOTPRequiredState = createSelector(
    getUserState,
    user => user.otp_required,
);

export const getPassExpiredState = createSelector(
    getUserState,
    user => user.password_expired,
);

export const getUserNameState = createSelector(
    getUserState,
    user => _.pick(user, ['first_name', 'last_name', 'name']),
);

export const getUserRoleState = createSelector(
    getUserState,
    user => (user.lead ? roles.admin : user.role_id),
);

export const getIsAdminState = createSelector(
    getUserState,
    user => (user.role_id === roles.admin),
);

export const getUserLeadState = createSelector(
    getUserState,
    user => user.lead,
);

export const getUserNameEmailState = createSelector(
    getUserState,
    user => ({ ...user, nameEmail: user.name && user.email ? `${user.name}\n${user.email}` : undefined }),
);

export const getIsSignInState = createSelector(
    getUserState,
    user => user.isSignIn,
);
