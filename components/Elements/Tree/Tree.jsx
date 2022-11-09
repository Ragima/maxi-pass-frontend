import React, { useState, useRef, useEffect } from 'react';
import TreeDataTable from 'cp-react-tree-table';
import { Tree as UITree } from 'styled_components/Tree';
import { StyledInput } from 'styled_components/Input';
import TreeItem from 'components/Elements/TreeItem';
import NoDataText from 'components/Elements/NoDataText';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { searchInTree } from 'helpers/data/treeSearch';
import { makeTree } from 'helpers/data/dataTransform';

const Tree = ({ groups, intl, hideInfo, onSelect, selectable, field, altData, secondAction, hideEdit }) => {
    const searchTree = useRef(null);
    const [tree, setTree] = useState(makeTree(altData || groups));
    const [search, setSearch] = useState({ input: '', founded: tree, count: 0 });
    const [select, setSelect] = useState(null);

    useEffect(() => {
        expandAll(1);
    }, [search]);

    useEffect(() => {
        const newTree = makeTree(altData || groups);
        setTree(newTree);
        onSearchChange(null, { value: search.input, newTree });
    }, [altData, groups]);

    const expandAll = (depth) => {
        if (searchTree.current) searchTree.current.expandAll(depth);
    };

    const onSearchChange = (e, { value, newTree }) => {
        const treeToUse = newTree || tree;
        const foundedNode = searchInTree(treeToUse, value);
        setSearch({ input: value,
            founded: value
                ? _.compact(_.castArray(foundedNode))
                : treeToUse,
            count: search.count + 1 });
    };

    const renderIndexColumn = (data, metadata, toggleChildren) => {
        return (
            <TreeItem
                metadata={metadata}
                data={data}
                selectable={selectable}
                secondAction={secondAction}
                hideEdit={hideEdit}
                setSelect={setSelect}
                onSelect={onSelect}
                selected={select === data}
                hideInfo={hideInfo}
                toggleChildren={toggleChildren}
            />
        );
    };

    return (<>
        <StyledInput placeholder={intl.formatMessage({ id: 'searchGroups' })} icon='search' iconPosition='left' fluid onChange={onSearchChange}/>
        <UITree field={field}>
            {!_.isEmpty(search.founded) ? (
                <TreeDataTable key={search.count} data={search.founded} ref={searchTree}>
                    <TreeDataTable.Column renderCell={renderIndexColumn} />
                </TreeDataTable>
            ) : <NoDataText textId='noResults'/>}
        </UITree>
    </>);
};

Tree.propTypes = {
    groups: PropTypes.array.isRequired,
    altData: PropTypes.array,
    onSelect: PropTypes.func,
    hideInfo: PropTypes.bool,
    field: PropTypes.bool,
    selectable: PropTypes.bool,
    intl: PropTypes.object.isRequired,
};

export default Tree;
