import React from 'react';
import { Flex } from 'styled_components/Flexbox';
import { FormContainer } from 'styled_components/Container';
import FormWrap from 'components/Forms/FormWrap';
import FieldWrap from 'components/Fields/FieldWrap';
import { SubmitButton } from 'styled_components/Button';
import PropTypes from 'prop-types';
import { generatePassword } from 'helpers/data/generator';

export const formatValue = (value) => {
    if (value > 128) return 128;
    if (value < 0) return 0;
    return value;
};

const GeneratePassForm = ({ intl, onSubmit }) => {
    const handleSubmit = (data) => {
        const password = generatePassword(data);
        if (onSubmit) onSubmit(password);
    };

    return (
        <Flex direction='column'>
            <FormContainer>
                <FormWrap onSubmit={handleSubmit} initialValues={{ length: 20, upper: true, digits: true, symbols: true }}>
                    {({ isLoading }) => (
                        <>
                            <FieldWrap formatValue={formatValue} name='length' type='number' icon='resize horizontal' iconPosition='left' placeholder={intl.formatMessage({ id: 'title' })} component='input'/>
                            <FieldWrap name='upper' label={intl.formatMessage({ id: 'upper' })} component='checkbox'/>
                            <FieldWrap name='digits' label={intl.formatMessage({ id: 'digits' })} component='checkbox'/>
                            <FieldWrap name='symbols' label={intl.formatMessage({ id: 'symbols' })} component='checkbox'/>
                            <SubmitButton loading={isLoading} disabled={isLoading} compact>{intl.formatMessage({ id: 'generate' })}</SubmitButton>
                    </>)
                    }
                   
                </FormWrap>
            </FormContainer>
        </Flex>
    );
};

GeneratePassForm.propTypes = {
    intl: PropTypes.object.isRequired,
    onSubmit: PropTypes.func,
};

export default GeneratePassForm;
