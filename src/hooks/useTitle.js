import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = "MedCamp | " + title;
  }, [title]);
};

export default useTitle;
