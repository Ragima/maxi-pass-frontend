import React from 'react';
import { Flex } from 'styled_components/Flexbox';
import { FormContainer } from 'styled_components/Container';
import FormWrap from 'components/Forms/FormWrap';
import FieldWrap from 'components/Fields/FieldWrap';
import { SubmitButton } from 'styled_components/Button';
import PropTypes from 'prop-types';
import _ from 'lodash';
import validations from 'helpers/data/validations';
const EditVaultForm = ({ intl, editVault, onSubmit, vault, modalCloseMode }) => {

    const handleSubmit = async (data) => {
        try {
            await editVault({ ...data, id: vault.id });
        } finally {
            if (onSubmit) onSubmit();
        };
    };

    const onClickHandler = () => {
        modalCloseMode();
    };

    return (
        <Flex direction='column'>
            <FormContainer>
                <FormWrap onSubmit={handleSubmit} initialValues={{ title: _.get(vault, 'title'), description: _.get(vault, 'description') }}>
                    {({ isLoading }) => (
                        <>
                            <FieldWrap validate={validations.vaultTitle} name='title' icon='tag' iconPosition='left' placeholder={intl.formatMessage({ id: 'title' })} component='input'/>
                            <FieldWrap validate={validations.vaultDescription} name='description' icon='address card outline' iconPosition='left' placeholder={intl.formatMessage({ id: 'description' })} component='input'/>
                            <SubmitButton loading={isLoading} onClick={onClickHandler} disabled={isLoading} compact>{intl.formatMessage({ id: 'editVault' })}</SubmitButton>
                    </>)
                    }
                   
                </FormWrap>
            </FormContainer>
        </Flex>
    );
};

EditVaultForm.propTypes = {
    intl: PropTypes.object.isRequired,
    editVault: PropTypes.func.isRequired,
    vault: PropTypes.object.isRequired,
    onSubmit: PropTypes.func,
    modalCloseMode: PropTypes.func.isRequired,
};

export default EditVaultForm;
