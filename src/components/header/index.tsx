import React from "react";
import { useSelector } from "react-redux";

import {
  MainContainer,
  SubHeader,
  ControlsContainer,
  PhoneContainer,
  MenuContainer,
  MenuElement,
  LogoContainer,
  SubCategoriesMainContainer,
  SubCategory,
  MenuCategoryContainer,
  SubCategoryWrapper
} from "./styles";
import { ICategoryReducers, ICategory } from "../../utils/interfaces";
import logo from "../../img/logoNaravel.png";

const Header = () => {
  const menuCategory = useSelector<ICategoryReducers, ICategory[]>(
    state => state.menuCategory
  );
  console.log(menuCategory, ">>>");

  return (
    <MainContainer>
      <SubHeader>
        <PhoneContainer>+380 (050) 561 39 26</PhoneContainer>
        <LogoContainer>
          <img src={logo} alt={"logo"} />
        </LogoContainer>
        <ControlsContainer>Корзина</ControlsContainer>
      </SubHeader>
      <MenuContainer>
        {menuCategory.map(elem => {
          const { id, name, subCategories } = elem;

          return (
            <MenuCategoryContainer key={id}>
              <MenuElement>
                <p>{name}</p>
                <SubCategoriesMainContainer>
                  <SubCategoryWrapper />
                  {subCategories.map(elem => {
                    const { id, name } = elem;

                    return <SubCategory key={id}>{name}</SubCategory>;
                  })}
                </SubCategoriesMainContainer>
              </MenuElement>
            </MenuCategoryContainer>
          );
        })}
      </MenuContainer>
    </MainContainer>
  );
};

export default Header;
