import React, { useState } from 'react';
import { Flex } from 'styled_components/Flexbox';
import { FormContainer } from 'styled_components/Container';
import { Text } from 'styled_components/Text';
import FormWrap from 'components/Forms/FormWrap';
import FieldWrap from 'components/Fields/FieldWrap';
import { SubmitButton } from 'styled_components/Button';
import PropTypes from 'prop-types';
import Link from 'next/link';
import validations from 'helpers/data/validations';
import ModalResetAuth from 'components/Modals/ModalResetAuth';

const LoginForm = ({ intl, signIn, team }) => {
    const [needTFAuth, setTFAuth] = useState(false);

    const login = async (data) => {
        try {
            await signIn(data);
        } catch (error) {
            if (error && error[0] === 'Your authenticated code is invalid ') setTFAuth(true);
        }
    };

    return (
        <Flex direction='column' padding='50px 20px 10px 20px'>
            <Text inverted size='26' color='black'>{intl.formatMessage({ id: 'signIn' })}</Text>
            <FormContainer>
                <FormWrap onSubmit={login} initialValues={{ team_name: team }}>
                    {({ isLoading }) => (<>
                        {!team && (
                            <FieldWrap
                                validate={validations.teamName}
                                name='team_name'
                                icon='street view'
                                iconPosition='left'
                                placeholder={intl.formatMessage({ id: 'teamName' })}
                                component='input'
                            />
                        )}
                        <FieldWrap
                            validate={validations.email}
                            name='email'
                            icon='user'
                            type='email'
                            iconPosition='left'
                            placeholder={intl.formatMessage({ id: 'email' })}
                            component='input'
                        />
                        <FieldWrap
                            name='password'
                            icon='lock'
                            iconPosition='left'
                            type='password'
                            placeholder={intl.formatMessage({ id: 'password' })}
                            component='input'
                        />
                        {needTFAuth && (
                            <>
                                <FieldWrap
                                    name='otp_attempt'
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder={intl.formatMessage({ id: 'authCode' })}
                                    component='input'
                                />
                                <ModalResetAuth/>
                            </>
                        )}
                        <SubmitButton
                            loading={isLoading}
                            disabled={isLoading}
                            compact
                        >
                            {intl.formatMessage({ id: 'login' })}

                        </SubmitButton>
                        <Flex padding='10px 0'>
                            <div>{intl.formatMessage({ id: 'noAccountQuestion' })}</div>
                            <Link href='/sign_up'><a>{intl.formatMessage({ id: 'signUp' })}</a></Link>
                        </Flex>
                    </>)}
                </FormWrap>
            </FormContainer>
        </Flex>
    );
};

LoginForm.propTypes = {
    intl: PropTypes.object.isRequired,
    team: PropTypes.string,
    signIn: PropTypes.func.isRequired,
};

export default LoginForm;
