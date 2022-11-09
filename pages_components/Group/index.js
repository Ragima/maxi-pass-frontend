import React from 'react';
import SinglePageLayout from 'components/Layouts/SinglePageLayout';
import _ from 'lodash';
import { VaultItem, UserItem } from 'components/Elements/Items';
import ItemListWrap from 'components/Elements/ItemListWrap';
import ModalAddEntity from 'components/Modals/ModalAddEntity';
import Tree from 'components/Elements/Tree';
import { group as groupFields, vault, user, userFull } from 'constants/entityFields';
import PropTypes from 'prop-types';
import { redirect } from 'helpers/auth/redirect';
import ConfirmModal from 'components/Modals/ConfirmModal';
import CommonButton from 'components/Elements/CommonButton';
import { Flex } from 'styled_components/Flexbox';
import ModalSendReport from 'components/Modals/ModalSendReport';
import ModalChangeParentGroup from 'components/Modals/ModalChangeParentGroup';

const Group = ({ users, groups, vaults, group,
    unrelatedGroups, unrelatedVaults, unrelatedUsers,
    addGroupUser, addGroupVault, createInnerGroup,
    removeGroupUser, removeGroupVault, deleteGroup, intl,
}) => {
    const handleDelete = async () => {
        await deleteGroup({ id: group.id });
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
                        onSelect={id => addGroupUser({ group_id: group.id, user_id: id })}
                        modalKey='addUser'
                        fields={user}
                    />
                )}
            >
                {data => _.map(data, item => (
                    <UserItem
                        key={item.id}
                        item={item}
                        deleteIcon
                        mainId={group.id}
                        type='group'
                        onDelete={() => removeGroupUser({ group_id: group.id, user_id: item.id })}
                    />
                ))}
            </ItemListWrap>
        ),
        (
            <ItemListWrap
                data={vaults}
                keyName='vaultsList'
                key='vaults'
                withSearch
                searchKey='searchVaults'
                filterBy={vault}
                modalComponent={(
                    <ModalAddEntity
                        data={unrelatedVaults}
                        onSelect={id => addGroupVault({ group_id: group.id, vault_id: id })}
                        modalKey='addVault'
                        fields={vault}
                    />
                )} 
            >
                {data => _.map(data, item => (
                    <VaultItem key={item.id} item={item} deleteIcon onDelete={() => removeGroupVault({ group_id: group.id, vault_id: item.id })}/>
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
                        onSelect={id => createInnerGroup({ id: group.id, innerId: id })}
                        modalKey='addGroup'
                        fields={groupFields}
                    />
                )}
            >
                {data => <Tree altData={data} hideEdit hideInfo/>}
            </ItemListWrap>
        ),
    ];

    const headerButtons = (
        <Flex justify='space-between'>
            <ModalChangeParentGroup group={group}/>
            <ModalSendReport users={[...unrelatedUsers, ...users]} data={group} type='group'/>
            <ConfirmModal
                trigger={<CommonButton margin='0 0 0 20px' icon='delete' danger content={intl.formatMessage({ id: 'deleteGroup' })}/>}
                callback={handleDelete}
            />
        </Flex>
    );

    return (<SinglePageLayout headerButtons={headerButtons} title={group.name} itemLists={itemLists} entity='Group'/>);
};

Group.propTypes = {
    users: PropTypes.array,
    vaults: PropTypes.array.isRequired,
    groups: PropTypes.array.isRequired,
    group: PropTypes.object,
    intl: PropTypes.object.isRequired,
    unrelatedGroups: PropTypes.array.isRequired,
    unrelatedUsers: PropTypes.array,
    unrelatedVaults: PropTypes.array.isRequired,
    addGroupUser: PropTypes.func.isRequired,
    addGroupVault: PropTypes.func.isRequired,
    createInnerGroup: PropTypes.func.isRequired,
    removeGroupUser: PropTypes.func.isRequired,
    removeGroupVault: PropTypes.func.isRequired,
    deleteGroup: PropTypes.func.isRequired,
};

Group.defaultProps = {
    group: {},
    users: [],
    unrelatedUsers: [],
};

export default Group;
