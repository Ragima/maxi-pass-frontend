import React from 'react';
import PropTypes from 'prop-types';
import ModalWrap from 'components/Modals/ModalWrap';
import EditGroupForm from 'components/Forms/EditGroupForm';
import { Icon } from 'semantic-ui-react';


const ModalEditGroup = ({ group }) => {
    const trigger = <Icon link inverted circular name='pencil' color='blue'/>;
    return (
        <ModalWrap title='editGroup' icon='users' trigger={trigger}>
            {({ closeModal }) => <EditGroupForm onSubmit={closeModal} group={group}/>}
        </ModalWrap>
    );
};

ModalEditGroup.propTypes = {
    group: PropTypes.object.isRequired,
};

export default ModalEditGroup;
