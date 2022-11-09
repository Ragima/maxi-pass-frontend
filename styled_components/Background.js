import styled from 'styled-components';

export const Background = styled.div`
  width: 100%;
  background-color: ${props => props.color};
`;

export const HeaderBackground = styled(Background)`
  background-color: ${({ theme }) => theme.colors.header};
  height: ${({ theme, height }) => height || theme.sizes.header.height};
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.45);
`;

export const AuthCardBackground = styled(HeaderBackground)`
  background-color: ${({ theme }) => theme.colors.authCard};
  height: auto;
`;

export const MenuBackground = styled(Background)`
    background-color: ${({ theme }) => theme.colors.menu};
    height: ${({ vertical, theme }) => (vertical ? '100%' : theme.sizes.menu.height)};
    box-shadow: 0 -5px 5px -5px rgba(0, 0, 0, 0.45);
`;

export const FooterBackground = styled(Background)`
  background-color: ${({ theme }) => theme.colors.footer};
  height: ${({ theme }) => theme.sizes.footer.height};
`;

export const BackgroundImage = styled.div`
    background: url(${({ src }) => src}) no-repeat center;
    background-size: cover;
    padding: 15px;
    height: ${({ height }) => height};
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
