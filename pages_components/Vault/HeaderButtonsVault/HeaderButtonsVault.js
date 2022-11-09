import React from 'react';
import Link from "next/link";
import CommonButton from "../../../components/Elements/CommonButton";
import ConfirmModal from "../../../components/Modals/ConfirmModal";

const HeaderButtonsVault = (props) => {
    const { intl, vault, isAdmin, onHandleDelete } = props;
    const { has_access } = vault;

    const handleDelete = () => onHandleDelete();
    
    return (
        <>
            { isAdmin && <>
                <Link href='/vault_items/[id]' as={`/vault_items/${vault.id}`}>
                    <CommonButton icon='sitemap' content={intl.formatMessage({ id: 'showItems' })}/>
                </Link>
                <ConfirmModal
                    trigger={<CommonButton icon='delete' danger content={intl.formatMessage({ id: 'deleteVault' })}/>}
                    callback={handleDelete}
                />
        </>
            }
            {
                (has_access && !isAdmin) && (
                    <Link href='/vault_items/[id]' as={`/vault_items/${vault.id}`}>
                        <CommonButton icon='sitemap' content={intl.formatMessage({ id: 'showItems' })}/>
                    </Link>
                )
            }
    </>);
};

export default HeaderButtonsVault;
