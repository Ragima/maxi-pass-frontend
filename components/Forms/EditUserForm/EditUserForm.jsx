import React from 'react';
import { Flex } from 'styled_components/Flexbox';
import { FormContainer } from 'styled_components/Container';
import FormWrap from 'components/Forms/FormWrap';
import FieldWrap from 'components/Fields/FieldWrap';
import { SubmitButton } from 'styled_components/Button';
import PropTypes from 'prop-types';
import _ from 'lodash';
import validations from 'helpers/data/validations';

const EditUserForm = ({ intl, editUser, onSubmit, user }) => {
    const handleSubmit = async (data) => {
        try {
            await editUser({ ...data, id: user.id });
        } finally {
            if (onSubmit) onSubmit();
        }
    };

    return (
        <Flex direction='column'>
            <FormContainer>
                <FormWrap onSubmit={handleSubmit} initialValues={{ name: user.name }}>
                    {({ isLoading }) => (
                        <>
                            <FieldWrap validate={validations.userName} name='name' icon='user' iconPosition='left' placeholder={intl.formatMessage({ id: 'name' })} component='input'/>
                            <SubmitButton loading={isLoading} disabled={isLoading} compact>{intl.formatMessage({ id: 'editUser' })}</SubmitButton>
                    </>)
                    }
                   
                </FormWrap>
            </FormContainer>
        </Flex>
    );
};

EditUserForm.propTypes = {
    intl: PropTypes.object.isRequired,
    editUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    onSubmit: PropTypes.func,
};

export default EditUserForm;
