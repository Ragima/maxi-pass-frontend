import React from 'react';
import { Icon, List } from 'semantic-ui-react';
import { Flex } from 'styled_components/Flexbox';
import { ItemBlock } from 'styled_components/Block';
import { Text, MetaText } from 'styled_components/Text';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Link from 'next/link';
import UserRoleDropdown from 'components/Elements/UserRoleDropdown';
import PolicyUserDropdown from 'components/Elements/PolicyUserDropdown';
import { formatDate } from 'helpers/data/dataTransform';

export const ItemWrap = ({ icon, children, link = {}, deleteIcon, onDelete, additionalLink = {}, action }) => (
    <ItemBlock>
        {link.href ? (
            <Link {...link}>
                <Icon name={icon} size='large' inverted color='blue' link circular/>
            </Link>
        ) : <Icon name={icon} size='large' inverted color='blue' link circular/>}
        {link.href ? (
            <Link {...link}>
                <Flex direction='column' width='auto' align='start' margin='0 0 0 10px' auto pointer>
                    {children}
                </Flex>
            </Link>
        ) : (
            <Flex direction='column' width='auto' align='start' margin='0 0 0 10px' auto pointer>
                {children}
            </Flex>
        )}
        {action}
        {deleteIcon && <Icon onClick={onDelete} name='unlink' inverted color='red' link circular/>}
        {additionalLink.href && <Link {...additionalLink}><Icon name='ellipsis vertical' color='blue' size='large' link/></Link>}
    </ItemBlock>
);

export const VaultItem = ({ item, deleteIcon, onDelete }) => (
    <ItemWrap
        icon='archive'
        link={{ href: '/vault_items/[id]', as: `/vault_items/${item.id}` }}
        deleteIcon={deleteIcon}
        onDelete={onDelete}
        additionalLink={{ href: !item.personal && `/vault/[id]`, as: `/vault/${item.id}` }}
    >
        <Text bold size='16' inverted>{_.get(item, 'title', '')}</Text>
        <MetaText inverted>{_.get(item, 'description', '')}</MetaText>
    </ItemWrap>
);

export const GroupItem = ({ item, deleteIcon, onDelete, deletable }) => (
    <ItemWrap icon='users' link={{ href: '/group/[id]', as: `/group/${item.id}` }} deleteIcon={deleteIcon} deletable={deletable} onDelete={onDelete}>
        <Text bold size='16' inverted>{_.get(item, 'name', '')}</Text>
    </ItemWrap>
);

export const UserItem = ({ item, deleteIcon, onDelete, mainId, type }) => (
    <ItemWrap
        icon={item.extension_access ? 'user outline' : 'user'}
        link={{ href: item.role_id !== 'admin' && `/user/[id]`, as: `/user/${item.id}` }}
        deleteIcon={deleteIcon}
        onDelete={onDelete}
        action={type === 'group' ? <UserRoleDropdown mainId={mainId} user={item}/>
            : <PolicyUserDropdown mainId={mainId} user={item}/>}
    >
        <Text bold size='16' inverted>{_.get(item, 'name', '')}</Text>
    </ItemWrap>
);

export const InvitationItem = ({ item, deleteIcon, onDelete }) => (
    <ItemWrap icon='mail' deleteIcon={deleteIcon} onDelete={onDelete}>
        <Text bold size='16' inverted>{_.get(item, 'email', '')}</Text>
        <MetaText inverted>{formatDate(_.get(item, 'accept_to', ''))}</MetaText>
    </ItemWrap>
);


export const GroupVaultsItem = ({ item }) => (
    <ItemBlock padded>
        <List>
            <List.Item>
                <List.Icon name='users' color='blue'/>
                <List.Content>
                    <List.Header>{_.get(item, 'group.name')}</List.Header>
                    <List.List>
                        {_.map(item.vaults, vault => (
                            <List.Item key={vault.title}>
                                <List.Icon name='archive' color='blue'/>
                                <List.Content>
                                    <List.Description>{vault.title}</List.Description>
                                </List.Content>
                            </List.Item>
                        ))}
                    </List.List>
                </List.Content>
            </List.Item>
        </List>
    </ItemBlock>

);


ItemWrap.propTypes = {
    icon: PropTypes.string.isRequired,
    link: PropTypes.object,
    additionalLink: PropTypes.object,
    deleteIcon: PropTypes.bool,
    onDelete: PropTypes.func,
    children: PropTypes.any,
};

VaultItem.propTypes = {
    item: PropTypes.object.isRequired,
    deleteIcon: PropTypes.bool,
    onDelete: PropTypes.func,
};

GroupItem.propTypes = {
    item: PropTypes.object.isRequired,
    deleteIcon: PropTypes.bool,
    deletable: PropTypes.bool,
    onDelete: PropTypes.func,
};

UserItem.propTypes = {
    item: PropTypes.object.isRequired,
    deleteIcon: PropTypes.bool,
    onDelete: PropTypes.func,
    mainId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

InvitationItem.propTypes = {
    item: PropTypes.object.isRequired,
    deleteIcon: PropTypes.bool,
    onDelete: PropTypes.func,
};

GroupVaultsItem.propTypes = {
    item: PropTypes.object.isRequired,
};
