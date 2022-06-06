import styled from "styled-components";

export const Header = styled.header`
  top: 0;
  left: auto;
  right: 0;
  height: 56px;
  background-color: ${({ theme }) => theme.brand};

  display: flex;
  padding-inline: 1.5rem;

  @media only screen and (min-width: 768px) {
    height: 64px;
  }
`;

export const Nav = styled.nav`
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 0.875rem;
`;

export const List = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;
export const SocialIcons = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;
