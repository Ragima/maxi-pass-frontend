import React from 'react';
import { BackgroundImage, HeaderBackground, AuthCardBackground } from 'styled_components/Background';
import { Flex } from 'styled_components/Flexbox';
import { HeaderContent } from 'styled_components/Content';
import { Container } from 'styled_components/Container';
import { Text } from 'styled_components/Text';
import { Image, Responsive } from 'semantic-ui-react';
import RegistrationForm from 'components/Forms/RegistrationForm';
import PropTypes from 'prop-types';

const SignUp = ({ intl }) => {
    return (
        <BackgroundImage src='/static/images/background.jpg'>
            <Flex direction='column' justify='center'>
                <Container>
                    <HeaderBackground>
                        <HeaderContent>
                            <Image src='/static/images/logo.png' size='small'/>
                            <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                                <Text size='22'>{intl.formatMessage({ id: 'signUp' })}</Text>
                            </Responsive>
                        </HeaderContent>
                    </HeaderBackground>
                    <AuthCardBackground>
                        <RegistrationForm/>
                    </AuthCardBackground>
                </Container>
            </Flex>
        </BackgroundImage>
    );
};

SignUp.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default SignUp;
