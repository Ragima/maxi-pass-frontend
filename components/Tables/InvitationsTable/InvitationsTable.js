import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table, Responsive, Icon } from 'semantic-ui-react';
import _ from 'lodash';
import ConfirmModal from 'components/Modals/ConfirmModal';
import { formatDate } from 'helpers/data/dataTransform';
import TableWrap from '../TableWrap';

const fields = [
    { width: 5, header: 'email', sorted: true },
    { width: 5, header: 'invited_by_name', sorted: true },
    { width: 4, header: 'accept_to', sorted: true },
    { width: 1, header: 'resend', sorted: false },
    { width: 1, header: 'delete', sorted: false },
];

const InvitationsTable = ({ invitations, intl, deleteInvitation, resendInvitation }) => {
    return (
        <TableWrap sortable data={invitations} fields={fields} placeholder={intl.formatMessage({ id: 'searchInvitations' })} filterBy={['email']}>
            {({ data }) => _.map(data, invitation => (
                <Table.Row key={invitation.id}>
                    <Table.Cell>{invitation.email}</Table.Cell>
                    <Responsive as={Fragment} minWidth={Responsive.onlyTablet.minWidth}>
                        <Table.Cell>{invitation.invited_by_name}</Table.Cell>
                        <Table.Cell>{formatDate(_.get(invitation, 'accept_to', ''))}</Table.Cell>
                        <Table.Cell textAlign='center'>
                            <Icon
                                link
                                name='redo alternate'
                                circular
                                color='blue'
                                inverted
                                onClick={() => resendInvitation({ id: invitation.id })}
                            />

                        </Table.Cell>
                        <Table.Cell textAlign='center'>
                            <ConfirmModal
                                trigger={<Icon name='delete' link circular color='red' inverted/>}
                                callback={() => deleteInvitation({ id: invitation.id })}
                            />
                        </Table.Cell>
                    </Responsive>
                </Table.Row>
            ))}
        </TableWrap>
    );
};

InvitationsTable.propTypes = {
    intl: PropTypes.object.isRequired,
    invitations: PropTypes.array.isRequired,
    deleteInvitation: PropTypes.func.isRequired,
    resendInvitation: PropTypes.func.isRequired,
};

export default InvitationsTable;
