import React, { useEffect } from 'react';
import { HeaderBackground } from 'styled_components/Background';
import { HeaderContent, Content } from 'styled_components/Content';
import { Text } from 'styled_components/Text';
import { Image, Icon, Responsive } from 'semantic-ui-react';
import Menu from 'components/Menu';
import DropdownMenu from 'components/DropdownMenu';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Link from 'next/link';
import { redirectToLogin } from 'helpers/auth/redirect';

const HeaderLayout = ({ showMenu, hideMenu, isMenuOpen, router, email, signOut, role, isLead, teamName, isAdmin, isSignIn }) => {
    useEffect(() => {
        if(!isSignIn)  
        redirectToLogin({}, teamName);
    },[isSignIn])   

    const handleSignOut = async () => await signOut(); 

    const handleUpdate = (e, { width }) => {
        if (isMenuOpen && width >= Responsive.onlyTablet.minWidth) {
            hideMenu();
        }
    };
    
    return (
        <div>
            <HeaderBackground>
                <HeaderContent>
                    <Responsive {...Responsive.onlyMobile}>
                        <Icon name="sidebar" size='big' inverted link onClick={isMenuOpen ? hideMenu : showMenu}/>
                    </Responsive>
                    <Link href='/'>
                        <a>                
                            <Image src='/static/images/logo.png'/>
                        </a> 
                    </Link>
                    <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                        <Content>
                            <Text>{email}</Text>
                            <DropdownMenu signOut={handleSignOut} role={role} isAdmin={isAdmin} />
                        </Content>
                    </Responsive>
                </HeaderContent>
            </HeaderBackground>
            <Responsive minWidth={Responsive.onlyTablet.minWidth} fireOnMount onUpdate={handleUpdate}>
                <Menu pathname={_.get(router, 'pathname', '')} role={role} isLead={isLead}/>
            </Responsive>
        </div>
    );
};
    
HeaderLayout.propTypes = {
    showMenu: PropTypes.func.isRequired,
    hideMenu: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string,
    teamName: PropTypes.string,
    isMenuOpen: PropTypes.bool.isRequired,
    isLead: PropTypes.bool,
    isAdmin: PropTypes.bool,
    router: PropTypes.object,
};

export default HeaderLayout;
