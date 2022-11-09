import React from 'react';
import PropTypes from 'prop-types';
import ModalWrap from 'components/Modals/ModalWrap';
import { Flex } from 'styled_components/Flexbox';
import ResetAuthForm from 'components/Forms/ResetAuthForm';


const ModalResetAuth = ({ intl }) => {
    const trigger = <Flex width='auto'><a style={{ cursor: 'pointer' }}>{intl.formatMessage({ id: 'resetAuthMessage' })}</a></Flex>;
    return (
        <ModalWrap title='resetAuth' trigger={trigger}>
            {({ closeModal }) => <ResetAuthForm onSubmit={closeModal}/>}
        </ModalWrap>
    );
};

ModalResetAuth.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default ModalResetAuth;
