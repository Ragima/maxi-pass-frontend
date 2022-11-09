import _get from 'lodash/get';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CustomCheckbox from '../Fields/CustomCheckbox';

const AdminCheckbox = ({ input, meta, label, ...rest }) => {
    const [isAdminChecked, setIsAdminChecked] = useState(_get(rest, 'isChecked'));

    const handleCheckboxChange = (checked) => {
        setIsAdminChecked(!isAdminChecked);
        input.onChange(checked);
    };

    return (
        <CustomCheckbox isChecked={isAdminChecked} onChange={handleCheckboxChange} input={input} meta={meta} label={label}  />
    );
};

AdminCheckbox.propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
};

export default AdminCheckbox;
