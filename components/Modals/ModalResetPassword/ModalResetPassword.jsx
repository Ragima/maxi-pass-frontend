import React from 'react';
import PropTypes from 'prop-types';
import ModalWrap from 'components/Modals/ModalWrap';
import { Flex } from 'styled_components/Flexbox';
import ResetPasswordForm from 'components/Forms/ResetPasswordForm';


const ModalResetPassword = ({ intl }) => {
    const trigger = <Flex width='auto'><a style={{ cursor: 'pointer' }}>{intl.formatMessage({ id: 'forgotPassword' })}</a></Flex>;
    return (
        <ModalWrap title='resetPassword' trigger={trigger}>
            {({ closeModal }) => <ResetPasswordForm onSubmit={closeModal}/>}
        </ModalWrap>
    );
};

ModalResetPassword.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default ModalResetPassword;
