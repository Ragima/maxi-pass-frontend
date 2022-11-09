import { Form } from 'react-final-form';
import React from 'react';
import PropTypes from 'prop-types';

const FormWrap = ({ onSubmit, children, initialValues }) => {
    return (
        <Form
            onSubmit={onSubmit}
            initialValues={initialValues}
            render={({ handleSubmit, submitting, validating, values, active }) => (
                <form onSubmit={handleSubmit} autoComplete='new-password' style={{ width: '100%' }}>
                    <input autoComplete="new-password" name="password" defaultValue='something' type="password" style={{ display: 'none' }}/>
                    <input autoComplete="new-password" name="email" defaultValue='something' style={{ display: 'none' }}/>
                    {children({ isLoading: submitting, validating, values, active })}
                </form>
            )}
        />
    );
};

FormWrap.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
    children: PropTypes.any,
};

export default FormWrap;
