import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { Text } from 'styled_components/Text';
import { FlexItem, Flex } from 'styled_components/Flexbox';
import _ from 'lodash';
import { StyledInput } from 'styled_components/Input';
import Link from 'next/link';
import itemTypes from 'constants/itemTypes';
import PropTypes from 'prop-types';

const icons = {
    [itemTypes.server]: 'server',
    [itemTypes.card]: 'credit card outline',
    [itemTypes.login]: 'lock',
};

const Items = ({ item, items, vault, intl }) => {
    const [search, setSearch] = useState('');

    return (
        <>
            <Text size='22' inverted padding='0 5px 10px 5px'>{intl.formatMessage({ id: 'items' })}</Text>
            <StyledInput
                icon='search'
                onChange={(e, { value }) => setSearch(value)}
                fluid
                iconPosition='left'
                margin='0 0 10px 0'
                placeholder={intl.formatMessage({ id: 'searchItems' })}
            />
            <div style={{ overflowY: 'auto' }}>
                {_.map(_.filter(items, item => _.toLower(item.title).includes(_.toLower(search))), filteredItem => (
                    <Link
                        as={`/vault_items/${vault.id}/${filteredItem.type}/${filteredItem.id}`}
                        href='/vault_items/[id]/[form]/[item_id]'
                        key={filteredItem.id}
                    >
                        <Flex height='auto'>
                            <FlexItem active={filteredItem.id === item.id} justify='space-between' padding='5px'>
                                <Icon className='flex-solid' name={icons[filteredItem.type]} circular inverted color='blue'/>
                                <Text className='flex-stretched' truncate size='16' auto bold inverted={filteredItem.id !== item.id}>{filteredItem.title}</Text>
                            </FlexItem>
                        </Flex>
                    </Link>
                ))}
            </div>
        </>
    );
};

Items.propTypes = {
    item: PropTypes.object,
    intl: PropTypes.object.isRequired,
    vault: PropTypes.object,
    items: PropTypes.array,
};

Items.defaultProps = {
    item: {},
    vault: {},
    items: [],
};

export default Items;
