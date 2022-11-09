import styled, { css } from 'styled-components';
import { Grid } from 'semantic-ui-react';

export const StyledGrid = styled(Grid)`
    &&&& {
        width: 100%;
    }
`;

export const StyledGridInput = styled(Grid)`
    &&&& {
        width: 100%;
        .no-padding {
            padding-left: 0;
            padding-right: 0;
            i {
                margin: auto;
            }
        }
        .no-right-padding {
            padding-right: 0;
        }
    }
`;

export const ActivityGrid = styled(Grid)`
    &&&& {
        width: 100%;
        margin: 0;
        .column {
            display: flex;
            direction: column;
            justify-content: center;
        }
    }
`;

export const ScrollableGrid = styled(Grid)`
    &&&& {
        height: 100%;
        .row, .column {
            height: inherit;
        }
    }
`;

export const HeightColumn = styled(Grid.Column)`
    &&&& {
        height: 100%;
        display: flex;
        flex-direction: column;
    }
`;

export const HeightGrid = styled(Grid)`
    &&&& {
        height: 100%;
    }
`;

export const HeightRow = styled(Grid.Row)`
    &&&& {
        height: 100%;
    }
`;
