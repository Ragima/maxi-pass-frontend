import React from 'react';
import { Flex } from 'styled_components/Flexbox';
import { Text } from 'styled_components/Text';
import SearchWrap from 'components/Elements/SearchWrap';
import PropTypes from 'prop-types';
import _ from 'lodash';

const ItemListWrap = ({ data, children, intl, keyName, modalComponent, searchKey, filterBy, withSearch }) => { 
    const childrenData = items => (
        <div style={{ overflowY: 'auto', maxHeight: '100%', width: '100%', padding: '0 3px' }}>
            {children(_.orderBy(items, ['name', 'title']))}
        </div>);

    return (
        <Flex direction='column' justify='flex-start'>
            <Flex align='baseline' margin='0 0 15px 0' height='initial'>
                <Text size='22' padding='5px 0' inverted>{intl.formatMessage({ id: keyName }, { count: _.size(data) })}</Text>
                {modalComponent}
            </Flex>
            {withSearch
                ? (
                    <SearchWrap data={data} placeholder={intl.formatMessage({ id: searchKey })} filterBy={_.map(filterBy, 'key')}>
                        {({ data }) => childrenData(data)}
                    </SearchWrap>
                )
                : childrenData(data)}
            
        </Flex>
    );
};

ItemListWrap.propTypes = {
    data: PropTypes.array,
    keyName: PropTypes.string.isRequired,
    modalComponent: PropTypes.any,
    filterBy: PropTypes.array,
    withSearch: PropTypes.bool,
    searchKey: PropTypes.string,
    children: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
};

ItemListWrap.defaultProps = {
    data: [],
};

export default ItemListWrap;
