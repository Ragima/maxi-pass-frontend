import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { TableHeaderCell } from 'styled_components/Table';
import { Text } from 'styled_components/Text';
import { Flex } from 'styled_components/Flexbox';
import { StyledCheckbox } from 'styled_components/Checkbox';
import { Table, Responsive } from 'semantic-ui-react';
import _ from 'lodash';

const ActivitiesSettingsTable = ({ settings, intl, markActivity, unmarkActivity }) => {
    const [data, setData] = useState(settings);
    const [isLoading, setLoading] = useState(null);

    const actions = _.uniq(_.map(settings, 'action_type'));
    const types = _.orderBy(_.uniq(_.map(settings, 'entity_type')), 'length');

    const handleChange = async (item) => {
        const request = item.active_status ? unmarkActivity : markActivity;
        setLoading(item.id);
        try {
            await request({ id: item.id });
            const newData = _.map(data, setting => ({ ...setting, active_status: setting.id === item.id ? !setting.active_status : setting.active_status })); 
            setData(newData);
        } catch {
            return false;
        } finally {
            setLoading(null);
        }
    }; 

    const getItem = (type, action) => _.find(data, { action_type: action, entity_type: type });

    return (
        <Flex direction='column' justify='flex-start' overflowy>  
            <Responsive as={Fragment} minWidth={Responsive.onlyTablet.minWidth}>
                <Table celled size='small'>
                    <Table.Row>
                        <TableHeaderCell width={2}>Action</TableHeaderCell>
                        {_.map(types, item => <TableHeaderCell width={2} textAlign='center' key={item}>{item}</TableHeaderCell>)}
                    </Table.Row>
                    <Table.Body>
                        {_.map(actions, action => (
                            <Table.Row key={action}>
                                <Table.Cell>
                                    {action}
                                </Table.Cell>
                                {_.map(types, (type) => {
                                    const item = getItem(type, action);
                                    return (
                                        <Table.Cell key={`${type}:${action}`} textAlign='center'>
                                            {item && <StyledCheckbox disabled={item.id === isLoading} onChange={() => handleChange(item)} checked={_.get(item, 'active_status', false)}/>}
                                        </Table.Cell>);
                                })}
                            </Table.Row>))}
                    </Table.Body>
                </Table>
            </Responsive>
            <Responsive as={Fragment} maxWidth={Responsive.onlyTablet.minWidth} >
                <Text size='22' inverted padding='10px'>{intl.formatMessage({ id: 'unavailableMobile' })}</Text>
            </Responsive>
        </Flex>
    );
};

ActivitiesSettingsTable.propTypes = {
    settings: PropTypes.array,
    intl: PropTypes.object,
    markActivity: PropTypes.func.isRequired,
    unmarkActivity: PropTypes.func.isRequired,
};

ActivitiesSettingsTable.defaultProps = {
    settings: [],
};

export default ActivitiesSettingsTable;
