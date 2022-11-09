import React from 'react';
import { Flex } from 'styled_components/Flexbox';
import { FormContainer } from 'styled_components/Container';
import FormWrap from 'components/Forms/FormWrap';
import FieldWrap from 'components/Fields/FieldWrap';
import { SubmitButton } from 'styled_components/Button';
import PropTypes from 'prop-types';
import validations from 'helpers/data/validations';

const ResetPasswordForm = ({ intl, resetPassword, onSubmit }) => {
    const handleSubmit = async (data) => {
        try {
            await resetPassword(data);
        } finally {
            if (onSubmit) onSubmit();
        }
    };

    return (
        <Flex direction='column'>
            <FormContainer>
                <FormWrap onSubmit={handleSubmit}>
                    {({ isLoading }) => (<>
                        <FieldWrap validate={validations.teamName} name='team_name' icon='users' iconPosition='left' placeholder={intl.formatMessage({ id: 'teamName' })} component='input'/>
                        <FieldWrap validate={validations.email} name='email' icon='mail' iconPosition='left' placeholder={intl.formatMessage({ id: 'email' })} component='input'/>
                        <SubmitButton loading={isLoading} disabled={isLoading} compact>{intl.formatMessage({ id: 'resetPassword' })}</SubmitButton>
                </>)}
                    
                </FormWrap>
            </FormContainer>
        </Flex>
    );
};

ResetPasswordForm.propTypes = {
    intl: PropTypes.object.isRequired,
    resetPassword: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
};

export default ResetPasswordForm;
