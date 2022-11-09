import React from 'react';
import PropTypes from 'prop-types';
import ModalWrap from 'components/Modals/ModalWrap';
import CommonButton from 'components/Elements/CommonButton';
import InviteUserForm from 'components/Forms/InviteUserForm';


const ModalInviteUser = ({ intl }) => {
    const trigger = <CommonButton icon='add' content={intl.formatMessage({ id: 'newInvitation' })}/>;
    return (
        <ModalWrap title='newInvitation' icon='mail' trigger={trigger}>
            {({ closeModal }) => <InviteUserForm onSubmit={closeModal}/>}
        </ModalWrap>
    );
};

ModalInviteUser.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default ModalInviteUser;
