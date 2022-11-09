import React, { useState } from 'react';
import { Modal, Icon } from 'semantic-ui-react';
import { HeaderBackground } from 'styled_components/Background';
import { HeaderContent } from 'styled_components/Content';
import { StyledModal } from 'styled_components/Modal';
import { Text } from 'styled_components/Text';
import PropTypes from 'prop-types';

const ModalWrap = ({ children, title, intl, trigger, modalOpenMode, ...rest }) => {
    const [open, setOpen] = useState(false);

    
    const closeModal = () => {
        setOpen(false);
        modalOpenMode();        
    };

    const openModal = () => setOpen(true);

    return (
        <StyledModal
            trigger={trigger}
            centered={false}
            open={open}
            onOpen={openModal}
            {...rest}
        >
            <Modal.Header>
                <HeaderBackground>
                    <HeaderContent>
                        <Text size='22'>{intl.formatMessage({ id: title })}</Text>
                        <Icon name='delete' link inverted onClick={closeModal}/>
                    </HeaderContent>
                </HeaderBackground>
            </Modal.Header>
            <Modal.Content>
                {children({ closeModal })}
            </Modal.Content>
        </StyledModal>
    );
};

ModalWrap.propTypes = {
    children: PropTypes.any,
    trigger: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired,
    intl: PropTypes.object.isRequired,
    relative: PropTypes.bool,
    modalOpenMode: PropTypes.func.isRequired,
};

export default ModalWrap;
