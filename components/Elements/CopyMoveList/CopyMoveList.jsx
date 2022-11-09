import React from 'react';
import _ from 'lodash';
import SearchWrap from 'components/Elements/SearchWrap';
import { Flex } from 'styled_components/Flexbox';
import { Text } from 'styled_components/Text';
import { Button, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { redirect } from 'helpers/auth/redirect';

const CopyMoveList = ({ intl, item, copyItem, moveItem }) => {
    const copyMoveItem = async (vault, action) => {
        const request = action === 'copy' ? copyItem : moveItem;
        const data = {
            vaultId: item.vault_id,
            id: item.id,
            type: item.type,
            data: {
                target_vault_id: vault.id,
            },
        }; 
        await request(data);
        redirect(`/vault_items/${item.vault_id}`);
    };

    const vaults = _.get(item, 'vaults', []);

    return (
        <SearchWrap data={vaults} filterBy={['title']} placeholder={intl.formatMessage({ id: 'search' })}>
            {({ data }) => (
                <div style={{ overflowY: 'auto' }}>
                    {_.map(data, vault => (
                        <div key={vault.id}>
                            <Flex padding='5px'>
                                <Text size={14} inverted truncate>{vault.title}</Text>
                                <Flex width='auto'>
                                    <Button onClick={() => copyMoveItem(vault, 'move')} disabled={item.vault_id === vault.id} primary size='small' content={intl.formatMessage({ id: 'move' })}/>
                                    <Button onClick={() => copyMoveItem(vault, 'copy')} primary size='small' content={intl.formatMessage({ id: 'copy' })}/>
                                </Flex>
                            </Flex> 
                            <Divider fitted/>
                        </div>
                    
                    ))}
                </div>
            )}
        </SearchWrap>
    );
};

CopyMoveList.propTypes = {
    copyItem: PropTypes.func.isRequired,
    moveItem: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
};

export default CopyMoveList;
