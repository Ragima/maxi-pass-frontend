import React from 'react';
import { Flex } from 'styled_components/Flexbox';
import { CardContainer } from 'styled_components/Container';
import FormWrap from 'components/Forms/FormWrap';
import FieldWrap from 'components/Fields/FieldWrap';
import { SubmitButton } from 'styled_components/Button';
import PropTypes from 'prop-types';
import Cards from 'react-credit-cards';
import _ from 'lodash';
import { onFormItemSubmit } from 'helpers/data/itemsSubmit';
import itemTypes from 'constants/itemTypes';
import validations from 'helpers/data/validations';

const activeKeys = {
    number: 'number',
    cardholder_name: 'name',
    expiry_date: 'expiry',
    verification_number: 'cvc',
};

const AddCardItemForm = ({ intl, editVaultItem, createVaultItem, update, initialValues, id, vaultId, updatable, dropFields, only_for_admins }) => {
    const handleSubmit = async (data) => {
        await onFormItemSubmit(data, { editVaultItem, createVaultItem, update, id, type: itemTypes.card, vaultId }, ['labels']);
    };    

    const fields = [
        { validate: validations.vaultItemTitle, name: 'title', icon: 'address card', iconPosition: 'left', placeholder: intl.formatMessage({ id: 'title' }) },
        { validate: validations.vaultItemTags, name: 'tags', icon: 'tags', iconPosition: 'left', placeholder: intl.formatMessage({ id: 'tags' }) },
        null,
        { validate: validations.cardholderName, name: 'cardholder_name', withCopy: update, icon: 'user', iconPosition: 'left', placeholder: intl.formatMessage({ id: 'cardholderName' }) },
        { validate: validations.cardType, name: 'type', icon: 'cc mastercard', iconPosition: 'left', placeholder: intl.formatMessage({ id: 'cardType' }) },
        { validate: validations.number, name: 'number', withCopy: update, icon: 'credit card', iconPosition: 'left', placeholder: intl.formatMessage({ id: 'number' }) },
        { validate: validations.cvc, name: 'verification_number', withCopy: update, iconPosition: 'left', icon: 'lock', placeholder: intl.formatMessage({ id: 'cvc' }) },
        { validate: validations.cardDate, name: 'valid_from', icon: 'calendar alternate', iconPosition: 'left', placeholder: intl.formatMessage({ id: 'validFrom' }) },
        { validate: validations.cardDate, name: 'expiry_date', icon: 'calendar alternate', iconPosition: 'left', placeholder: intl.formatMessage({ id: 'validTo' }) },
        { validate: validations.label, name: 'labels', icon: 'audio description', iconPosition: 'left', placeholder: intl.formatMessage({ id: 'labels' }), component: 'multiple_input' },
        { validate: validations.notes, name: 'notes', icon: 'sticky note', iconPosition: 'left', placeholder: intl.formatMessage({ id: 'notes' }) },
        { name: 'only_for_admins','isChecked': only_for_admins, label: intl.formatMessage({ id: 'onlyAdmin' }), component: 'checkbox' },
    ];

    return (
        <Flex direction='column' padding='3px' overflowy>
            <FormWrap onSubmit={handleSubmit} initialValues={initialValues}>
                {({ isLoading, values, active }) => (
                    <>
                        {_.map(_.dropRight(fields, dropFields), field => (field ? <FieldWrap key={field.name} {...field} emptyValue/> : (
                            <CardContainer key='card'>
                                <Cards
                                    number={values.number || ''}
                                    name={values.cardholder_name || ''}
                                    expiry={(values.expiry_date || '').replace('/', '')}
                                    cvc={values.verification_number || ''}
                                    focused={activeKeys[active]}
                                />
                            </CardContainer>
                        )))}
                        {updatable && (
                            <SubmitButton
                                loading={isLoading}
                                disabled={isLoading}
                                form
                                compact
                            >
                                {intl.formatMessage({ id: update ? 'updateCardItem' : 'addCardItem' })}

                            </SubmitButton>
                        )}
                </>)
                }
                
            </FormWrap>
        </Flex>
    );
};

AddCardItemForm.propTypes = {
    intl: PropTypes.object.isRequired,
    editVaultItem: PropTypes.func.isRequired,
    createVaultItem: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
    id: PropTypes.string,
    vaultId: PropTypes.string.isRequired,
    update: PropTypes.bool,
    updatable: PropTypes.bool,
    dropFields: PropTypes.number,
    only_for_admins:PropTypes.bool.isRequired,
};

export default AddCardItemForm;
