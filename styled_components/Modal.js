import styled, { css } from 'styled-components';
import { Modal } from 'semantic-ui-react';
 
export const StyledModal = styled(Modal)`
    &&&& {
        max-width: 450px;
        z-index: 10000 !important;
        .header {
            padding: 0!important;
        }
        ${({ relative }) => relative && css` & > .content { position: relative; }`}
        ${({ flex }) => flex && css`
            & > .content {
                display: flex;
                flex-direction: column;
            }
        `}
    }
`;
