import styled, { css } from 'styled-components';

export const ItemBlock = styled.div`
width: 100%;
  display: flex;
  align-items: center;
  border: 1px solid  ${({ theme }) => theme.colors.header};
  padding: ${({ padded }) => (padded ? '10px' : '0 10px')};
  margin: 3px 0;
  border-radius: 5px;
  background: white;
  min-height: 60px;
  justify-content: space-between;
  i {
    flex: none;
  }
`;

export const MenuBlock = styled.div`
  color: ${({ theme }) => theme.colors.menuText};
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 18px;
  transition: background-color 0.2s ease-out 0s, color 0.2s ease-out 0s;
  &:hover {
    color: ${({ theme }) => theme.colors.header};
  }
  ${({ active }) => active && css`
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.menu};
  `}
`;

export const HorizontalMenuBlock = styled(MenuBlock)`
  height: 100%;
  padding: 0 20px;
`;

export const VerticalMenuBlock = styled(MenuBlock)`
  width: 100%;
  padding: 12px 10px;
  font-size: 16px;
  align-items: baseline;
  i {
    margin-right: 10px;
  }
`;

export const ListBlock = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  &:hover {
    background-color: whitesmoke;
  }
`;

export const getMenuBlock = vertical => (vertical ? VerticalMenuBlock : HorizontalMenuBlock);
