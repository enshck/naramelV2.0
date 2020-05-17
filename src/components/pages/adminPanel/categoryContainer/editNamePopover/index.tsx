import React, { useMemo } from "react";

import {
  StyledPopover,
  StyledInput,
  MainPopoverContainer,
  SubmitButton,
} from "./styles";
import Input from "components/inputs";

interface IProps {
  anchorEl: HTMLDivElement | null;
  closeHandler: () => void;
  popoverSubmitHandler: () => void;
  editInputValue: string;
  setEditInputValue: (value: string) => void;
  editableCategoryId: string;
  popoverEditMode: string;
}

const EditNamePopover = ({
  anchorEl,
  closeHandler,
  popoverSubmitHandler,
  editInputValue,
  setEditInputValue,
  editableCategoryId,
  popoverEditMode,
}: IProps) => {
  const title = useMemo(() => {
    if (popoverEditMode === "category") {
      if (editableCategoryId) {
        return "Редактировать категорию";
      } else {
        return "Создать категорию";
      }
    } else {
      if (editableCategoryId) {
        return "Редактировать подкатегорию";
      } else {
        return "Создать подкатегорию";
      }
    }
  }, [editableCategoryId, popoverEditMode]);

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
        {Boolean(anchorEl) && <h1>{title}</h1>}
        <Input
          StyledComponent={StyledInput}
          name={"editInputValue"}
          type={"text"}
          value={editInputValue}
          onInput={(e) => setEditInputValue(e.target.value)}
        />
        <SubmitButton>
          {editableCategoryId ? "Обновить" : "Создать"}
        </SubmitButton>
      </MainPopoverContainer>
    </StyledPopover>
  );
};

export default EditNamePopover;
