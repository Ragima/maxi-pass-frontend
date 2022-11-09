import React from 'react';
import { Icon } from "semantic-ui-react";
import ConfirmModal from "components/Modals/ConfirmModal";
import { ListBlock } from 'styled_components/Block';
import { Text } from 'styled_components/Text';

const UsersRenderRoleAdmin = (props) => {
    const { user, isAdmin, isLead, intl, onChangeRoleSupport, onChangeUserRole } = props;
    return (isAdmin && <>
        <ConfirmModal
            trigger={(
                <ListBlock>
                    <Icon name='user' color='blue' circular inverted/>
                    <Text inverted>{intl.formatMessage({ id: 'makeSupportAction' })}</Text>
                </ListBlock>
            )}
            content={intl.formatMessage({ id: 'makeSupportAction' })}
            callback={onChangeRoleSupport}
        />
        {!isLead && !user.extension_access && (
            <ConfirmModal
                trigger={(
                    <ListBlock>
                        <Icon name='user' color='blue' circular inverted/>
                        <Text inverted>{intl.formatMessage({ id: 'makeAdminAction' })}</Text>
                    </ListBlock>
                )}
                content={intl.formatMessage({ id: 'makeAdminAction' })}
                callback={onChangeUserRole}
            />
        )}
            </>
    );
};

export default UsersRenderRoleAdmin;
