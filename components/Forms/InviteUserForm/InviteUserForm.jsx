import React from 'react';
import { Flex } from 'styled_components/Flexbox';
import { FormContainer } from 'styled_components/Container';
import FormWrap from 'components/Forms/FormWrap';
import FieldWrap from 'components/Fields/FieldWrap';
import { SubmitButton } from 'styled_components/Button';
import PropTypes from 'prop-types';
import validations from 'helpers/data/validations';

const InviteUserForm = ({ intl, createInvitation, onSubmit, teamName, invitedUsers, currentUserEmail }) => {

    const currentInvitedUsers = [ ...invitedUsers, currentUserEmail ];

    const handleSubmit = async (data) => {
        const isInvitedUser = currentInvitedUsers.some(user => user.email == data.email);
        if (!isInvitedUser) {
            try {
                await createInvitation({ user: { ...data, team_name: teamName } });
            } finally {
                if (onSubmit) onSubmit();
            }
        }
    };
    
    const validationHandler = data => validations.inviteUser(data, currentInvitedUsers);

    return (
        <Flex direction='column'>
            <FormContainer>
                <FormWrap onSubmit={handleSubmit}>
                    {({ isLoading }) => (<>
                        <FieldWrap validate={validationHandler} name='email' icon='mail' iconPosition='left' placeholder={intl.formatMessage({ id: 'email' })} component='input'/>
                        {/* <FieldWrap name='extension_access' label={intl.formatMessage({ id: 'extension' })} component='checkbox'/> */}
                        <SubmitButton loading={isLoading} disabled={isLoading} compact>{intl.formatMessage({ id: 'newInvitation' })}</SubmitButton>
                        </>)}
                </FormWrap>
            </FormContainer>
        </Flex>
    );
};

InviteUserForm.propTypes = {
    intl: PropTypes.object.isRequired,
    createInvitation: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    teamName: PropTypes.string.isRequired,
};

export default InviteUserForm;
