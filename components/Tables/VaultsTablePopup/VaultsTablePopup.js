import React, { useEffect } from 'react';
import Popup from "reactjs-popup";
import { Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ModalEditVault from 'components/Modals/ModalEditVault';
import ModalSendReport from 'components/Modals/ModalSendReport';
import { ListBlock } from 'styled_components/Block';
import { Text } from 'styled_components/Text';
import ConfirmModal from 'components/Modals/ConfirmModal';
import { NoDefaultStylesButton } from '../../../styled_components/Button';


const VaultTablePopup = ({ vault, users, intl, isOpenModal, modalOpenMode, modalCloseMode, deleteVault }) => {
   
   useEffect(() => {modalOpenMode},[]);
    
    const clickHandler = () => {    
        modalCloseMode();
    };   

    const CustomButton = React.forwardRef(({ open, ...props }, ref) => (
        <NoDefaultStylesButton ref={ref} {...props} type="button">
            <Icon
                name='list ul'
                circular
                color='blue'
                inverted
                link
            />
        </NoDefaultStylesButton>
    ));

    return (
        <Popup    
            trigger={open => <CustomButton open={open} />}
            position="right center"
            keepTooltipInside="body"
            on='click'
            closeOnDocumentClick={isOpenModal}            
        >
            <>
                <ModalSendReport
                    modalOpenMode={modalOpenMode}
                    data={vault}
                    users={users}                    
                    type='vault'
                    trigger={(
                        <ListBlock onClick={clickHandler}>
                            <Icon name='file' color='blue' circular inverted />
                            <Text inverted>{intl.formatMessage({ id: 'sendStructure' })}</Text>
                        </ListBlock>
                    )}
                />
                <ModalEditVault
                 modalOpenMode={modalOpenMode}
                    vault={vault}
                    trigger={(
                        <ListBlock onClick={clickHandler}>
                            <Icon name='pencil' color='blue' circular inverted />
                            <Text inverted>{intl.formatMessage({ id: 'edit' })}</Text>
                        </ListBlock>
                    )}
                />
                <ConfirmModal
                    trigger={(
                        <ListBlock onClick={clickHandler}>
                            <Icon name='delete' color='red' circular inverted />
                            <Text inverted>{intl.formatMessage({ id: 'delete' })}</Text>
                        </ListBlock>
                    )}
                    callback={() => deleteVault({ id: vault.id })}
                />
            </>
        </Popup>
    );
};

VaultTablePopup.propsTypes = {
    vault: PropTypes.object.isReqired,
    users: PropTypes.array.isReqired,
    isOpenModal: PropTypes.object.isReqired,
    modalOpenMode: PropTypes.func.isRequired,
    modalCloseMode: PropTypes.func.isRequired,
    deleteVaultntl: PropTypes.func.isRequired,
};

export default VaultTablePopup;
