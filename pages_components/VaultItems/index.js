import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import AddLoginItemForm from 'components/Forms/AddLoginItemForm';
import AddCardItemForm from 'components/Forms/AddCardItemForm';
import AddServerItemForm from 'components/Forms/AddServerItemForm';
import { Text } from 'styled_components/Text';
import { Flex } from 'styled_components/Flexbox';
import CommonButton from 'components/Elements/CommonButton';
import PropTypes from 'prop-types';
import itemTypes from 'constants/itemTypes';
import ModalCopyMove from 'components/Modals/ModalCopyMove';
import { redirect } from 'helpers/auth/redirect';
import ConfirmModal from 'components/Modals/ConfirmModal';
import { HeightColumn, HeightRow, HeightGrid } from 'styled_components/Grid';
import roles from 'constants/userRoles';
import Categories from './Categories';
import Items from './Items';

const VAULT_CATEGORY = 'vault_category';

const VaultItems = ({ vault, vault_items, item, form, deleteVaultItem, intl, role, isLead }) => {

    const [category, setCategory] = useState({ value: '', type: 'type' });
    useEffect(() => {
        const vaultCategory = localStorage.getItem(VAULT_CATEGORY);
        if (vaultCategory) {
            setCategory({ value: vaultCategory, type: 'type' });
        }
        return localStorage.removeItem(VAULT_CATEGORY);
    }, [])

    const handleSetCategory = (categoryState) => {
        setCategory(categoryState);
        if (!_.isEmpty(item)) {
            localStorage.setItem(VAULT_CATEGORY, categoryState.value);
            redirect(`/vault_items/${vault.id}`);
        }
    }

    const getForm = () => {
        const props = { vaultId: vault.id, only_for_admins: item.only_for_admins, key: 'create', updatable: vault.updatable, dropFields: role === roles.admin && !isLead ? 0 : 1 };

        const providedProps = !_.isEmpty(item)
            ? { ...props, update: true, initialValues: { ...item.content, documents: item.documents }, id: item.id, key: 'update' }
            : props;
        const comparedValue = !_.isEmpty(item) ? item.type : form;     
      
        switch (comparedValue) {
        case itemTypes.login: return <AddLoginItemForm {...providedProps}/>;
        case itemTypes.card: return <AddCardItemForm {...providedProps}/>;
        case itemTypes.server: return <AddServerItemForm {...providedProps} />;  
        default: return null;
        }
    };

    const handleDelete = async (item) => {
        await deleteVaultItem({ id: item.id, vaultId: vault.id, type: item.type });
        redirect(`/vault_items/${vault.id}`);
    };

    const filterItems = _.filter(vault_items, item => _.includes(item[category.type], category.value));

    const getTags = _.uniq(_.flatMap(vault_items, 'tags'));

    return (
        <>
            <Text size='28' className='flex-solid' inverted truncate padding='10px 0 20px 0'>{_.get(vault, 'title')}</Text>
            <HeightGrid className='flex-stretched' stackable divided>
                <HeightRow>
                    <HeightColumn width={4}>
                        <Categories tags={getTags} vault={vault} setCategory={handleSetCategory} category={category}/>
                    </HeightColumn>
                    <HeightColumn width={5} verticalAlign='top'>
                        <Items items={filterItems} item={item} vault={vault}/>
                    </HeightColumn>
                    <HeightColumn width={7}>
                        {!_.isEmpty(item) 
                            && (
                                <Flex direction='column' height='auto'>
                                    <Text inverted size='18'>{item.title}</Text>
                                    {vault.updatable && (
                                        <Flex padding='15px 0' height='auto'>
                                            <ModalCopyMove item={item}/>
                                            <ConfirmModal
                                                trigger={<CommonButton icon='delete' margin='0 0 0 5px' danger content={intl.formatMessage({ id: 'deleteVaultItem' })}/>}
                                                callback={() => handleDelete(item)}
                                            />
                                        </Flex>
                                    )}
                                </Flex>
                            )
                        }
                        {getForm()}
                    </HeightColumn>
                </HeightRow>
            </HeightGrid>
        </>
    );
};

VaultItems.defaultProps = {
    vault: {},
    item: {},
    vault_items: [],
};

VaultItems.propTypes = {
    vault: PropTypes.object,
    vault_items: PropTypes.array,
    item: PropTypes.object,
    form: PropTypes.string,
    deleteVaultItem: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
};

export default VaultItems;
