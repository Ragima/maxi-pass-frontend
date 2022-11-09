import React from 'react';
import PropTypes from 'prop-types';
import ModalWrap from 'components/Modals/ModalWrap';
import EditUserForm from 'components/Forms/EditUserForm';
import { Icon } from 'semantic-ui-react';


const ModalEditUser = ({ user, trigger }) => {
    return (
        <ModalWrap title='editUser' icon='users' trigger={trigger}>
            {({ closeModal }) => <EditUserForm onSubmit={closeModal} user={user}/>}
        </ModalWrap>
    );
};

ModalEditUser.propTypes = {
    user: PropTypes.object.isRequired,
    trigger: PropTypes.any.isRequired,
};

export default ModalEditUser;
