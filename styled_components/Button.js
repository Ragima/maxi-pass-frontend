import styled, { css } from 'styled-components';
import { Button as UIButton, Responsive } from 'semantic-ui-react';


export const Button = styled(UIButton)`
    &&&& {
        color: white;
    }
`;

export const CommonButton = styled(UIButton)`
    &&&& {
        background-color: transparent;
        padding: 12px;
        border: 1px solid ${({ theme, danger }) => (danger ? theme.colors.errorText : theme.colors.header)};
        border-radius: 3px;
        color: ${({ theme, danger }) => (danger ? theme.colors.errorText : theme.colors.header)};
        transition: background-color 0.1s ease-out 0s, color 0.1s ease-out 0s;
        margin: ${({ margin }) => margin || 0};
        &:hover {
            background-color: ${({ theme, danger }) => (danger ? theme.colors.errorText : theme.colors.buttonHover)};
            color: ${({ theme }) => theme.colors.background};
        }
        ${({ active }) => active && css`
            background-color: ${({ theme }) => (theme.colors.buttonHover)};
            color: ${({ theme }) => theme.colors.background};
        `};
        @media (max-width: ${Responsive.onlyComputer.minWidth}px) {
            i {
                margin: 0!important;
            }
        }
    }
`;

export const SubmitButton = styled(Button)`
    &&&&{
        width: 100%;
        background-color: ${({ theme }) => theme.colors.header};
        background-color: ${({ background }) => background};
        text-transform: uppercase;
        padding: 12px;
        margin: ${({ form }) => (form ? '15px 0' : '15px 0 0 0')};
        margin: ${({ margin }) => margin};
        min-height: 39px;
        &:hover {
            background-color: ${({ theme }) => theme.colors.buttonHover};
        }
    }
`;

export const DangerSubmitButton = styled(SubmitButton)`
    &&&&{
        background-color: ${({ theme }) => theme.colors.errorText};
        &:hover {
            background-color: ${({ theme }) => theme.colors.errorHover};
        }
    }
`;
export const NoDefaultStylesButton = styled.button`
    &&&&{
        outline: none;
        background: transparent;
        border: 1px solid transparent;
}
`;