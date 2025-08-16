import { FaMoon, FaSun } from "react-icons/fa";
import useTheme from "../Hooks/useTheme";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-2xl bg-gray-100 text-primary transition"
    >
      {theme === "light" ? <FaMoon size={20} /> : <FaSun size={20} />}
    </button>
  );
};

export default ThemeToggleButton;
