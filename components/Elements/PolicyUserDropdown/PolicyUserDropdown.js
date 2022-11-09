import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

const PolicyUserDropdown = ({ changeVaultPolicy, user, mainId, relation }) => {
    const handleSelect = () => {
        changeVaultPolicy({ id: relation.id, vault_id: mainId, user_id: user.id, data: { vault_writer: !relation.vault_writer } });
    };

    return (
        <Icon
            title={relation.vault_writer ? 'Writer' : 'Reader'}
            name={relation.vault_writer ? 'edit' : 'book'}
            inverted
            circular
            color='blue'
            link
            onClick={handleSelect}
        />
    );
};

PolicyUserDropdown.propTypes = {
    user: PropTypes.object.isRequired,
    mainId: PropTypes.string.isRequired,
    relation: PropTypes.object,
    changeVaultPolicy: PropTypes.func.isRequired,
};

PolicyUserDropdown.defaultProps = {
    relation: {},
};

export default PolicyUserDropdown;
