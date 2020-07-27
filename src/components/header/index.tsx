import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

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
  SubCategoryWrapper,
  MainControlsContainer,
  LogoutButton,
} from "./styles";
import logo from "img/logoNaravel.png";
import { useSelector } from "customHooks/useSelector";
import { setOpenedModal, setIsLogged } from "store/actions";
import OrdersModal from "components/modals/ordersModal";
import firebase from "utils/firebase";

const Header = () => {
  const menuCategory = useSelector((state) => state.menuCategory);
  const ordersData = useSelector((state) => state.orders);
  const openedModal = useSelector((state) => state.openedModal);
  const isLogged = useSelector((state) => state.isLogged);
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = history.location;

  const logoutHandler = () => {
    firebase.auth().signOut();
    dispatch(setIsLogged(false));
    history.push("/login");
  };

  return (
    <MainContainer>
      <OrdersModal
        open={openedModal === "orders"}
        onClose={() => dispatch(setOpenedModal(null))}
      />
      <SubHeader>
        <PhoneContainer>+380 (050) 561 39 26</PhoneContainer>
        <LogoContainer>
          <img src={logo} alt={"logo"} />
        </LogoContainer>
        <MainControlsContainer>
          {pathname !== "/adminPanel" && (
            <ControlsContainer
              onClick={() =>
                ordersData.length > 0 && dispatch(setOpenedModal("orders"))
              }
            >
              Корзина <span>({ordersData.length})</span>
            </ControlsContainer>
          )}
          {isLogged && (
            <LogoutButton onClick={logoutHandler}>Выйти</LogoutButton>
          )}
        </MainControlsContainer>
      </SubHeader>

      {pathname !== "/adminPanel" && (
        <MenuContainer>
          {menuCategory.map((elem) => {
            const { id, name, subCategories } = elem;

            return (
              <MenuCategoryContainer key={id}>
                <MenuElement>
                  <p>{name}</p>
                  <SubCategoriesMainContainer>
                    <SubCategoryWrapper />
                    {subCategories.map((elem) => {
                      const { id, name } = elem;

                      return (
                        <SubCategory
                          key={id}
                          to={{
                            pathname: "/items",
                            search: `groupId=${id}`,
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
      )}
    </MainContainer>
  );
};

export default Header;
