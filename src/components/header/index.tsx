import React from "react";

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
import logo from "img/logoNaravel.png";
import { useSelector } from "store/reducers";

const Header = () => {
  const menuCategory = useSelector(state => state.menuCategory);

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

                    return (
                      <SubCategory
                        key={id}
                        to={{
                          pathname: "/items",
                          search: `groupId=${id}`
                        }}
                      >
                        {name}
                      </SubCategory>
                    );
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
