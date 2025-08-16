import { FaMoon, FaSun } from "react-icons/fa";
import useTheme from "../Hooks/useTheme";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-2xl bg-base-100 text-primary transition btn btn-primary"
    >
      {theme === "light" ? <FaMoon size={20} /> : <FaSun size={20} />}
    </button>
  );
};

export default ThemeToggleButton;
