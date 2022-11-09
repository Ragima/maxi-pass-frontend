import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { redirect } from 'helpers/auth/redirect';

const languageOptions = [
    { key: 'en', text: 'English', value: 'en', flag: 'us' },
    { key: 'ru', text: 'Русский', value: 'ru', flag: 'ru' },
];

const LanguageSelector = ({ intl, language, updateSettings }) => {
    const handleChange = async (e, { value }) => {
        await updateSettings({ user: { locale: value } });
        redirect('/');
    };

    return (
        <Dropdown
            value={language}
            options={languageOptions}
            onChange={handleChange}
            selection
            text={intl.formatMessage({ id: 'selectLanguage' })}
        />
    );
};

LanguageSelector.propTypes = {
    intl: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    updateSettings: PropTypes.func.isRequired,
};

export default LanguageSelector;
