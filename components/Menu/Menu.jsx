import React from 'react';
import { getMenuContent } from 'styled_components/Content';
import _ from 'lodash';
import { MenuBackground } from 'styled_components/Background';
import { Flex } from 'styled_components/Flexbox';
import { getMenuBlock } from 'styled_components/Block';
import { Icon } from 'semantic-ui-react';
import Link from 'next/link';
import { DESKTOP_MENU_LIST, MOBILE_MENU_LIST } from 'constants/menuItems';
import PropTypes from 'prop-types';
import roles from 'constants/userRoles';

const Menu = ({ pathname, vertical, hideMenu, signOut, role, isLead, intl }) => {
    const MenuBlock = getMenuBlock(vertical); 
    const MenuContent = getMenuContent(vertical); 

    const logOut = () => {
        if (signOut) signOut();
        if (hideMenu) hideMenu();
    };

    const menuItems = _.filter(DESKTOP_MENU_LIST, item => !isLead || (item.link !== '/invitations' && item.link !== '/activity'));

    return (role !== roles.user || vertical
        ? (
            <MenuBackground vertical={vertical}>
                <Flex direction='column' justify='space-between'>
                    {role !== roles.user && (
                        <MenuContent>
                            {_.map(menuItems, ({ name, link, icon }) => (
                                <Link href={link} key={name}>
                                    <MenuBlock onClick={hideMenu} active={pathname === link} >
                                        {vertical && <Icon name={icon}/>}
                                        {intl.formatMessage({ id: name })}
                                    </MenuBlock>
                                </Link>
                            ))}
                        </MenuContent>
                    )}
                    {vertical && (
                        <MenuContent>
                            {_.map(MOBILE_MENU_LIST, ({ name, link, icon }) => (
                                <Link href={link} key={name}>
                                    <MenuBlock onClick={hideMenu} active={pathname === link}>
                                        <Icon name={icon}/>
                                        {intl.formatMessage({ id: name })}
                                    </MenuBlock>
                                </Link>))}
                            <MenuBlock onClick={logOut}>
                                <Icon name='log out'/>
                                {intl.formatMessage({ id: 'logOut' })}
                            </MenuBlock>
                        </MenuContent>
                    )}
                </Flex>
            </MenuBackground>
        )
        : null
    );
};

Menu.propTypes = {
    pathname: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    vertical: PropTypes.bool,
    isLead: PropTypes.bool,
    hideMenu: PropTypes.func,
    signOut: PropTypes.func,
    intl: PropTypes.object.isRequired,
};

export default Menu;
