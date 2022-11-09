import React from 'react';
import SinglePageLayout from 'components/Layouts/SinglePageLayout';
import _ from 'lodash';
import { UserItem } from 'components/Elements/Items';
import ItemListWrap from 'components/Elements/ItemListWrap';
import ModalAddEntity from 'components/Modals/ModalAddEntity';
import { Flex } from 'styled_components/Flexbox';
import PropTypes from 'prop-types';
import { group, user, userFull } from 'constants/entityFields';
import { redirect } from 'helpers/auth/redirect';
import Tree from 'components/Elements/Tree';
import { Icon } from 'semantic-ui-react';
import ModalSendReport from 'components/Modals/ModalSendReport';
import HeaderButtonsVault from './HeaderButtonsVault/HeaderButtonsVault';

const Vault = ({
    intl, vault, users, groups, unrelatedGroups, unrelatedUsers,
    addGroupVault, addUserVault, removeGroupVault, removeUserVault, deleteVault, isAdmin,
}) => {
    const handleDelete = async () => {
        await deleteVault({ id: vault.id });
        redirect('/vaults');
    };

    const itemLists = [
        (
            <ItemListWrap
                data={users}
                keyName='usersList'
                key='users'
                withSearch
                searchKey='searchUsers'
                filterBy={userFull}
                modalComponent={(
                    <ModalAddEntity
                        data={unrelatedUsers}
                        onSelect={id => addUserVault({ vault_id: vault.id, user_id: id })}
                        modalKey='addUser'
                        fields={user}
                    />
                )}
            >
                {data => _.map(data, item => (
                    <UserItem
                        mainId={vault.id}
                        type='vault'
                        key={item.id}
                        item={item}
                        deleteIcon
                        onDelete={() => removeUserVault({ vault_id: vault.id, user_id: item.id })}
                    />
                ))}
            </ItemListWrap>
        ),
        (
            <ItemListWrap
                data={groups}
                keyName='groupsList'
                key='groups'
                modalComponent={(
                    <ModalAddEntity
                        data={unrelatedGroups}
                        onSelect={id => addGroupVault({ vault_id: vault.id, group_id: id })}
                        modalKey='addGroup'
                        fields={group}
                    />
                )}
            >
                {data => (
                    <Tree
                        altData={data}
                        hideEdit
                        secondAction={item => (
                            <Icon
                                onClick={() => removeGroupVault({ vault_id: vault.id, group_id: item.id })}
                                name="unlink"
                                inverted
                                color='red'
                                link
                                circular
                            />
                        )}
                        hideInfo
                    />
                )}
            </ItemListWrap>
        ),
    ];

    const headerButtons = (
        <Flex wrap>
            <ModalSendReport users={[...unrelatedUsers, ...users]} data={vault} type='vault'/>
            <HeaderButtonsVault vault={vault} isAdmin={isAdmin} onHandleDelete={handleDelete} intl={intl}/>
        </Flex>
    );

    return (<SinglePageLayout title={vault.title} itemLists={itemLists} headerButtons={headerButtons} entity='Vault'/>);
};
Vault.propTypes = {
    intl: PropTypes.object.isRequired,
    users: PropTypes.array,
    isAdmin: PropTypes.bool,
    vault: PropTypes.object,
    unrelatedGroups: PropTypes.array.isRequired,
    unrelatedUsers: PropTypes.array,
    groups: PropTypes.array.isRequired,
    addGroupVault: PropTypes.func.isRequired,
    addUserVault: PropTypes.func.isRequired,
    removeGroupVault: PropTypes.func.isRequired,
    removeUserVault: PropTypes.func.isRequired,
    deleteVault: PropTypes.func.isRequired,
};
Vault.defaultProps = {
    vault: {},
    users: [],
    unrelatedUsers: [],
};
export default Vault;
