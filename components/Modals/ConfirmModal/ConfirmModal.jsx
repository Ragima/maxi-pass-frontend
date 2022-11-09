import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Confirm } from 'semantic-ui-react';

const ConfirmModal = ({ trigger, callback, content, intl, modalOpenMode}) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => setOpen(!open);
    
    const closeModal = () => {
        setOpen(false);       
        modalOpenMode();
    }

    const handleConfirm = () => {
        callback();
        closeModal();
    };

    return (
        <>
             <div onClick={toggleOpen}>{trigger}</div>
            <Confirm
                centered={false}
                open={open}
                content={content || intl.formatMessage({ id: 'confirmDefaultMessage' })}
                cancelButton={intl.formatMessage({ id: 'cancel' })}
                onConfirm={handleConfirm}
                onCancel={closeModal}
                onClose={closeModal}
            />
        </>
    );
};

ConfirmModal.propTypes = {
    trigger: PropTypes.any.isRequired,
    content: PropTypes.string,
    callback: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
    modalOpenMode: PropTypes.func.isRequired,
};

export default ConfirmModal;
