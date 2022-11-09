import React from 'react';
import { Flex } from 'styled_components/Flexbox';
import { FormContainer } from 'styled_components/Container';
import { Text } from 'styled_components/Text';
import FormWrap from 'components/Forms/FormWrap';
import FieldWrap from 'components/Fields/FieldWrap';
import { SubmitButton } from 'styled_components/Button';
import PropTypes from 'prop-types';
import validations from 'helpers/data/validations';
import Link from 'next/link';

const RegistrationForm = ({ intl, signUp }) => {
    return (
        <Flex direction='column' padding='30px 20px 10px 20px'>
            <Text inverted size='26'>{intl.formatMessage({ id: 'signUp' })}</Text>
            <FormContainer>
                <FormWrap onSubmit={signUp}>
                    {({ isLoading }) => (<>
                        <FieldWrap validate={validations.teamName} name='temp' icon='users' iconPosition='left' placeholder={intl.formatMessage({ id: 'teamName' })} component='input'/>
                        <FieldWrap validate={validations.userNames} name='first_name' icon='info' iconPosition='left' placeholder={intl.formatMessage({ id: 'firstName' })} component='input'/>
                        <FieldWrap validate={validations.userLastName} name='last_name' icon='info' iconPosition='left' placeholder={intl.formatMessage({ id: 'lastName' })} component='input'/>
                        <FieldWrap validate={validations.email} name='email' icon='mail' iconPosition='left' placeholder={intl.formatMessage({ id: 'email' })} component='input'/>
                        <FieldWrap validate={validations.newPassword} name='password' icon='lock' iconPosition='left' type='password' placeholder={intl.formatMessage({ id: 'password' })} component='input'/>
                        <FieldWrap validate={validations.passwordMatch} name='confirm_password' icon='lock' iconPosition='left' type='password' placeholder={intl.formatMessage({ id: 'confirmPassword' })} component='input'/>
                        <FieldWrap name='support_personal_vaults' fluid label={intl.formatMessage({ id: 'personalVaults' })} component='checkbox'/>
                        <SubmitButton loading={isLoading} disabled={isLoading} compact>{intl.formatMessage({ id: 'signUp' })}</SubmitButton>
                        <Flex padding='10px 0'>
                            <div>{intl.formatMessage({ id: 'yesAccountQuestion' })}</div>
                            <Link href='/login'><a>{intl.formatMessage({ id: 'signIn' })}</a></Link>
                        </Flex>
                    </>)}
                </FormWrap>
            </FormContainer>
        </Flex>
    );
};

RegistrationForm.propTypes = {
    intl: PropTypes.object.isRequired,
    signUp: PropTypes.func.isRequired,
};

export default RegistrationForm;
