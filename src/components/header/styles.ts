import styled from "styled-components";
import { Link } from "react-router-dom";

export const MainContainer = styled.div`
  width: 100%;
`;

export const SubHeader = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 20px;
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;

  img {
    max-width: 250px;
  }
`;

export const PhoneContainer = styled.div``;

export const ControlsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  span {
    color: #999;
    margin-left: 5px;
  }
`;

export const MenuContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  border-bottom: 2px solid #333333;
  margin-top: 40px;
  position: relative;
`;

export const SubCategoriesMainContainer = styled.div`
  visibility: hidden;
  opacity: 0;
  position: absolute;
  width: 100%;
  box-sizing: border-box;
  left: 0;
  z-index: 800;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding-top: 20px;
  grid-gap: 40px;
  min-height: 100px;
  transition: 0.5s;
`;

export const SubCategoryWrapper = styled.div`
  width: 100%;
  height: 100%;
  top: 15px;
  position: absolute;
  background: #f9f9f9;
  z-index: 400;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
`;

export const MenuCategoryContainer = styled.div`
  padding-bottom: 10px;
`;

export const MenuElement = styled.div`
  cursor: pointer;

  p {
    font-size: 15px;
    color: #333333;
    margin: 0;
  }

  :hover {
    p {
      color: #792c9b;
    }
    ${SubCategoriesMainContainer} {
      opacity: 1;
      visibility: visible;
    }
  }
`;

export const SubCategory = styled(Link)`
  z-index: 600;
  display: flex;
  justify-content: center;
  cursor: pointer;
  text-decoration: none;
  color: #333333;
  :hover {
    color: #792c9b;
  }
`;

export const MainControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const LogoutButton = styled.div`
  cursor: pointer;
  :hover {
    color: #792c9b;
  }
`;
