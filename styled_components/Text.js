import styled, { css } from 'styled-components';

export const Text = styled.div`
  color: ${({ inverted, theme }) => (inverted ? theme.colors.mainText : 'white')};
  font-size: ${props => props.size || '14'}px;
  line-height: ${props => props.size || '14'}px;
  font-weight: ${props => props.bold && 'bold'};
  padding: ${props => props.padding || '5px'};
  word-break: break-word;
  ${({ truncate }) => truncate && css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `};
  ${({ auto }) => auto && css` flex: auto; `};
  ${({ notextwrap }) => notextwrap && css` white-space: pre-line; `};

`;

export const NoDataText = styled.div`
  color: ${({ theme }) => theme.colors.mainText};
  font-size: 22px;
  text-align: center;
  padding: 10px;
`;

export const MetaText = styled.span`
  color: grey;
  font-size: 12px;
  padding: ${props => props.padding || '5px'};
  word-break: break-word;
`;

export const ErrorText = styled.div`
  position: absolute;
  bottom: -18px;
  color: ${({ theme }) => theme.colors.errorText};
  text-align: end;
  width: 100%;
  font-size: 12px;
`;
