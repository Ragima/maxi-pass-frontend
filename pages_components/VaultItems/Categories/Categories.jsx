import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Text } from 'styled_components/Text';
import { FlexItem, Flex } from 'styled_components/Flexbox';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Link from 'next/link';
import itemTypes from 'constants/itemTypes';

const categories = [
    { title: 'allItems', icon: 'list', filter: '' },
    { title: 'logins', icon: 'lock', filter: itemTypes.login },
    { title: 'creditCards', icon: 'credit card outline', filter: itemTypes.card },
    { title: 'servers', icon: 'server', filter: itemTypes.server },
];


const Categories = ({ category, setCategory, tags, vault, intl }) => {
    return (
        <>
            <Text size='22' inverted padding='0 5px 10px 5px'>{intl.formatMessage({ id: 'categories' })}</Text>
            {_.map(categories, cat => (
                <Flex height='auto' key={cat.icon}>
                    <FlexItem margin='0 10px 0 0' active={category.value === cat.filter} justify='flex-start' padding='5px' onClick={() => setCategory({ value: cat.filter, type: 'type' })}>
                        <Icon name={cat.icon} circular inverted color='blue'/>
                        <Text size='16' bold inverted={category.value !== cat.filter}>{intl.formatMessage({ id: cat.title })}</Text>
                    </FlexItem>
                    {vault.updatable && (
                        <Link href='/vault_items/[id]/[form]' as={`/vault_items/${vault.id}/${cat.filter}`}>
                            <Icon name={cat.filter && 'add'} size='large' link color='blue'/>
                        </Link>
                    )}
                </Flex>
            ))}
            <Text size='22' inverted padding='25px 5px 10px 5px'>{intl.formatMessage({ id: 'tags' })}</Text>
            <div style={{ overflowY: 'auto' }}>
                {_.map(tags, tag => (
                    <FlexItem key={tag} active={category.value === tag} justify='flex-start' padding='5px' onClick={() => setCategory({ value: tag, type: 'tags' })}>
                        <Icon name='tag' circular inverted color='blue'/>
                        <Text auto size='16' truncate bold inverted={category !== tag}>{tag}</Text>
                    </FlexItem>
                ))}
            </div>
        </>
    );
};

Categories.propTypes = {
    setCategory: PropTypes.func.isRequired,
    category: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
};

export default Categories;
