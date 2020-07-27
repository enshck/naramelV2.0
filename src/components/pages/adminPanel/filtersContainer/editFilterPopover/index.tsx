import React, { BaseSyntheticEvent } from "react";

import {
  StyledPopover,
  StyledInput,
  MainPopoverContainer,
  SubmitButton,
  InputContainer,
} from "./styles";
import Input from "components/inputs";
import { IFilterFormData } from "../";

interface IProps {
  anchorEl: HTMLDivElement | null;
  closeHandler: () => void;
  popoverSubmitHandler: () => void;
  filterFormData: IFilterFormData;
  setFilterFormData: (e: BaseSyntheticEvent) => void;
  editableFilterId: string | null;
}

const EditFilterPopover = ({
  anchorEl,
  closeHandler,
  popoverSubmitHandler,
  setFilterFormData,
  filterFormData,
  editableFilterId,
}: IProps) => {
  const { name, units } = filterFormData;

  return (
    <StyledPopover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={closeHandler}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <MainPopoverContainer>
        {Boolean(anchorEl) && (
          <h1>
            {editableFilterId ? "Обновление фильтра" : "Добавление фильтра"}
          </h1>
        )}
        <InputContainer>
          <Input
            StyledComponent={StyledInput}
            name={"name"}
            type={"text"}
            value={name}
            onInput={(e) => setFilterFormData(e)}
          />
        </InputContainer>
        <InputContainer>
          <Input
            StyledComponent={StyledInput}
            name={"units"}
            type={"text"}
            value={units}
            onInput={(e) => setFilterFormData(e)}
          />
        </InputContainer>

        <SubmitButton onClick={popoverSubmitHandler}>
          {editableFilterId ? "Обновить" : "Создать"}
        </SubmitButton>
      </MainPopoverContainer>
    </StyledPopover>
  );
};

export default EditFilterPopover;
