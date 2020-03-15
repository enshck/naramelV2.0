import { IRootState } from "utils/interfaces";
import {
  TypedUseSelectorHook,
  useSelector as useTypedSelector
} from "react-redux";

export const useSelector: TypedUseSelectorHook<IRootState> = useTypedSelector;
