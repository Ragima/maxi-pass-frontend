import React from 'react';
import SinglePageLayout from 'components/Layouts/SinglePageLayout';
import _ from 'lodash';
import { VaultItem, GroupVaultsItem } from 'components/Elements/Items';
import ItemListWrap from 'components/Elements/ItemListWrap';
import ModalAddEntity from 'components/Modals/ModalAddEntity';
import { group, vault } from 'constants/entityFields';
import PropTypes from 'prop-types';
import { getVaultsThroughGroups } from 'helpers/data/dataTransform';
import Tree from 'components/Elements/Tree';
import { Icon } from 'semantic-ui-react';
import { redirect } from 'helpers/auth/redirect';
import { Flex } from 'styled_components/Flexbox';
import CommonButton from 'components/Elements/CommonButton';
import ConfirmModal from 'components/Modals/ConfirmModal';

const User = ({ intl, user, vaults, groups, unrelatedGroups, unrelatedVaults, deleteUser,
    addGroupUser, addUserVault, removeGroupUser, removeUserVault, groupVaults }) => {
    const handleDelete = async () => {
        await deleteUser({ id: user.id });
        redirect('/vaults');
    };
    const itemLists = [
        (
            <ItemListWrap
                data={groups}
                keyName='groupsList'
                key='groups'
                modalComponent={<ModalAddEntity data={unrelatedGroups} onSelect={id => addGroupUser({ group_id: id, user_id: user.id })} modalKey='addGroup' fields={group}/>}
            >
                {data => (
                    <Tree
                        altData={data}
                        hideEdit
                        secondAction={item => <Icon onClick={() => removeGroupUser({ group_id: item.id, user_id: user.id })} name="unlink" inverted color='red' link circular/>}
                        hideInfo
                    />
                )}
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
                modalComponent={<ModalAddEntity data={unrelatedVaults} onSelect={id => addUserVault({ vault_id: id, user_id: user.id })} modalKey='addVault' fields={vault}/>}
            >
                {data => _.map(data, item => (
                    <VaultItem key={item.id} item={item} deleteIcon onDelete={() => removeUserVault({ vault_id: item.id, user_id: user.id })}/>
                ))}
            </ItemListWrap>
        ),
        (
            <ItemListWrap
                data={getVaultsThroughGroups(groups, [...vaults, ...unrelatedVaults], groupVaults)}
                keyName='vaultsGroupsList'
                key='vaultsGroups'
            >
                {data => _.map(data, (item, index) => (
                    <GroupVaultsItem key={`vg:${index}`} item={item}/>
                ))}
            </ItemListWrap>
        ),
    ];

    const headerButtons = (
        <Flex justify='flex-end'>
            <ConfirmModal
                trigger={<CommonButton icon='delete' danger content={intl.formatMessage({ id: 'deleteUser' })}/>}
                callback={handleDelete}
            />
        </Flex>
    );

    return (<SinglePageLayout headerButtons={headerButtons} title={user.name} itemLists={itemLists} entity='User'/>);
};

User.propTypes = {
    vaults: PropTypes.array,
    user: PropTypes.object,
    intl: PropTypes.object.isRequired,
    unrelatedGroups: PropTypes.array.isRequired,
    unrelatedVaults: PropTypes.array,
    groups: PropTypes.array.isRequired,
    groupVaults: PropTypes.array.isRequired,
    addGroupUser: PropTypes.func.isRequired,
    removeGroupUser: PropTypes.func.isRequired,
    addUserVault: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
    removeUserVault: PropTypes.func.isRequired,
};

User.defaultProps = {
    user: {},
    vaults: [],
    unrelatedVaults: [],
};

export default User;
