import React, { useEffect, useState } from 'react';

function checkValue(data) {
    if (data) {
        if (data.inputData && data.inputData.name === 'label' && data.inputData.value !== '' && data.commonFieldsData.value.value === '') {
            return { label: '', value: 'labelValidation' };
        } else if (data.inputData && data.inputData.name === 'label' && data.inputData.value === ''  && data.commonFieldsData.value.value ===  '') {
            return { label: 'labelValidation', value: 'labelValidation' };
        } else if (data.inputData && data.inputData.name === 'value' && data.inputData.value !== '' && data.commonFieldsData.label.value === '' ) {
            return { label: 'labelValidation', value: '' };
        } else if (data.inputData && data.inputData.name === 'value' && data.inputData.value === ''  && data.commonFieldsData.label.value === '' ) {
            return { label: 'labelValidation', value: 'labelValidation' };
        }
        else return { label: '', value: '' };
    };
};

export default function useSetError() {
    const [inputValue, setInputValue] = useState({ name: '', value: '' });
    const [errorMessage, setErrorMessage] = useState({ label: '', value: '' });
    useEffect(() => {
        const error = checkValue(inputValue, errorMessage);
        setErrorMessage(error)
    }, [inputValue]);
    return [inputValue, setInputValue, errorMessage];
}; 
