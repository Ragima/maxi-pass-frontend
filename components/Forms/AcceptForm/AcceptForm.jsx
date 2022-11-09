import React from 'react';
import { Flex } from 'styled_components/Flexbox';
import { FormContainer } from 'styled_components/Container';
import { Text } from 'styled_components/Text';
import FormWrap from 'components/Forms/FormWrap';
import FieldWrap from 'components/Fields/FieldWrap';
import { SubmitButton } from 'styled_components/Button';
import PropTypes from 'prop-types';
import { redirect } from 'helpers/auth/redirect';
import validations from 'helpers/data/validations';

const AcceptForm = ({ intl, acceptInvitation, invitationToken }) => {
    const onSubmit = async (data) => {
        await acceptInvitation({ ...data, invitation_token: invitationToken });
        redirect('/vaults');
    }; 

    return (
        <Flex direction='column' padding='50px 20px 50px 20px'>
            <Text inverted size='26' color='black'>{intl.formatMessage({ id: 'signUp' })}</Text>
            <FormContainer>
                <FormWrap onSubmit={onSubmit}>
                    {({ isLoading }) => (<>
                        <FieldWrap validate={validations.userNames} name='first_name' icon='info' iconPosition='left' placeholder={intl.formatMessage({ id: 'firstName' })} component='input'/>
                        <FieldWrap validate={validations.userNames} name='last_name' icon='info' iconPosition='left' placeholder={intl.formatMessage({ id: 'lastName' })} component='input'/>
                        <FieldWrap validate={validations.newPassword} name='password' icon='lock' iconPosition='left' type='password' placeholder={intl.formatMessage({ id: 'password' })} component='input'/>
                        <FieldWrap validate={validations.passwordMatch} name='confirm_password' icon='lock' iconPosition='left' type='password' placeholder={intl.formatMessage({ id: 'confirmPassword' })} component='input'/>
                        <SubmitButton loading={isLoading} disabled={isLoading} compact>{intl.formatMessage({ id: 'acceptAccount' })}</SubmitButton>
                    </>)}
                </FormWrap>
            </FormContainer>
        </Flex>
    );
};

AcceptForm.propTypes = {
    intl: PropTypes.object.isRequired,
    acceptInvitation: PropTypes.func.isRequired,
    invitationToken: PropTypes.string.isRequired,
};

export default AcceptForm;
