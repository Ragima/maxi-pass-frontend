import { css } from 'styled-components';

export default css`
  ::-webkit-scrollbar-track {
      border-radius: 0!important;
      background-color: transparent!important;
    }

    ::-webkit-scrollbar {
      width: 5px!important;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 20px!important;
      background-image: -webkit-gradient(linear,
        left bottom,
        left top,
        color-stop(0.44, #2185d0),
        color-stop(0.86, #2185d0))!important;
    }
`;