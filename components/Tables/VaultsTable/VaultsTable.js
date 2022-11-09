import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table, Responsive } from 'semantic-ui-react';
import _ from 'lodash';
import Link from 'next/link';
import { formatDate } from 'helpers/data/dataTransform';
import TableWrap from '../TableWrap';
import VaultTablePopup from '../VaultsTablePopup';


const fields = [
    { width: 5, header: 'title', sorted: true },
    { width: 4, header: 'created_at', sorted: true },
    { width: 4, header: 'updated_at', sorted: true },
    { width: 2, header: 'items', sorted: true },
    { width: 1, header: 'actions', sorted: false },
];

const VaultsTable = ({ data, intl, showVaultItems, deleteVault, users }) => {
    return (
        <TableWrap sortable data={data} fields={_.dropRight(fields, showVaultItems ? 1 : 0)} placeholder={intl.formatMessage({ id: 'searchVaults' })} filterBy={['title']}>
            {({ data }) => _.map(data, vault => (
                <Table.Row key={vault.id}>
                    <Table.Cell>
                        <Link
                            as={`${(showVaultItems || vault.personal) ? '/vault_items' : '/vault'}/${vault.id}`}
                            href={`${(showVaultItems || vault.personal) ? '/vault_items' : '/vault'}/[id]`}
                        >
                            <a><div>{vault.title}</div></a>
                        </Link>

                    </Table.Cell>
                    <Responsive as={Fragment} minWidth={Responsive.onlyTablet.minWidth}>
                        <Table.Cell>{formatDate(_.get(vault, 'created_at', ''))}</Table.Cell>
                        <Table.Cell>{formatDate(_.get(vault, 'updated_at', ''))}</Table.Cell>
                        <Table.Cell textAlign='center'>{vault.items || 0}</Table.Cell>
                        {!showVaultItems 
                            && (
                                <Table.Cell textAlign='center'>
                                    {vault.is_shared
                                && (
                                    <VaultTablePopup vault={vault}  deleteVault={deleteVault} data={data} users={users} intl={intl} /> 
                                )}
                                </Table.Cell>
                            )
                        }
                    </Responsive>
                </Table.Row>
            ))}
        </TableWrap>
    );
};

VaultsTable.propTypes = {
    intl: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
    deleteVault: PropTypes.func.isRequired,
    showVaultItems: PropTypes.bool,
};

export default VaultsTable;
