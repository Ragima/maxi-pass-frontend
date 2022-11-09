import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Responsive } from 'semantic-ui-react';
import SearchWrap from 'components/Elements/SearchWrap/SearchWrap';
import _ from 'lodash';
import { TableHeaderCell } from 'styled_components/Table';

const TableWrap = ({ data: tableData, placeholder, children, header, intl, filterBy, unstackable, fields, ...rest }) => {
    const [field, setField] = useState(null);
    const [direction, setDirection] = useState('ascending');

    const handleSort = clickedColumn => () => {    
        setField(clickedColumn);
        setDirection(direction === 'ascending' ? 'descending' : 'ascending');
    };

    const sortData = (data) => {
        const shortDirection = _.replace(direction, 'ending', '');
        return _.orderBy(data, [field], [shortDirection]);
    };

    const defaultHeader = (
        <Table.Row>
            {_.map(fields, ({ width, header, sorted }) => (
                <TableHeaderCell
                    sorted={sorted && field === header ? direction : null}
                    onClick={sorted ? handleSort(header) : undefined}
                    key={header}
                    sortable={sorted}
                    width={width}
                >
                    {intl.formatMessage({ id: header })}
                </TableHeaderCell>
            ))}
        </Table.Row>
    );

    return (
        <SearchWrap data={sortData(tableData)} placeholder={placeholder} filterBy={filterBy}>
            {({ data }) => (
                <div style={{ overflowY: 'auto', width: '100%' }}> 
                    <Table celled unstackable={unstackable} {...rest}>
                        <Responsive as={Fragment} minWidth={Responsive.onlyTablet.minWidth}>
                            <Table.Header>
                                {header || defaultHeader}
                            </Table.Header>
                        </Responsive>
                        <Table.Body>
                            {children({ data })}
                        </Table.Body>
                    </Table>
                </div>
            )}
        </SearchWrap>
    );
};

TableWrap.propTypes = {
    data: PropTypes.array.isRequired,
    filterBy: PropTypes.array,
    unstackable: PropTypes.bool,
    placeholder: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
    header: PropTypes.any,
    intl: PropTypes.object.isRequired,
};

export default TableWrap;
