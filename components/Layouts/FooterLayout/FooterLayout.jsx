import React from 'react';
import { FooterBackground } from 'styled_components/Background';
import { FooterContent } from 'styled_components/Content';
import { Text } from 'styled_components/Text';
import PropTypes from 'prop-types';
import { Responsive } from 'semantic-ui-react';

const FooterLayout = ({ intl }) => (
    <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <FooterBackground>
            <FooterContent>
                <Text>{intl.formatMessage({ id: 'footerMessage' })}</Text>
            </FooterContent>
        </FooterBackground>   
    </Responsive>     
);

FooterLayout.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default FooterLayout;
