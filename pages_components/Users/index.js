import React, { useState } from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import CommonButton from 'components/Elements/CommonButton';
import { Text } from 'styled_components/Text';
import { Flex } from 'styled_components/Flexbox';
import UsersTable from 'components/Tables/UsersTable';
import ResetedUsersTable from 'components/Tables/ResetedUsersTable';
import InvitationsTable from 'components/Tables/InvitationsTable';
import _ from 'lodash';
import PageItemsLayout from 'components/Layouts/PageItemsLayout';
import PropTypes from 'prop-types';
import ModalInviteUser from 'components/Modals/ModalInviteUser';
import { filterByRelationId } from 'helpers/data/dataTransform';
import roles from 'constants/userRoles';

const Users = ({ intl, users, groupUsers, isLead, resetedUsers, invitations }) => {
    const [filter, setFilter] = useState(false);

    const leftColumn = () => (
        <Flex height='auto' padding='0 0 20px 0'>
            <CommonButton active={!filter} icon='user' content={intl.formatMessage({ id: 'allUsers' })} onClick={() => setFilter(false)}/>
            <Icon name='users' size='large' circular inverted color='blue'/>
            <CommonButton active={filter} icon='user circle' content={intl.formatMessage({ id: 'leadsOnly' })} onClick={() => setFilter(true)}/>
        </Flex>
    );

    const rightColumn = ({ group }) => {
        const filteredByLead = filter ? _.filter(users, user => user.lead && user.role_id !== roles.admin) : users;
        const filteredById = filterByRelationId(groupUsers, filteredByLead, 'group_id', _.get(group, 'id'), 'user_id');

        return (
            <div style={{ overflowY: 'auto', overflowX: 'hidden', padding: '0 3px' }}>
                {!isLead && !_.isEmpty(resetedUsers) && (
                        <>
                            <Text size='22' padding='12px 0 5px 0' truncate inverted>{intl.formatMessage({ id: 'resetPassUsers' })}</Text>
                            <Flex direction='column' height='auto' margin='23px 0 20px 0'>
                                <ResetedUsersTable users={resetedUsers}/>
                            </Flex>
                        </>
                )}
                {!isLead && !_.isEmpty(invitations) && (
                        <>
                            <Text size='22' padding='12px 0 5px 0' truncate inverted>{intl.formatMessage({ id: 'invitations' })}</Text>
                            <Flex direction='column' height='auto' margin='23px 0 20px 0'>
                                <InvitationsTable/>
                            </Flex>
                        </>
                )}
                <Grid columns={2}>
                    <Grid.Row verticalAlign='middle'>
                        <Grid.Column width={8}>
                            <Text size='22' truncate inverted>{_.get(group, 'name', intl.formatMessage({ id: 'allUsers' }))}</Text>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Flex justify='flex-end'>
                                {!isLead && <ModalInviteUser/>}
                                {/* <CommonButton margin='0 0 0 10px' icon='plus' content={intl.formatMessage({ id: 'newUser' })}/> */}
                            </Flex>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                    
                <Flex direction='column' height='auto' margin='22px 0 0 0'>
                    <UsersTable users={filteredById} isLead={isLead} />
                </Flex>
            </div>);
    };

    return (
        <PageItemsLayout leftColumn={leftColumn} rightColumn={rightColumn}/>
    );
};

Users.propTypes = {
    intl: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    invitations: PropTypes.array.isRequired,
    resetedUsers: PropTypes.array,
    isLead: PropTypes.bool,
    groupUsers: PropTypes.array.isRequired,
};

export default Users;
