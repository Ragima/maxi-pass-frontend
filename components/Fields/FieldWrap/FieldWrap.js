import { Field } from 'react-final-form';
import React from 'react';
import PropTypes from 'prop-types';
import CustomInput from 'components/Fields/CustomInput';
import FileInput from 'components/Fields/FileInput';
import CustomMultipleInput from 'components/Fields/CustomMultipleInput';
import TreeField from 'components/Fields/TreeField';
import PassGenerator from 'components/Fields/PassGenerator';
import AdminCheckbox from '../../AdminCheckbox/AdminCheckbox';

const getField = (type) => {
    switch (type) {
    case 'input': return CustomInput;
    case 'multiple_input': return CustomMultipleInput;
    case 'password_generator': return PassGenerator;
    case 'checkbox': return AdminCheckbox;
    case 'tree': return TreeField;
    case 'file': return FileInput;
    default: return CustomInput;
    } 
};

const FieldWrap = ({ name, validate, pattern, component, emptyValue, initialValue, ...rest }) => {
    const CustomField = getField(component);
    const props = emptyValue ? {
        parse: null,
    } : {};
    
    return (
        <Field
            name={name}
            validate={validate}
            pattern={pattern}
            {...props}
        >
            {({ input, meta }) => <CustomField validate={validate} {...rest} input={input} meta={meta}/>}
        </Field>
    );
};

FieldWrap.propTypes = {
    label: PropTypes.string,
    component: PropTypes.string,
    placeholder: PropTypes.string,
    validating: PropTypes.bool,
};

export default FieldWrap;
