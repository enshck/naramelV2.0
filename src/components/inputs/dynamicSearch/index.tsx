import React, {
  useState,
  useEffect,
  ReactType,
  BaseSyntheticEvent,
} from "react";
import { ClickAwayListener } from "@material-ui/core";
import { Scrollbars } from "react-custom-scrollbars";

import Input from "../";
import { MainContainer } from "./styles";

export interface IOption {
  label: string;
  value: string;
}

interface IProps {
  options: IOption[];
  StyledComponent: ReactType;
  StyledSearchList: ReactType;
  StyledSearchElement: ReactType;
  onChange: (changedValue: IOption) => void;
  searchHandler: (value: string) => void;
  name: string;
  value: string;
  placeholder?: string;
  beforeIcon?: ReactType;
  errors?: {};
}

const DynamicInput = ({
  options,
  StyledComponent,
  StyledSearchList,
  StyledSearchElement,
  searchHandler,
  name,
  value,
  onChange,
  placeholder,
  beforeIcon,
  errors,
}: IProps) => {
  const [isVisibleOptionsBox, setVisibleOptionsBox] = useState<boolean>(false);

  return (
    <ClickAwayListener onClickAway={() => setVisibleOptionsBox(false)}>
      <MainContainer>
        <Input
          StyledComponent={StyledComponent}
          onInput={(e: BaseSyntheticEvent) => searchHandler(e.target.value)}
          onChange={() => {}}
          onClick={() => setVisibleOptionsBox(true)}
          name={name}
          value={value}
          placeholder={placeholder}
          type={"text"}
          autoComplete={"off"}
          BeforeIcon={beforeIcon}
          errors={errors}
        />
        <StyledSearchList isVisible={isVisibleOptionsBox}>
          <Scrollbars autoHeight>
            {options.length > 0
              ? options.map((elem, key) => {
                  return (
                    <StyledSearchElement
                      onClick={() => {
                        onChange(elem);
                        setVisibleOptionsBox(false);
                      }}
                      key={key}
                      isSelected={value === elem.label}
                    >
                      {elem.label}
                    </StyledSearchElement>
                  );
                })
              : "Не найдено"}
          </Scrollbars>
        </StyledSearchList>
      </MainContainer>
    </ClickAwayListener>
  );
};

export default DynamicInput;
