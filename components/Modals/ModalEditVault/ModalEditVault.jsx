import React from 'react';
import PropTypes from 'prop-types';
import ModalWrap from 'components/Modals/ModalWrap';
import EditVaultForm from 'components/Forms/EditVaultForm';

const ModalEditVault = ({ vault, trigger }) => {
    return (
        <ModalWrap title='editVault' icon='users' trigger={trigger}>
            {({ closeModal }) => <EditVaultForm onSubmit={closeModal} vault={vault}/>}
        </ModalWrap>
    );
};

ModalEditVault.propTypes = {
    vault: PropTypes.object.isRequired,
    trigger: PropTypes.any.isRequired,
};

export default ModalEditVault;
