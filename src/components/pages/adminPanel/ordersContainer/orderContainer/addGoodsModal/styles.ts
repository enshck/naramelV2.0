import styled from "styled-components";
import { Dialog } from "@material-ui/core";

import { StyledInput as Input } from "../customerDataForm/styles";

export const MainContainer = styled(Dialog)``;

export const ContentContainer = styled.div`
  padding: 20px;
`;

export const FilterMainContainer = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
`;

export const StyledInput = styled(Input)`
  width: 400px;
`;

export const ItemsListContainer = styled.div`
  width: 100%;
  border: 1px solid ${(props) => props.theme.spreadColor};
  overflow: auto;
  max-height: 400px;
`;
