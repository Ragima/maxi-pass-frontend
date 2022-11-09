import React from 'react';
import { Flex } from 'styled_components/Flexbox';
import { FormContainer } from 'styled_components/Container';
import FormWrap from 'components/Forms/FormWrap';
import FieldWrap from 'components/Fields/FieldWrap';
import { SubmitButton } from 'styled_components/Button';
import PropTypes from 'prop-types';
import validations from 'helpers/data/validations';

const AddVaultForm = ({ intl, createVault, onSubmit }) => {

    const handleSubmit = async (data) => {
        try {
            if (data.title) {
                await createVault({ ...data, title: data.title.trim() });
            } else {
                await createVault(data);
            }
        } finally {
            if (onSubmit) onSubmit();
        }
    };

    return (
        <Flex direction='column'>
            <FormContainer>
                <FormWrap onSubmit={handleSubmit}>
                    {({ isLoading }) => (<>
                        <FieldWrap validate={validations.vaultTitle} name='title' icon='tag' iconPosition='left' placeholder={intl.formatMessage({ id: 'title' })} component='input' />
                        <FieldWrap validate={validations.vaultDescription} name='description' icon='address card outline' iconPosition='left' placeholder={intl.formatMessage({ id: 'description' })} component='input' />
                        <SubmitButton loading={isLoading} disabled={isLoading} compact>{intl.formatMessage({ id: 'newVault' })}</SubmitButton>
                    </>)}

                </FormWrap>
            </FormContainer>
        </Flex>
    );
};

AddVaultForm.propTypes = {
    intl: PropTypes.object.isRequired,
    createVault: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
};

export default AddVaultForm;
