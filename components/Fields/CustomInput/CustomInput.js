import React, { useRef } from 'react';
import { StyledInput } from 'styled_components/Input';
import { Flex } from 'styled_components/Flexbox';
import ErrorCaption from 'components/Elements/ErrorCaption';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import { copyToClipboard, directToSite } from 'helpers/data/dataTransform';
import _ from 'lodash';

const CustomInput = ({ onChange, formatValue, input, meta, icon, withCopy, showLink, ...rest }) => {
    const isError = !!(meta.touched && meta.error);
    const inputNode = useRef(null);

    const placeholder = _.get(rest, 'placeholder');

    const handleChange = (e, { value }) => input.onChange(formatValue(value));

    return (
        <Flex direction='column' margin='20px 0' relative height='auto'>
            <StyledInput {...rest} {...input} onChange={handleChange} error={isError} offset={(withCopy || showLink) ? '30px' : '0'} title={placeholder}>
                <Icon name={icon}/>
                <input ref={inputNode}/>
                {withCopy && <Icon name='copy outline' onClick={() => copyToClipboard(inputNode)} link className='right-icon'/>}
                {showLink && input.value && <Icon name='external square alternate' className='right-icon' link onClick={() => directToSite(input.value)}/>}
            </StyledInput>
            {isError && <ErrorCaption>{meta.error}</ErrorCaption>}
        </Flex>
    );
};

CustomInput.propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    label: PropTypes.string,
    formatValue: PropTypes.func,
};

CustomInput.defaultProps = {
    formatValue: a => a,
};

export default CustomInput;
