import React from 'react';
import { Flex } from 'styled_components/Flexbox';
import FormWrap from 'components/Forms/FormWrap';
import FieldWrap from 'components/Fields/FieldWrap';
import { SubmitButton } from 'styled_components/Button';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { onFormItemSubmit } from 'helpers/data/itemsSubmit';
import itemTypes from 'constants/itemTypes';
import validations from 'helpers/data/validations';
import FileManager from 'helpers/data/fileManager';
import { redirect } from 'helpers/auth/redirect';

const AddServerItemForm = ({ intl, editVaultItem, createVaultItem, update,
    initialValues, id, vaultId, updatable, dropFields, documentMethods, only_for_admins }) => {
    const handleSubmit = async (data) => {
        const response = await onFormItemSubmit(_.omit(data, ['document']),
            { editVaultItem, createVaultItem, update, id, type: itemTypes.server, vaultId, only_for_admins, doNotRedirect: true },
            ['labels', 'web_addresses']);
        await updateDocument(data.documents, response.id);
        redirect(`/vault_items/${vaultId}/${itemTypes.server}/${response.id}`);
    };   

    const updateDocument = async (files = [], responseId) => {
        const fm = new FileManager(documentMethods);
        await fm.updateFiles({ files, params: { vaultId, id: responseId, type: itemTypes.server } });
    };
    
    const fields = [
        { validate: validations.vaultItemTitle, name: 'title', icon: 'address card', iconPosition: 'left', placeholder: intl.formatMessage({ id: 'title' }) },
        { validate: validations.vaultItemTags, name: 'tags', icon: 'tags', iconPosition: 'left', placeholder: intl.formatMessage({ id: 'tags' }) },
        { validate: validations.dynamicField, showLink: true, name: 'web_addresses', icon: 'globe', iconPosition: 'left', placeholder: intl.formatMessage({ id: 'webSites' }), component: 'multiple_input' },
        { validate: validations.dynamicField, name: 'username', withCopy: update, icon: 'user', iconPosition: 'left', placeholder: intl.formatMessage({ id: 'username' }) },
        { validate: validations.passwordGenerator, name: 'password', withCopy: update, icon: 'lock', iconPosition: 'left', placeholder: intl.formatMessage({ id: 'password' }), component: 'password_generator' },
        { validate: validations.label, name: 'labels', icon: 'audio description', iconPosition: 'left', placeholder: intl.formatMessage({ id: 'labels' }), component: 'multiple_input' },
        { validate: validations.notes, name: 'notes', icon: 'sticky note', iconPosition: 'left', placeholder: intl.formatMessage({ id: 'notes' }) },
        { validate: validations.documents,
            updatable,
            name: 'documents',
            iconPosition: 'left',
            component: 'file',
            title: intl.formatMessage({ id: 'uploadFiles' }),
            params: { vaultId, id, type: itemTypes.server },
        },
        { name: 'only_for_admins', 'isChecked': only_for_admins, label: intl.formatMessage({ id: 'onlyAdmin' }), component: 'checkbox' },
    ];

    return (
        <Flex direction='column' padding='3px' overflowy>
            
            <FormWrap onSubmit={handleSubmit} initialValues={initialValues}>
                {({ isLoading }) => (
                    <>
                        {_.map(_.dropRight(fields, dropFields), field => <FieldWrap key={field.name} {...field} emptyValue/>)}
                        {updatable && (
                            <SubmitButton
                                loading={isLoading}
                                disabled={isLoading}
                                compact
                                form
                            >
                                {intl.formatMessage({ id: update ? 'updateServerItem' : 'addServerItem' })}
                            </SubmitButton>
                        )}
                </>)
                }
                
            </FormWrap>
        </Flex>
    );
};

AddServerItemForm.propTypes = {
    intl: PropTypes.object.isRequired,
    editVaultItem: PropTypes.func.isRequired,
    createVaultItem: PropTypes.func.isRequired,
    id: PropTypes.string,
    documents: PropTypes.array,
    vaultId: PropTypes.string.isRequired,
    initialValues: PropTypes.object,
    documentMethods: PropTypes.object.isRequired,
    update: PropTypes.bool,
    updatable: PropTypes.bool,
    dropFields: PropTypes.number,
    only_for_admins:PropTypes.bool.isRequired,
};

export default AddServerItemForm;
