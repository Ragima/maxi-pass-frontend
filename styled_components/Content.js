import styled from 'styled-components';
import { Form } from 'semantic-ui-react';

export const Content = styled.div`
  background-color: ${props => props.color};
  height: 100%;
  display: flex;
  align-items: center;
`;

export const HeaderContent = styled(Content)`
  justify-content: space-between;
  max-width: ${({ theme }) => theme.sizes.container.width}px;
  margin: auto;
  padding: 0 20px;
`;

export const PageContent = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`;
export const FooterContent = styled(Content)`
  justify-content: center;
`;

export const HorizontalMenuContent = styled(HeaderContent)`
  max-width: ${({ theme }) => theme.sizes.container.width}px;
  width: 100%;
`;

export const VerticalMenuContent = styled(Content)`
  flex-direction: column;
  height: auto;
  width: 100%;
`;

export const FormContent = styled(Form)`
  &&&& {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

export const getMenuContent = vertical => (vertical ? VerticalMenuContent : HorizontalMenuContent);
