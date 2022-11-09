import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table, Responsive, Icon } from 'semantic-ui-react';
import _ from 'lodash';
import Link from 'next/link';
import roles from 'constants/userRoles';
import TableWrap from '../TableWrap';

const fields = [
    { width: 6, header: 'name', sorted: true },
    { width: 7, header: 'email', sorted: true },
    { width: 2, header: 'role_id', sorted: false },
    { width: 1, header: 'reset', sorted: false },
];

const ResetedUsersTable = ({ users, intl, restoreUser }) => {
    return (
        <TableWrap data={users} fields={fields} placeholder={intl.formatMessage({ id: 'searchUsers' })} filterBy={['email', 'name', 'role_id']}>
            {({ data }) => _.map(data, user => (
                <Table.Row key={user.id}>
                    <Table.Cell>
                        {user.role_id !== roles.admin ? (
                            <Link href='/user/[id]' as={`/user/${user.id}`}>
                                <a>{user.name}</a>
                            </Link>
                        ) : user.name}
                    </Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Responsive as={Fragment} minWidth={Responsive.onlyTablet.minWidth}>
                        <Table.Cell>
                            {intl.formatMessage({ id: user.role_id })}
                        </Table.Cell>
                        <Table.Cell textAlign='center'>
                            <Icon name='redo alternate' link circular color='blue' inverted onClick={() => restoreUser({ id: user.id })}/>
                        </Table.Cell>
                    </Responsive>
                </Table.Row>
            ))}
        </TableWrap>
    );
};

ResetedUsersTable.propTypes = {
    intl: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    restoreUser: PropTypes.func.isRequired,
};

export default ResetedUsersTable;
