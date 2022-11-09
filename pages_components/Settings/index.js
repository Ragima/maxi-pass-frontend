import React from 'react';
import SettingsForm from 'components/Forms/SettingsForm';
import ConfirmModal from 'components/Modals/ConfirmModal';
import ChangePasswordForm from 'components/Forms/ChangePasswordForm';
import { StyledGrid } from 'styled_components/Grid';
import { Flex } from 'styled_components/Flexbox';
import CommonButton from 'components/Elements/CommonButton';
import roles from 'constants/userRoles';
import { Grid, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import LanguageSelector from 'components/Elements/LanguageSelector';

const Settings = ({ shouldChangePass, intl, disableTwoFactor, enableTwoFactor, otpRequired, role, teamName, isLead }) => {
    const action = otpRequired ? 'disable' : 'enable';

    const changeRequest = () => {
        const request = otpRequired ? disableTwoFactor : enableTwoFactor;
        request({ teamName });
    };

    return (
        <>
            {shouldChangePass && (
                <Message warning>
                    <div style={{ textAlign: 'center' }}>
                        {intl.formatMessage({ id: 'shouldChangePass' })}
                    </div>
                </Message>
            )}
            <StyledGrid stackable>
                
                    <Grid.Row>
                        <Flex padding='10px'>
                            {role === roles.admin && !isLead && 
                            (<ConfirmModal
                                trigger={<CommonButton icon='user' content={intl.formatMessage({ id: `${action}Auth` })}/>}
                                callback={changeRequest}
                                content={intl.formatMessage({ id: `${action}AuthMessage` })}
                            />)}
                            <LanguageSelector/>
                        </Flex>
                    </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={8}><SettingsForm/></Grid.Column>
                    <Grid.Column width={8}><ChangePasswordForm/></Grid.Column>
                </Grid.Row>
            </StyledGrid>
        </>
    );
};

Settings.propTypes = {
    intl: PropTypes.object.isRequired,
    disableTwoFactor: PropTypes.func.isRequired,
    enableTwoFactor: PropTypes.func.isRequired,
    shouldChangePass: PropTypes.bool,
    otpRequired: PropTypes.bool,
    role: PropTypes.string,
    teamName: PropTypes.string,
};

export default Settings;
