import React from 'react';
import { Flex } from 'styled_components/Flexbox';
import { FormContainer } from 'styled_components/Container';
import { Text } from 'styled_components/Text';
import FormWrap from 'components/Forms/FormWrap';
import FieldWrap from 'components/Fields/FieldWrap';
import { SubmitButton } from 'styled_components/Button';
import PropTypes from 'prop-types';
import validations from 'helpers/data/validations';

const ChangePasswordForm = ({ intl, updateSettings }) => {
    const handleSubmit = async (data, form) => {
        await updateSettings({ user: data });
        setTimeout(form.reset);
    };

    return (
        <Flex direction='column' padding='50px 20px 10px 20px' justify='flex-start'>
            <Text inverted size='26' color='black'>{intl.formatMessage({ id: 'changePassword' })}</Text>
            <FormContainer>
                <FormWrap onSubmit={handleSubmit}>
                    {({ isLoading }) => (<> 
                        <FieldWrap
                            validate={validations.password}
                            name='current_password'
                            icon='lock'
                            type='password'
                            iconPosition='left'
                            placeholder={intl.formatMessage({ id: 'currentPassword' })}
                            component='input'
                        />
                        <FieldWrap
                            validate={validations.newPassword}
                            name='password'
                            icon='lock'
                            type='password'
                            iconPosition='left'
                            placeholder={intl.formatMessage({ id: 'password' })}
                            component='input'
                        />
                        <FieldWrap
                            validate={validations.passwordMatch}
                            name='password_confirmation'
                            icon='lock'
                            type='password'
                            iconPosition='left'
                            placeholder={intl.formatMessage({ id: 'confirmPassword' })}
                            component='input'
                        />                    
                        <SubmitButton
                            loading={isLoading}
                            disabled={isLoading}
                            compact
                        >
                            {intl.formatMessage({ id: 'changePassword' })}

                        </SubmitButton>
                    </>)}
                </FormWrap>
            </FormContainer>
        </Flex>
    );
};

ChangePasswordForm.propTypes = {
    intl: PropTypes.object.isRequired,
    updateSettings: PropTypes.func.isRequired,
};

export default ChangePasswordForm;
