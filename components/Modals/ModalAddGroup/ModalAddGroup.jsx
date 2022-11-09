import React from 'react';
import PropTypes from 'prop-types';
import ModalWrap from 'components/Modals/ModalWrap';
import CommonButton from 'components/Elements/CommonButton';
import AddGroupForm from 'components/Forms/AddGroupForm';


const ModalAddGroup = ({ intl }) => {
    const trigger = <CommonButton icon='add' content={intl.formatMessage({ id: 'newGroup' })}/>;
    return (
        <ModalWrap title='newGroup' icon='users' trigger={trigger}>
            {({ closeModal }) => <AddGroupForm onSubmit={closeModal}/>}
        </ModalWrap>
    );
};

ModalAddGroup.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default ModalAddGroup;
