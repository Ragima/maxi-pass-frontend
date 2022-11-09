import React, { useState } from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import CommonButton from 'components/Elements/CommonButton';
import { Text } from 'styled_components/Text';
import { Flex } from 'styled_components/Flexbox';
import VaultsTable from 'components/Tables/VaultsTable';
import _ from 'lodash';
import PageItemsLayout from 'components/Layouts/PageItemsLayout';
import PropTypes from 'prop-types';
import ModalAddVault from 'components/Modals/ModalAddVault';
import roles from 'constants/userRoles';
import { filterByRelation, filterByRelationId } from 'helpers/data/dataTransform';

const Vaults = ({ intl, vaults, role, groupVaults }) => {
    const [filter, setFilter] = useState(true);

    const leftColumn = () => (
        <Flex height='auto' padding='0 0 20px 0'>
            <CommonButton active={filter} icon='user' content={intl.formatMessage({ id: 'allVaults' })} onClick={() => setFilter(true)}/>
            <Icon name='archive' size='large' circular inverted color='blue'/>
            <CommonButton active={!filter} icon='users' content={intl.formatMessage({ id: 'withGroups' })} onClick={() => setFilter(false)}/>
        </Flex>
    );

    const rightColumn = ({ group }) => {
        const filteredByRelation = !filter ? filterByRelation(vaults, groupVaults, 'vault_id') : vaults;
        const filteredById = filterByRelationId(groupVaults, filteredByRelation, 'group_id', _.get(group, 'id'), 'vault_id');
        return (
        <>
            <Grid columns={2}>
                <Grid.Row verticalAlign='middle'>
                    <Grid.Column width={8}>
                        <Text size='22' truncate inverted>
                            {_.get(group, 'name') || intl.formatMessage({ id: 'allVaults' })}
                        </Text>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Flex justify='flex-end'>
                            <ModalAddVault/>
                        </Flex>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Flex overflowy direction='column' height='auto' margin='22px 0 0 0'>
                <VaultsTable showVaultItems={role === roles.user} data={filteredById}/>

            </Flex>
        </>
        );
    };

    return (
        role !== roles.user ? <PageItemsLayout leftColumn={leftColumn} rightColumn={rightColumn}/> : <VaultsTable showVaultItems={role === roles.user} data={vaults}/>
    );
};

Vaults.propTypes = {
    intl: PropTypes.object.isRequired,
    role: PropTypes.string.isRequired,
    vaults: PropTypes.array.isRequired,
    groupVaults: PropTypes.array.isRequired,
};

export default Vaults;
