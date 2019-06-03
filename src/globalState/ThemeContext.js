import React from 'react';
import blue from '@material-ui/core/colors/blue';

export const themes = {
  light: {
    primary: {
      main: '#524763'
    }
  },
  dark: {
    primary: blue
  }
};

const initialContext = themes.light;

export const ThemeContext = React.createContext(initialContext);

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = React.useState(initialContext);
  const toggleTheme = () => {
    if (theme === theme.dark) {
      setTheme(theme.light);
    } else {
      setTheme(theme.dark);
    }
  };
  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
