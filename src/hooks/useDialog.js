import { useState } from "react";

const useDialog = (
  func,
  title = "Are you sure about this?",
  content = "",
  disagreeText = "No",
  agreeText = "Yes"
) => {
  const [open, setOpen] = useState(false);

  const openDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return {
    func,
    title,
    content,
    disagreeText,
    agreeText,
    open,
    openDialog,
    handleClose,
  };
};

export default useDialog;
