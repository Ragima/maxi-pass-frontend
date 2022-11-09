import React, { Fragment } from 'react';
import { Table, Responsive } from 'semantic-ui-react';
import _ from 'lodash';
import Link from 'next/link';
import roles from 'constants/userRoles';
import PropTypes from "prop-types";
import TableWrap from '../TableWrap';
import UsersActionsButton from "./UsersActionsButton";

const fields = [
    { width: 7, header: 'name', sorted: true },
    { width: 6, header: 'email', sorted: true },
    { width: 2, header: 'role_id', sorted: false },
    { width: 1, header: 'actions', sorted: false },
];

const UsersTable = (props) => {
    const { intl, users } = props;
    const filterBy = ['email', 'name', 'role_id'];
    return (
        <TableWrap
            sortable
            data={users}
            fields={fields}
            placeholder={intl.formatMessage({ id: 'searchUsers' })}
            filterBy={filterBy}
        >
            {({ data }) => _.map(data, user => (
                <Table.Row key={user.id} negative={user.blocked}>
                    <Table.Cell>
                        {user.role_id !== roles.admin ? (
                            <Link href='/user/[id]' as={`/user/${user.id}`}>
                                <a>{user.name}</a>
                            </Link>
                        ) : user.name}
                    </Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Responsive as={Fragment} minWidth={Responsive.onlyTablet.minWidth}>
                        <Table.Cell textAlign='center'>
                            {intl.formatMessage({ id: user.extension_access ? 'extUser' : user.role_id })}
                        </Table.Cell>
                        <Table.Cell textAlign='center'>
                            <UsersActionsButton users={users} user={user} />
                        </Table.Cell>
                    </Responsive>
                </Table.Row>
            ))}
        </TableWrap>
    );
};

UsersTable.propTypes = {
    intl: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
};

export default UsersTable;
