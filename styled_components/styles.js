import { Responsive } from 'semantic-ui-react';

export const darkColors = {
    header: '#fc9929',
    menu: 'whitesmoke',
    background: '#181818',
    footer: 'whitesmoke',
    menuText: '#181818',
};

export const colors = {
    header: '#0071c0',
    menu: '#102441',
    background: '#f6f7fa',
    footer: '#102441',
    menuText: 'whitesmoke',
    errorText: '#9f3a38',
    errorHover: '#86302e',
    authCard: '#fafafae6',
    mainText: '#44444f',
    buttonHover: '#0662a2',
};


export const sizes = {
    header: { width: '100%', height: '70px' },
    menu: { width: '100%', height: '50px' },
    footer: { width: '100%', height: '30px' },
    main: { width: '65%', height: '100%' },
    container: { width: Responsive.onlyLargeScreen.minWidth },
};

export const themes = {
    main: { colors, sizes },
    darkTheme: { colors: darkColors, sizes },
};
