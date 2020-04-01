import React from "react";
import { Dialog } from "@material-ui/core";

interface IProps {
  open: boolean;
  onClose: (isOpen: boolean) => void;
}

const ConfirmedOrder = ({ open, onClose }: IProps) => {
  return (
    <Dialog open={open} fullWidth={true} maxWidth={"md"}>
      step 3
    </Dialog>
  );
};

export default ConfirmedOrder;
