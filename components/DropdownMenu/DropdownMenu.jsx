import React, { useEffect } from 'react';
import { Dropdown, Icon } from 'semantic-ui-react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const DropdownMenu = ({ signOut, isAdmin, intl }) => (
        <Dropdown direction='left' trigger={<Icon link name='chevron down' size='large' inverted/>} icon={null}>
            <Dropdown.Menu>
                <Link href='/vaults'>
                    <Dropdown.Item icon='user circle' text={intl.formatMessage({ id: 'personalPage' })} />
                </Link>
                <Link href='/settings'>
                    <Dropdown.Item icon='setting' text={intl.formatMessage({ id: 'settings' })} />
                </Link>
                {isAdmin && (
                    <Link href='/activities_settings'>
                        <Dropdown.Item icon='setting' text={intl.formatMessage({ id: 'activitiesSettings' })} />
                    </Link>
                )}
                <Dropdown.Item onClick={signOut} size='large' icon='log out' text={intl.formatMessage({ id: 'logOut' })} />
            </Dropdown.Menu>
        </Dropdown>);


DropdownMenu.propTypes = {
    signOut: PropTypes.func,
    teamName: PropTypes.string,
    isAdmin: PropTypes.bool,
    intl: PropTypes.object.isRequired,
};

export default DropdownMenu;
