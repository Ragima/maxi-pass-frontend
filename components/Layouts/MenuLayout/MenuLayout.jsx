import React from 'react';
import PropTypes from 'prop-types';
import { Sidebar } from 'semantic-ui-react';
import Menu from 'components/Menu';
import _ from 'lodash';

const MenuLayout = ({ hideMenu, isMenuOpen, children, router, signOut, role, isLead }) => {
    return (
        <Sidebar.Pushable as='div'>
            <Sidebar
                animation='overlay'
                visible={isMenuOpen}
                width='thin'
            >
                <Menu
                    isLead={isLead}
                    vertical
                    role={role}
                    pathname={_.get(router, 'pathname', '')}
                    hideMenu={hideMenu}
                    signOut={signOut}
                />
            </Sidebar>

            <Sidebar.Pusher>
                {children}
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    );
};

MenuLayout.propTypes = {
    hideMenu: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
    isMenuOpen: PropTypes.bool.isRequired,
    isLead: PropTypes.bool,
    role: PropTypes.string.isRequired,
    router: PropTypes.object,
    children: PropTypes.any,
};

export default MenuLayout;
