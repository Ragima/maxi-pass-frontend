import React from 'react';
import { CommonButton as StyledButton } from 'styled_components/Button';
import { Responsive } from 'semantic-ui-react';

const CommonButton = (props) => {
    return (<>
        <Responsive as={React.Fragment} minWidth={Responsive.onlyComputer.minWidth}><StyledButton {...props}/></Responsive>
        <Responsive as={React.Fragment} maxWidth={Responsive.onlyComputer.minWidth}><StyledButton {...props} content=''/></Responsive>
    </>);
};

export default CommonButton;
