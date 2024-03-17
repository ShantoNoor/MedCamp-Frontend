import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({
  title,
  content = "",
  disagreeText = "No",
  agreeText = "Yes",
  open,
  handleClose,
  func,
  children,
  fullScreen = false,
  autoClose = true,
}) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        fullScreen={fullScreen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{title}</DialogTitle>

        <DialogContent>
          {content !== "" && (
            <DialogContentText id="alert-dialog-slide-description">
              {content}
            </DialogContentText>
          )}
          {children}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>{disagreeText}</Button>
          <Button
            onClick={async () => {
              await func();
              if (autoClose) handleClose();
            }}
          >
            {agreeText}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
