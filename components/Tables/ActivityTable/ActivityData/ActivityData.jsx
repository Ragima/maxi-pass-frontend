import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { TableHeaderCell } from 'styled_components/Table';
import { Flex } from 'styled_components/Flexbox';
import { Table, Responsive } from 'semantic-ui-react';
import _ from 'lodash';
import { formatDate } from 'helpers/data/dataTransform';

export const parseActivity = data => _.join(_.filter(data, (value, key) => key.match(/(?:subj|actor).*_(?:title|email|action)/)), ' ');

const ActivityData = ({ data, intl }) => {
    return (
        <Flex direction='column' overflowy>  
            <Table celled>
                <Responsive as={Fragment} minWidth={Responsive.onlyTablet.minWidth}>
                    <Table.Row>
                        <TableHeaderCell width={6}>{intl.formatMessage({ id: 'activity' })}</TableHeaderCell>
                        <TableHeaderCell width={2}>{intl.formatMessage({ id: 'type' })}</TableHeaderCell>
                        <TableHeaderCell width={2}>{intl.formatMessage({ id: 'action' })}</TableHeaderCell>
                        <TableHeaderCell width={3}>{intl.formatMessage({ id: 'date' })}</TableHeaderCell>
                        <TableHeaderCell width={3}>{intl.formatMessage({ id: 'actor' })}</TableHeaderCell>
                    </Table.Row>
                </Responsive>
                <Table.Body>
                    {_.map(data, activity => (
                        <Table.Row key={activity.id}>
                            <Table.Cell>{parseActivity(activity)}</Table.Cell>
                            <Responsive as={Fragment} minWidth={Responsive.onlyTablet.minWidth}>
                                <Table.Cell>{activity.action_type}</Table.Cell>
                                <Table.Cell>{activity.action_act}</Table.Cell>
                                <Table.Cell>{formatDate(_.get(activity, 'updated_at', ''))}</Table.Cell>
                                <Table.Cell>{activity.actor_email}</Table.Cell>
                            </Responsive>
                        </Table.Row>))}
                </Table.Body>
            </Table>
        </Flex>
    );
};

ActivityData.propTypes = {
    data: PropTypes.array.isRequired,
    intl: PropTypes.object.isRequired,
};

export default ActivityData;
