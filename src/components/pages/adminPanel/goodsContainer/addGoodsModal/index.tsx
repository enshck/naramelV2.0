import React from "react";
import { Dialog } from "@material-ui/core";

import { MainContainer } from "./styles";
import { IGoodsElement } from "components/pages/items";
import EditGoodsContainer from "../editGoodsContainer";
import { initialItemData } from "utils/constants";

export interface IOption {
  label: string;
  value: string;
}

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  listOfGoodsCategory: IOption[];
  setGoodsData: (newValue: IGoodsElement[]) => void;
}

const AddGoodsModal = ({
  isOpen,
  onClose,
  listOfGoodsCategory,
  setGoodsData,
}: IProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth={true} maxWidth={"md"}>
      <MainContainer>
        <EditGoodsContainer
          listOfGoodsCategory={listOfGoodsCategory}
          setGoodsData={setGoodsData}
          changedItem={initialItemData}
          isNewItem={true}
          onClose={onClose}
        />
      </MainContainer>
    </Dialog>
  );
};

export default AddGoodsModal;
