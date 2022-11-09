import styled, { css } from 'styled-components';

export const Flex = styled.div`
    display: flex;
    flex-direction: ${({ direction }) => direction || 'row'};
    justify-content: ${({ justify }) => justify || 'space-between'};
    align-items: ${({ align }) => align || 'center'};
    padding: ${({ padding }) => padding || '0'};
    margin: ${({ margin }) => margin || '0'};
    height: ${({ height }) => height || '100%'};
    width: ${({ width }) => width || '100%'};
    min-width: ${({ minWidth }) => minWidth};
    position: ${({ relative }) => relative && 'relative'};
    ${({ auto }) => auto && css` flex: auto; `};
    ${({ wrap }) => wrap && css` flex-wrap: wrap; `};
    ${({ pointer }) => pointer && css` cursor: pointer; `};
    ${({ overflowy }) => overflowy && css` overflow-y: auto; `};
`;

export const FlexItem = styled(Flex)`
    height: auto;
    cursor: pointer;
    &:hover {
        background-color: ${({ active }) => !active && '#e8e8e8'};
    }
    background-color: ${({ active }) => active && '#2185d0'};
    div {
        color: ${({ active }) => active && 'white'};
    }
    border-radius: ${({ active }) => active && '3px'};
`;
