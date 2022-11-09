import React from 'react';
import { Flex } from 'styled_components/Flexbox';
import FormWrap from 'components/Forms/FormWrap';
import FieldWrap from 'components/Fields/FieldWrap';
import { SubmitButton } from 'styled_components/Button';
import PropTypes from 'prop-types';
import { Divider } from 'semantic-ui-react';
import _ from 'lodash';
import { onFormItemSubmit } from 'helpers/data/itemsSubmit';
import itemTypes from 'constants/itemTypes';
import validations from 'helpers/data/validations';

const AddLoginItemForm = ({ intl, editVaultItem, createVaultItem, update, initialValues, id, vaultId, updatable, dropFields, only_for_admins }) => {
    
    const handleSubmit = async (data) => {
        await onFormItemSubmit(data, { editVaultItem, createVaultItem, update, id, type: itemTypes.login, vaultId, only_for_admins }, ['web_addresses', 'labels']);
    };
    const fields = [
        { validate: validations.vaultItemTitle, name: 'title', icon: 'address card', iconPosition: 'left', placeholder: intl.formatMessage({ id: 'title' }) },
        { validate: validations.vaultItemTags, name: 'tags', icon: 'tags', iconPosition: 'left', placeholder: intl.formatMessage({ id: 'tags' }) },
        { validate: validations.dynamicField, name: 'company', withCopy: update, icon: 'briefcase', iconPosition: 'left', placeholder: intl.formatMessage({ id: 'company' }) },
        { validate: validations.dynamicField, name: 'username', withCopy: update, icon: 'user', iconPosition: 'left', placeholder: intl.formatMessage({ id: 'username' }) },
        { validate: validations.passwordGenerator, name: 'password', withCopy: update, icon: 'lock', iconPosition: 'left', placeholder: intl.formatMessage({ id: 'password' }), component: 'password_generator' },
        null,
        { validate: validations.dynamicField, showLink: true, name: 'web_address', icon: 'globe', iconPosition: 'left', placeholder: intl.formatMessage({ id: 'webSites' }) },
        { validate: validations.dynamicField, showLink: true, name: 'login_page', icon: 'globe', iconPosition: 'left', placeholder: intl.formatMessage({ id: 'loginPage' }) },
        { validate: validations.dynamicField, showLink: true, name: 'change_password_page', icon: 'globe', iconPosition: 'left', placeholder: intl.formatMessage({ id: 'changePassPage' }) },
        { validate: validations.dynamicField, name: 'username_field', iconPosition: 'left', icon: 'terminal', placeholder: intl.formatMessage({ id: 'usernameField' }) },
        { validate: validations.dynamicField, name: 'password_field', iconPosition: 'left', icon: 'terminal', placeholder: intl.formatMessage({ id: 'passwordField' }) },
        { validate: validations.dynamicField, name: 'company_field', iconPosition: 'left', icon: 'terminal', placeholder: intl.formatMessage({ id: 'companyField' }) },
        null,
        { validate: validations.dynamicField, showLink: true, name: 'web_addresses', icon: 'globe', iconPosition: 'left', placeholder: intl.formatMessage({ id: 'webSites' }), component: 'multiple_input' },
        { validate: validations.label, name: 'labels', icon: 'audio description', iconPosition: 'left', placeholder: intl.formatMessage({ id: 'labels' }), component: 'multiple_input' },
        { validate: validations.notes, name: 'notes', icon: 'sticky note', iconPosition: 'left', placeholder: intl.formatMessage({ id: 'notes' }) },
        { name: 'only_for_admins', 'isChecked': only_for_admins, label: intl.formatMessage({ id: 'onlyAdmin'}), component: 'checkbox' },
    ];

    return (
        <Flex direction='column' padding='3px' overflowy>
            <FormWrap onSubmit={handleSubmit} initialValues={initialValues}>
                {({ isLoading }) => (
                    <>
                        {_.map(_.dropRight(fields, dropFields), (field, index) => (field ? <FieldWrap key={field.name} {...field} emptyValue/> : <Divider key={index}/>))}
                        {updatable && (
                            <SubmitButton
                                loading={isLoading}
                                disabled={isLoading}
                                compact
                                form
                            >
                                {intl.formatMessage({ id: update ? 'updateLoginItem' : 'addLoginItem' })}
                            </SubmitButton>
                        )}
                </>)
                }
                
            </FormWrap>
        </Flex>
    );
};

AddLoginItemForm.propTypes = {
    intl: PropTypes.object.isRequired,
    editVaultItem: PropTypes.func.isRequired,
    createVaultItem: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
    id: PropTypes.number,
    vaultId: PropTypes.string.isRequired,
    updatable: PropTypes.bool,
    update: PropTypes.bool,
    dropFields: PropTypes.number,
    only_for_admins:PropTypes.bool.isRequired,
};

export default AddLoginItemForm;
