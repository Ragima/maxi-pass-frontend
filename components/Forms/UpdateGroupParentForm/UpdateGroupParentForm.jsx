import React from 'react';
import { Flex } from 'styled_components/Flexbox';
import { FormContainer } from 'styled_components/Container';
import FormWrap from 'components/Forms/FormWrap';
import FieldWrap from 'components/Fields/FieldWrap';
import { SubmitButton, DangerSubmitButton } from 'styled_components/Button';
import PropTypes from 'prop-types';
import validations from 'helpers/data/validations';

const UpdateGroupParentForm = ({ intl, createInnerGroup, deleteParentGroup, onSubmit, groups, group, isLead }) => {
    const handleSubmit = async (data) => {
        try {
            await createInnerGroup({ innerId: group.id, id: data.parent_group_id });
        } finally {
            if (onSubmit) onSubmit();
        }
    };

    const removeParent = async () => {
        try {
            await deleteParentGroup({ innerId: group.id, id: group.parent_group_id });
        } finally {
            if (onSubmit) onSubmit();
        }
    };

    const validateParentGroup = data => validations.updateGroup(data, group.id, groups);

    return (
        <Flex direction='column'>
            <FormContainer>
                <FormWrap onSubmit={handleSubmit}>
                    {({ isLoading }) => (
                        <>
                            <FieldWrap validate={validateParentGroup} name='parent_group_id' selectable hideInfo component='tree'/>
                            <Flex justify='space-between'>
                                {!isLead && group.parent_group_id && <DangerSubmitButton onClick={removeParent} margin='15px 5px 0 0' type='button' compact>{intl.formatMessage({ id: 'removeParent' })}</DangerSubmitButton>}
                                <SubmitButton margin='15px 0 0 5px' loading={isLoading} disabled={isLoading} compact>{intl.formatMessage({ id: 'updateParent' })}</SubmitButton>
                            </Flex>
                    </>)}
                </FormWrap>
            </FormContainer>
        </Flex>
    );
};

UpdateGroupParentForm.propTypes = {
    intl: PropTypes.object.isRequired,
    isLead: PropTypes.bool,
    createInnerGroup: PropTypes.func.isRequired,
    deleteParentGroup: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
    groups: PropTypes.array,
    group: PropTypes.object.isRequired,
};

export default UpdateGroupParentForm;
