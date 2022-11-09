import styled, { css } from 'styled-components';
import { Input, Progress, Responsive } from 'semantic-ui-react';

export const StyledInput = styled(Input)`
    &&&& {
        input {
            @media (max-width: ${Responsive.onlyTablet.minWidth}px) {
                font-size: 16px!important;
            }
            border: none;
            border-bottom: 1px solid grey;
            background: transparent;
            border-radius: 0;
            &:focus {
                background: transparent;
            }
            padding-right: ${({ offset }) => offset}!important;
        }
        .input {
            width: 100%;
            ${({ stretch }) => stretch && css`width: 100%!important`};
        }
        &.error {
            input {
                background: transparent;
                &:focus {
                    background: transparent;
                }
            }
        }
        margin: ${({ margin }) => margin || 0};
        width: 100%;
        .button {
            margin: 0;
        }
        .right-icon {
            right: 1px;
            left: auto;
        }
        .eye-icon {
            right: 30px;
            left: auto;
        }
        .copy-icon {
            right: 60px;
            left: auto;
        }
    }
`;

export const StyledProgress = styled(Progress)`
    &&&&{
        width: 100%;
        margin-bottom: 0;
        border-radius: 0;
        border-bottom: 1px solid grey;
        border-right: 1px solid grey;
        border-left: 1px solid grey;
        .bar {
            border-radius: 0;
        }
    }
`;
