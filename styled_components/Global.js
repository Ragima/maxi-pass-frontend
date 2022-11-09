import { createGlobalStyle, css } from 'styled-components';
import { Responsive } from 'semantic-ui-react';
import datePicker from './utils/datePicker';
import scroll from './utils/scroll';
import nprogress from './utils/nprogress';
import notifies from './utils/notifies';
import popup from './utils/popup';

export default createGlobalStyle`
  ${datePicker}
  ${scroll}
  ${notifies}
  ${popup}
  body {
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
    #__next {
      height: 100%;
    }
    background-color: ${({ theme }) => theme.colors.background};
    .pushable {
      transform: none;
      flex: 1;
      .sidebar {
        position: fixed;
        top: ${({ theme }) => theme.sizes.header.height};
        height: calc(100% - ${({ theme }) => theme.sizes.header.height})!important;
      }
    }

    @media (min-width: ${Responsive.onlyTablet.minWidth}px) {
      .pusher {
        height: 100%;
      }
    }
    .dropdown {
     .visible {
        z-index: 9999!important;
     }
    }
    .modal {
      max-width: 600px;
      .content {
        max-height: 500px;
        overflow-y: auto;
      }
    }
    .toast-notification {
      margin: 0!important;
      width: 100%!important;
      display: flex;
      padding: 0 10px;
      justify-content: center;
      span {
        width: 100%;
        word-break: break-word;
        max-width: 500px;
        min-width: 300px;
      }
    }
    .flex-solid {
      flex: 0 0 auto;
    }
    .flex-stretched {
      flex: 1 1 100%;
      min-height: 0px;
    }
  }

  ${nprogress}
`;
