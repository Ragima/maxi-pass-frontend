import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import roles from 'constants/userRoles';

const rolesOptions = {
    lead: 'users',
    user: 'user',
};


const UserRoleDropdown = ({ changeUserLeadRole, user, mainId, relation }) => {
    const handleSelect = () => {
        changeUserLeadRole({ id: relation.id, group_id: mainId, user_id: user.id, data: { role: relation.role === 'lead' ? 'user' : 'lead' } });
    };

    return user.role_id !== roles.admin && (
        <Icon
            name={rolesOptions[relation.role]}
            circular
            title={relation.role === 'lead' ? 'Lead' : 'User'}
            color='blue'
            link
            inverted
            onClick={handleSelect}
        />
    );
};

UserRoleDropdown.propTypes = {
    user: PropTypes.object.isRequired,
    relation: PropTypes.object,
    mainId: PropTypes.string.isRequired,
    changeUserLeadRole: PropTypes.func.isRequired,
};


UserRoleDropdown.defaultProps = {
    relation: {},
};

export default UserRoleDropdown;
