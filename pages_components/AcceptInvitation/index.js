import React from 'react';
import { BackgroundImage, HeaderBackground, AuthCardBackground } from 'styled_components/Background';
import { Flex } from 'styled_components/Flexbox';
import { HeaderContent } from 'styled_components/Content';
import { Container } from 'styled_components/Container';
import { Text } from 'styled_components/Text';
import { Image, Responsive } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import AcceptForm from 'components/Forms/AcceptForm';

const Accept = ({ intl, invitation_token }) => {
    return (
        <BackgroundImage height='100%' src='/static/images/background.jpg'>
            <Flex direction='column' justify='center'>
                <Container>
                    <HeaderBackground>
                        <HeaderContent>
                            <Image src='/static/images/logo.png' size='small'/>
                            <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                                <Text size='22'>{intl.formatMessage({ id: 'acceptAccount' })}</Text>
                            </Responsive>
                        </HeaderContent>
                    </HeaderBackground>
                    <AuthCardBackground>
                        <AcceptForm invitationToken={invitation_token}/>
                    </AuthCardBackground>
                </Container>
            </Flex>
        </BackgroundImage>
    );
};

Accept.propTypes = {
    intl: PropTypes.object.isRequired,
    invitation_token: PropTypes.string.isRequired,
};

export default Accept;
