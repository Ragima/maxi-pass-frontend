import React from 'react';
import PropTypes from 'prop-types';
import { TableHeaderCell } from 'styled_components/Table';
import { Text } from 'styled_components/Text';
import { Table, Icon } from 'semantic-ui-react';
import _ from 'lodash';
import TableWrap from '../TableWrap';

const EntityTable = ({ data, intl, onSelect, fields, actionIcon, actionTitle }) => {
    const customHeader = (
        <Table.Row>
            {_.map(fields, field => <TableHeaderCell key={field.key} width={field.width}>{intl.formatMessage({ id: field.key })}</TableHeaderCell>)}
            <TableHeaderCell width={2}>{actionTitle || intl.formatMessage({ id: 'add' })}</TableHeaderCell>
        </Table.Row>
    );
    return (
        <TableWrap data={data} header={customHeader} placeholder={intl.formatMessage({ id: 'search' })} filterBy={_.map(fields, 'key')} unstackable>
            {({ data }) => _.map(data, (item, index) => (
                <Table.Row key={`item:${index}`}>
                    {_.map(fields, field => <Table.Cell key={`cell:${field.key}`}><Text notextwrap size='14' inverted>{item[field.key]}</Text></Table.Cell>)}
                    <Table.Cell textAlign='center'><Icon link name={actionIcon || 'add'} circular color='blue' inverted onClick={() => onSelect(item.id)}/></Table.Cell>
                </Table.Row>
            ))}
        </TableWrap>
    );
};

EntityTable.propTypes = {
    intl: PropTypes.object.isRequired,
    fields: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    actionTitle: PropTypes.string,
    actionIcon: PropTypes.string,
};

export default EntityTable;
