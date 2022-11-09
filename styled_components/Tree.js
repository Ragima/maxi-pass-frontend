import styled, { css } from 'styled-components';
import { Flex } from './Flexbox';

export const DataName = styled.div`
    font-weight: bold;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.mainText};
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const TreeItem = styled.div`
    margin-left: ${({ offset }) => offset || 0}px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border: 1px solid ${({ theme }) => theme.colors.header};
    border-radius: 3px;
    padding: 7px 5px;
    margin-top: 5px;
    margin-bottom: 5px;
    height: 100%;
    background-color: ${({ selected, theme }) => (selected ? theme.colors.header : 'white')};
    ${DataName} {
        color: ${({ selected }) => selected && 'white'};
    }
    transition: background-color 0.1s ease-out 0s, color 0.1s ease-out 0s;
    i {
        margin: 0;
        min-width: 25px;
        &.blue.icon {
        color: ${({ selected }) => selected && 'white!important'};
    }
`;

export const TreeItemData = styled.div`
    display: flex;
    height: 100%;
    flex-grow: 1;
    padding-left: 10px;
    align-items: center;
    cursor: ${({ selectable }) => selectable && 'pointer'};
    justify-content: space-between;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const DataInfo = styled.div`
    width: 150px;
    color: ${({ theme }) => theme.colors.mainText}
`;

export const Tree = styled.div`
    &&&& {
        width: 100%;
        padding: 0 3px;
        ${({ field }) => field && css`
            max-height: 240px;
        `}
        overflow-y: auto;
        margin-top: 20px;
        .cp_tree-table_row {
            height: auto!important;
        }
        .cp_tree-table_column {
            height: 100%;
        }
        .cp_tree-table_mover {
            position: static!important;
            height: auto!important;
        }
        .cp_tree-table {
            height: auto!important;
            & > div:first-child {
                height: auto!important;
            }
        } 
    }
`;
