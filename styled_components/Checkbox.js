import styled from 'styled-components';
import { Checkbox } from 'semantic-ui-react';

export const StyledCheckbox = styled(Checkbox)`
  label {
    padding-top: 1px!important;
  }
  input {
    position: absolute;
    opacity: 0;
    height: 20px!important;
    width: 20px!important;

    & + label {
    position: relative;
    cursor: pointer;
    padding: 0;
    }

    & + label:before {
      content: ''!important;
      top: 0px!important;
      margin-right: 10px!important;
      display: inline-block!important;
      vertical-align: text-top!important;
      width: 20px!important;
      height: 20px!important;
      background: white!important;
      border: 1px solid #f2f2f2;
      border-radius: 5px!important;
    }

    &:hover + label:before {
      border: 1px solid #5299cd!important;
    }

    &:disabled + label {
    color: #b8b8b8!important;
    cursor: auto!important;
    }

    &:disabled + label:before {
    box-shadow: none!important;
    background: #ddd!important;
    }

    &:checked + label:after {
      content: "" !important;
      position: absolute !important;
      left: 5px !important;
      top: 5px !important;
      background: white !important;
      width: 11px !important;
      height: 6px !important;
      border-left: 2px solid #5299cd;
      border-bottom: 2px solid #5299cd;
      transform: rotate(-45deg)!important;
    }
    &:checked + label:before {
      border: 1px solid #5299cd!important;
    }
  }
`;
