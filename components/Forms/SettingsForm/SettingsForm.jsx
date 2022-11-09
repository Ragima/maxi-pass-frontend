import React from 'react';
import { Flex } from 'styled_components/Flexbox';
import { FormContainer } from 'styled_components/Container';
import { Text } from 'styled_components/Text';
import FormWrap from 'components/Forms/FormWrap';
import FieldWrap from 'components/Fields/FieldWrap';
import { SubmitButton } from 'styled_components/Button';
import PropTypes from 'prop-types';
import validations from 'helpers/data/validations';
import _ from 'lodash';

const SettingsForm = ({ intl, updateSettings, initialValues }) => {
    const handleSubmit = (data) => {
        updateSettings({ user: data });
    };

    return (
        <Flex direction='column' padding='50px 20px 10px 20px' justify='flex-start'>
            <Text inverted size='26' color='black'>{intl.formatMessage({ id: 'editUser' })}</Text>
            <FormContainer>
                <FormWrap onSubmit={handleSubmit} initialValues={_.pick(initialValues, ['first_name', 'last_name', 'name'])}>
                    {({ isLoading }) => (<>
                        <FieldWrap
                            validate={validations.userNames}
                            name='first_name'
                            icon='user'
                            iconPosition='left'
                            placeholder={intl.formatMessage({ id: 'firstName' })}
                            component='input'
                        />
                        <FieldWrap
                            validate={validations.userNames}
                            name='last_name'
                            icon='user'
                            iconPosition='left'
                            placeholder={intl.formatMessage({ id: 'lastName' })}
                            component='input'
                        />
                        <FieldWrap
                            validate={validations.userName}
                            name='name'
                            icon='user'
                            iconPosition='left'
                            placeholder={intl.formatMessage({ id: 'name' })}
                            component='input'
                        />
                        <SubmitButton
                            loading={isLoading}
                            disabled={isLoading}
                            compact
                        >
                            {intl.formatMessage({ id: 'updateSettings' })}

                        </SubmitButton>
                    </>)}
                </FormWrap>
            </FormContainer>
        </Flex>
    );
};

SettingsForm.propTypes = {
    intl: PropTypes.object.isRequired,
    updateSettings: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
};

SettingsForm.defaultProps = {
    initialValues: {},
};

export default SettingsForm;
