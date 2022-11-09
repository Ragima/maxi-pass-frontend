import React from 'react';
import PropTypes from 'prop-types';
import ModalWrap from 'components/Modals/ModalWrap';
import CommonButton from 'components/Elements/CommonButton';
import AddVaultForm from 'components/Forms/AddVaultForm';

const ModalAddVault = ({ intl }) => {
    const trigger = <CommonButton icon='add' content={intl.formatMessage({ id: 'newVault' })}/>;
    return (
        <ModalWrap title='newVault' icon='archive' trigger={trigger}>
            {({ closeModal }) => <AddVaultForm onSubmit={closeModal}/>}
        </ModalWrap>
    );
};

ModalAddVault.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default ModalAddVault;
