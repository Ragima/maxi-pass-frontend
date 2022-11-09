import React, { useState } from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import { StyledInput } from 'styled_components/Input';
import { directToSite } from 'helpers/data/dataTransform';
import ErrorCaption from 'components/Elements/ErrorCaption';
import _ from 'lodash';
import useSetError from '../../../helpers/customHooks/useSetError';

const FieldsLine = ({ restInput, rest, onChange, showLink, value, deleteField }) => {
    const [inputValues, setInputValue, errorMessage] = useSetError();
    const [commonFieldsData, setCommonFieldsData] = useState({ label: '', value: '' });
    const [isValueChanged, setIsValueChanged] = useState(false);
    const errorMessageLabel = 'labelValidation';
    const inputValue = _.get(value, 'value', '');
    const placeholder = _.get(rest, 'placeholder');
    const errorLabelField = errorMessage && errorMessage.label && <ErrorCaption>{errorMessageLabel}</ErrorCaption>;
    const errorValueField = errorMessage && errorMessage.value && <ErrorCaption>{errorMessageLabel}</ErrorCaption>;

    const onChangeMode = (name) => (e) => {
        const value = e && e.target && e.target.value;
        onChange({}, { name, value });

        if (name === 'label') {
            setCommonFieldsData({ ...commonFieldsData, label: { name, value } });
        }
        else setCommonFieldsData({ ...commonFieldsData, value: { name, value } });

        setIsValueChanged(!isValueChanged)
        setInputValue({ inputData: { name, value }, commonFieldsData });
        return { name, value }
    };

    return (
        <Grid.Row stretched >
            <Grid.Column width={4} className='no-padding'>
                <StyledInput title={placeholder} {...restInput} {...rest} value={_.get(value, 'label', '')} name='label' onChange={onChangeMode('label')} />
                {errorLabelField}
            </Grid.Column>
            <Grid.Column width={11} className='no-right-padding'>
                <StyledInput name='value' value={_.get(value, 'value', '')} placeholder='Set value' iconPosition='left' onChange={onChangeMode('value')}>
                    <Icon name='info' />
                    <input />
                    {showLink && inputValue && <Icon name='external square alternate' className='right-icon' link onClick={() => directToSite(inputValue)} />}
                    {errorValueField}
                </StyledInput>
            </Grid.Column>
            <Grid.Column width={1} verticalAlign='middle' className='no-padding' textAlign='center'>
                <Icon name='delete' color='red' onClick={deleteField} link />
            </Grid.Column>
        </Grid.Row>
    );
};

export default FieldsLine;
