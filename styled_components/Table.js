import styled, { css } from 'styled-components';
import { Table } from 'semantic-ui-react';
 
export const TableHeaderCell = styled(Table.HeaderCell)`
    &&&& {
        background-color: ${({ theme }) => theme.colors.header};
        padding: 10px;
        color: white;
        &:hover {
            background-color: ${({ theme }) => theme.colors.header};
            color: white;
            cursor: initial;
        } 
        ${({ sortable }) => sortable && css`
            &:hover {
                    background-color: #0e619a!important;
                    color: white;
                    cursor: pointer;
            } 
        `};
        &.sorted {
                background-color: ${({ theme }) => theme.colors.header}!important;
                color: white!important;
                &:hover {
                    background-color: #0e619a!important;
                    color: white!important;
                } 
            }
    }
`;
