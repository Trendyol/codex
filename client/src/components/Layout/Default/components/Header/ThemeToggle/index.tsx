import { ThemeContext } from '@contexts/ThemeContext';
import { FC, useContext } from 'react';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';

type ThemeToggleProps = {};

const ThemeToggle: FC<ThemeToggleProps> = () => {
  const { theme, toggleLightTheme, toggleDarkTheme } = useContext(ThemeContext);

  return (
    <div className="mr-2 cursor-pointer">
      {theme == 'light' ? (
        <MdOutlineDarkMode size={22} onClick={toggleDarkTheme} />
      ) : (
        <MdOutlineLightMode size={22} onClick={toggleLightTheme} />
      )}
    </div>
  );
};

export default ThemeToggle;
