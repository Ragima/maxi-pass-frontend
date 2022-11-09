import React from 'react';
import { Flex } from 'styled_components/Flexbox';
import PropTypes from 'prop-types';
import Tree from 'components/Elements/Tree';
import ErrorCaption from 'components/Elements/ErrorCaption';

const TreeField = ({ meta, input, ...rest }) => {
    const handleChange = data => input.onChange(data && data.id);
    const isError = !!(meta.touched && meta.error);

    return (
        <Flex direction='column' margin='20px 0' relative>
            <Tree {...rest} onSelect={handleChange} field/>
            {isError && <ErrorCaption>{meta.error}</ErrorCaption>}
        </Flex>
    );
};

TreeField.propTypes = {
    input: PropTypes.object.isRequired,
};

export default TreeField;
