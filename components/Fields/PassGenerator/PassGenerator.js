import React, { useState, useRef } from 'react';
import { StyledInput, StyledProgress } from 'styled_components/Input';
import { Flex } from 'styled_components/Flexbox';
import ErrorCaption from 'components/Elements/ErrorCaption';
import PropTypes from 'prop-types';
import { Icon, Popup } from 'semantic-ui-react';
import GeneratePassForm from 'components/Forms/GeneratePassForm';
import { passwordStrength } from 'helpers/data/generator';
import { copyToClipboard } from 'helpers/data/dataTransform';
import _ from 'lodash';

export const getProgressData = (pass) => {
    const percent = passwordStrength(pass) * 20;
    let color = 'red';
    if (percent === 40) {
        color = 'orange';
    } else if (percent === 60) {
        color = 'yellow';
    } else if (percent === 80) {
        color = 'olive';
    } else if (percent === 100) {
        color = 'green';
    }
    return { percent, color };
};

const PassGenerator = ({ input, meta, icon, withCopy, ...rest }) => {
    const isError = !!(meta.touched && meta.error);
    const setPassword = pass => input.onChange(pass);
    const [type, setType] = useState('password');
    const inputNode = useRef(null);

    const placeholder = _.get(rest, 'placeholder');
    const toggleType = () => setType(type ? '' : 'password');

    return (
        <Flex direction='column' margin='20px 0' relative height='auto'>
            <StyledInput {...rest} {...input} error={isError} type={type} offset={withCopy ? '90px' : '60px'} title={placeholder}>
                <Icon name={icon}/>
                <input ref={inputNode}/>
                <Icon name={type ? 'eye' : 'eye slash'} className='eye-icon' link onClick={toggleType}/>
                <Popup trigger={<Icon name='key' link className='right-icon'/>} hoverable on='click'>
                    <Popup.Content>
                        <GeneratePassForm onSubmit={setPassword}/>
                    </Popup.Content>
                </Popup>
                {withCopy && <Icon name='copy outline' onClick={() => copyToClipboard(inputNode)} link className='copy-icon'/>}
            </StyledInput>
            {isError && <ErrorCaption>{meta.error}</ErrorCaption>}
            <StyledProgress {...getProgressData(input.value)} size='tiny'/>
        </Flex>
    );
};

PassGenerator.propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    label: PropTypes.string,
};

export default PassGenerator;
