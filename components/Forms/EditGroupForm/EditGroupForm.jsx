import React from 'react';
import { Flex } from 'styled_components/Flexbox';
import { FormContainer } from 'styled_components/Container';
import FormWrap from 'components/Forms/FormWrap';
import FieldWrap from 'components/Fields/FieldWrap';
import { SubmitButton } from 'styled_components/Button';
import PropTypes from 'prop-types';
import _ from 'lodash';
import validations from 'helpers/data/validations';

const EditGroupForm = ({ intl, editGroup, onSubmit, group }) => {
    const handleSubmit = async (data) => {
        try {
            await editGroup({ ...data, id: group.id });
        } finally {
            if (onSubmit) onSubmit();
        }
    };

    return (
        <Flex direction='column'>
            <FormContainer>
                <FormWrap onSubmit={handleSubmit} initialValues={{ name: _.get(group, 'name') }}>
                    {({ isLoading }) => (
                        <>
                            <FieldWrap validate={validations.groupName} name='name' icon='tag' iconPosition='left' placeholder={intl.formatMessage({ id: 'title' })} component='input'/>
                            <SubmitButton loading={isLoading} disabled={isLoading} compact>{intl.formatMessage({ id: 'editGroup' })}</SubmitButton>
                    </>)
                    }
                   
                </FormWrap>
            </FormContainer>
        </Flex>
    );
};

EditGroupForm.propTypes = {
    intl: PropTypes.object.isRequired,
    editGroup: PropTypes.func.isRequired,
    group: PropTypes.object.isRequired,
    onSubmit: PropTypes.func,
};

export default EditGroupForm;
