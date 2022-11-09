import React from 'react';
import { BackgroundImage, HeaderBackground, AuthCardBackground } from 'styled_components/Background';
import { Flex } from 'styled_components/Flexbox';
import { HeaderContent } from 'styled_components/Content';
import { Container } from 'styled_components/Container';
import { Text } from 'styled_components/Text';
import { Image, Responsive } from 'semantic-ui-react';
import LoginForm from 'components/Forms/LoginForm';
import ModalResetPassword from 'components/Modals/ModalResetPassword';
import PropTypes from 'prop-types';

const Login = ({ intl, ...rest }) => {
    const team = rest.team;

    return (
        <BackgroundImage height='100%' src='/static/images/background.jpg'>
            <Flex direction='column' justify='center'>
                <Container>
                    <HeaderBackground>
                        <HeaderContent>
                            <Image src='/static/images/logo.png' size='small'/>
                            <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                                <Text size='22'>{intl.formatMessage({ id: 'login' })}</Text>
                            </Responsive>
                        </HeaderContent>
                    </HeaderBackground>
                    <AuthCardBackground>
                        <LoginForm team={team}/>
                        <Flex padding='10px'>
                            <ModalResetPassword/>
                        </Flex>
                    </AuthCardBackground>
                </Container>
            </Flex>
        </BackgroundImage>
    );
};

Login.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default Login;
