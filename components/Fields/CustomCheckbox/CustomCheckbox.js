import React from 'react';
import { Flex } from 'styled_components/Flexbox';
import { Checkbox } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const CustomCheckbox = ({ input: { value, ...restInput }, isChecked, onChange, meta, label, ...rest }) => {
    
    const handleChange = (e, { checked }) => {
        onChange(checked);
    };

    return (
        <Flex margin="12px 0" justify="flex-start" relative height="auto" >
            <Checkbox {...rest} {...restInput} label={label} checked={isChecked} onChange={handleChange} />
        </Flex>
    );
};

CustomCheckbox.propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    isChecked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
};

export default CustomCheckbox;
