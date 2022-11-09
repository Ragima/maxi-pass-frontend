import React from 'react';
import PropTypes from 'prop-types';
import ModalWrap from 'components/Modals/ModalWrap';
import CommonButton from 'components/Elements/CommonButton';
import UpdateGroupParentForm from 'components/Forms/UpdateGroupParentForm';


const ModalChangeParentGroup = ({ intl, ...rest }) => {
    const trigger = <CommonButton icon='users' content={intl.formatMessage({ id: 'updateParent' })}/>;
    return (
        <ModalWrap title='updateParent' icon='users' trigger={trigger}>
            {({ closeModal }) => <UpdateGroupParentForm onSubmit={closeModal} {...rest}/>}
        </ModalWrap>
    );
};

ModalChangeParentGroup.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default ModalChangeParentGroup;
