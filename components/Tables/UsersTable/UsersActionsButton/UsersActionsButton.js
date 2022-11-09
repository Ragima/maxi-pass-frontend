import React, { useEffect } from 'react';
import { Icon } from "semantic-ui-react";
import _ from "lodash";
import Popup from "reactjs-popup";
import PropTypes from "prop-types";
import ConfirmModal from "components/Modals/ConfirmModal";
import { ListBlock } from "styled_components/Block";
import { Text } from "styled_components/Text";
import roles from "constants/userRoles";
import ModalSendReport from "components/Modals/ModalSendReport";
import ModalEditUser from "components/Modals/ModalEditUser";
import UsersRenderRoleAdmin from "components/Tables/UsersTable/UsersRenderRoleAdmin/UsersRenderRoleAdmin";
import { NoDefaultStylesButton } from '../../../../styled_components/Button';

const UsersActionsButton = (props) => {
    const { users, user, intl, isLead, isAdmin, deleteUser, changeUserRole, changeRoleSupport, toggleBlock, isOpenModal, modalOpenMode, modalCloseMode } = props;
    const handleToggleBlock = () => toggleBlock({ id: user.id });
    const handleDeleteUser = () => deleteUser({ id: user.id });
    const handleChangeUserRole = () => changeUserRole({ role_id: roles.admin, id: user.id });
    const handleChangeRoleSupport = () => changeRoleSupport({ role_id: roles.support, id: user.id });
    const usersReport = _.map(users, user => ({
        ...user,
        nameEmail: user.name && user.email ? `${user.name}\n${user.email}` : undefined,
    }));

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

    return (<>
        {
            user.role_id !== roles.admin && user.role_id !== roles.support && <>
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
                            data={usersReport}
                            users={users}
                            type='user'
                            trigger={(
                                <ListBlock onClick={clickHandler}>
                                    <Icon name='file' color='blue' circular inverted/>
                                    <Text inverted>{intl.formatMessage({ id: 'sendStructure' })}</Text>
                                </ListBlock>
                            )}
                        />
                        <UsersRenderRoleAdmin
                            user={user}
                            intl={intl}
                            isAdmin={isAdmin}
                            isLead={isLead}
                            onChangeUserRole={handleChangeUserRole}
                            onChangeRoleSupport={handleChangeRoleSupport}
                        />
                        <ModalEditUser
                         modalOpenMode={modalOpenMode}
                            user={user}
                            trigger={(
                                <ListBlock onClick={clickHandler}>
                                    <Icon name='pencil' color='blue' circular inverted/>
                                    <Text inverted>{intl.formatMessage({ id: 'edit' })}</Text>
                                </ListBlock>
                            )}
                        />
                        {!isLead && (
                            <ListBlock onClick={handleToggleBlock}>
                                <Icon
                                    name={!user.blocked ? 'ban' : 'undo'}
                                    circular
                                    inverted
                                    color={!user.blocked ? 'red' : 'blue'}
                                />
                                <Text inverted>{intl.formatMessage({ id: !user.blocked ? 'block' : 'unblock' })}</Text>
                            </ListBlock>
                        )}
                        <ConfirmModal
                            trigger={(
                                <ListBlock onClick={clickHandler} >
                                    <Icon name='delete' color='red' circular inverted/>
                                    <Text inverted>{intl.formatMessage({ id: 'delete' })}</Text>
                                </ListBlock>
                            )}
                            callback={handleDeleteUser}
                        />
                    </>
                </Popup>
            </>
        }
        </>);
};

UsersActionsButton.propTypes = {
    intl: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    isLead: PropTypes.bool,
    isAdmin: PropTypes.bool,
    deleteUser: PropTypes.func.isRequired,
    changeUserRole: PropTypes.func.isRequired,
    changeRoleSupport: PropTypes.func.isRequired,
    toggleBlock: PropTypes.func.isRequired,
};

export default UsersActionsButton;
