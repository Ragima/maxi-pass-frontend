import React from 'react';
import { Icon, Responsive } from 'semantic-ui-react';
import { TreeItem as UITreeItem, TreeItemData, DataName, DataInfo } from 'styled_components/Tree';
import { Flex } from 'styled_components/Flexbox';
import PropTypes from 'prop-types';
import ConfirmModal from 'components/Modals/ConfirmModal';
import _ from 'lodash';
import Link from 'next/link';
import ModalEditGroup from '../../Modals/ModalEditGroup';

const TreeItem = ({ data, metadata, toggleChildren, intl, hideEdit, secondAction,
    hideInfo, selected, setSelect, onSelect, selectable, deleteGroup }) => {
    const handleClick = () => {
        setSelect(selected ? null : data);
        if (onSelect) onSelect(selected ? null : data);
    };

    return (
        <UITreeItem offset={metadata.depth * 25} selected={selected}>
            {metadata.hasChildren
                ? <Icon link size='large' color='blue' onClick={toggleChildren} name={metadata.hasVisibleChildren ? 'angle down' : 'angle right'}/>
                : <Icon size='tiny' name='circle' color='blue'/>}
            <TreeItemData onClick={selectable && handleClick} selectable={selectable}>
                <DataName>
                    {selectable ? data.name : <Link href="/group/[id]" as={`/group/${data.id}`}><a>{data.name}</a></Link>}
                </DataName>
                {!hideInfo && (
                    <Responsive as={Flex} width='auto' minWidth={Responsive.onlyTablet.minWidth}>
                        <DataInfo>
                            <b>
                                {intl.formatMessage({ id: 'users' })}
                                {': '}
                            </b>
                            {data.users}
                        </DataInfo>
                        <DataInfo>
                            <b>
                                {intl.formatMessage({ id: 'vaults' })}
                                {': '}
                            </b>
                            {data.vaults}
                        </DataInfo>
                    </Responsive>
                )}
            </TreeItemData> 
            {(!hideInfo || hideEdit || secondAction) && (
                <Flex width={hideEdit ? '35px' : '65px'} minWidth={hideEdit ? '35px' : '65px'}>
                    {!hideEdit && <ModalEditGroup group={data}/>}
                    {secondAction 
                        ? secondAction(data)
                        : (
                            <ConfirmModal
                                callback={() => deleteGroup({ id: data.id })}
                                trigger={<Icon inverted link circular name='delete' color='red'/>}
                            />
                        )}
                </Flex>
            )}     
        </UITreeItem>
    );
};

TreeItem.propTypes = {
    data: PropTypes.object.isRequired,
    metadata: PropTypes.object.isRequired,
    hideInfo: PropTypes.bool,
    selected: PropTypes.bool,
    selectable: PropTypes.bool,
    hideEdit: PropTypes.bool,
    secondAction: PropTypes.func,
    toggleChildren: PropTypes.func.isRequired,
    deleteGroup: PropTypes.func.isRequired,
    setSelect: PropTypes.func,
    onSelect: PropTypes.func,
    intl: PropTypes.object.isRequired,
};

export default TreeItem;
