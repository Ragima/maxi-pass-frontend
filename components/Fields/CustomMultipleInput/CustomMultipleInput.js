import React from 'react';
import { StyledGridInput } from 'styled_components/Grid';
import { Flex } from 'styled_components/Flexbox';
import ErrorCaption from 'components/Elements/ErrorCaption';
import PropTypes from 'prop-types';
import _ from 'lodash';
import FieldsLine from 'components/Fields/FieldsLine';

const CustomMultipleInput = ({ input: { onChange, value: formValue = {}, ...restInput }, meta, showLink, ...rest }) => {
    const isError = !!(meta.touched && meta.error);

    const deleteField = field => () => {
        onChange(_.omit(formValue, field));
    };

    const getFields = () => {
        const keys = _.keys(formValue);
        return [...keys, (+_.last(keys) || 0) + 1];
    };

    const handleChange = field => (e, { name, value }) => {
        onChange({ ...formValue, [field]: { ..._.get(formValue, field, {}), [name]: value } });
    };

    return (
        <Flex direction='column' margin='20px 0' relative padded={false} height='auto'>
            <StyledGridInput columns='equal'>
                {_.map(getFields(), field => (
                    <FieldsLine
                        key={field}
                        deleteField={deleteField(field)}
                        restInput={restInput}
                        rest={rest}
                        showLink={showLink}
                        value={formValue[field]}
                        onChange={handleChange(field)}
                    />
                ))}
            </StyledGridInput>
            {isError && <ErrorCaption>{meta.error}</ErrorCaption>}
        </Flex>
    );
};

CustomMultipleInput.propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    label: PropTypes.string,
    showLink: PropTypes.bool,
};

export default CustomMultipleInput;
