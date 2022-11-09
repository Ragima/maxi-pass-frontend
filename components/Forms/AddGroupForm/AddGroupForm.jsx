import React from 'react';
import { Flex } from 'styled_components/Flexbox';
import { FormContainer } from 'styled_components/Container';
import FormWrap from 'components/Forms/FormWrap';
import FieldWrap from 'components/Fields/FieldWrap';
import { SubmitButton } from 'styled_components/Button';
import PropTypes from 'prop-types';
import validations from 'helpers/data/validations';

const AddGroupForm = ({ intl, createGroup, onSubmit, isLead }) => {
    const handleSubmit = async (data) => {
        try {
            await createGroup(data);
        } finally {
            if (onSubmit) onSubmit();
        }
    };

    const validateParentGroup = data => validations.parentGroup(data, isLead);

    return (
        <Flex direction='column'>
            <FormContainer>
                <FormWrap onSubmit={handleSubmit}>
                    {({ isLoading }) => (
                        <>
                            <FieldWrap validate={validateParentGroup} name='parent_group_id' selectable hideInfo component='tree'/>
                            <FieldWrap validate={validations.groupName} name='name' icon='tag' iconPosition='left' placeholder={intl.formatMessage({ id: 'title' })} component='input'/>
                            <SubmitButton loading={isLoading} disabled={isLoading} compact>{intl.formatMessage({ id: 'newGroup' })}</SubmitButton>
                    </>)}
                </FormWrap>
            </FormContainer>
        </Flex>
    );
};

AddGroupForm.propTypes = {
    intl: PropTypes.object.isRequired,
    createGroup: PropTypes.func.isRequired,
    createInnerGroup: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
    isLead: PropTypes.bool,
};

export default AddGroupForm;
