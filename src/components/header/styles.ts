import styled from "styled-components";

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
  position: absolute;
  width: 100%;
  box-sizing: border-box;
  top: 35px;
  left: 0;
  z-index: 800;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  top: 30px;
  padding-top: 20px;
  min-height: 400px;
`;

export const SubCategoryWrapper = styled.div`
  width: 100%;
  height: 100%;
  top: 5px;
  position: absolute;
  background: #f9f9f9;
  z-index: 400;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
`;

export const MenuCategoryContainer = styled.div`
  padding-bottom: 10px;

  &:hover {
    ${SubCategoriesMainContainer} {
      visibility: visible;
    }
  }
`;

export const MenuElement = styled.div`
  font-size: 15px;
  color: #333333;
  cursor: pointer;

  :hover {
    color: #792c9b;
  }
`;

export const SubCategory = styled.div`
  z-index: 600;
  display: flex;
  justify-content: center;
  cursor: pointer;
  :hover {
    color: #792c9b;
  }
`;
