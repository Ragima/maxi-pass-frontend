import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyledInput } from 'styled_components/Input';
import _ from 'lodash';
import { filterData } from 'helpers/data/dataTransform';
import NoDataText from 'components/Elements/NoDataText';

const SearchWrap = ({ data, children, filterBy, placeholder }) => {
    const [search, setSearch] = useState('');
    const filteredData = filterData(data, search, filterBy);

    return (
        <>
            <StyledInput
                icon='search'
                onChange={(e, { value }) => setSearch(value)}
                fluid
                iconPosition='left'
                margin='0 0 23px 0'
                placeholder={placeholder}
            />
            {_.isEmpty(filteredData) ? <NoDataText textId='noResults'/>
                : children({ data: filteredData })}
        </>
    );
};

SearchWrap.propTypes = {
    data: PropTypes.array.isRequired,
    placeholder: PropTypes.string.isRequired,
    filterBy: PropTypes.array,
    children: PropTypes.func.isRequired,
};

export default SearchWrap;
