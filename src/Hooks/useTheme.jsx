import React, { useContext } from "react";
import ThemeContext from "../Context/Theme/ThemeContext";

const useTheme = () => {
  const themData = useContext(ThemeContext);

  return themData;
};

export default useTheme;
