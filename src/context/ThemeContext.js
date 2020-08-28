import React, { createContext, useState } from "react";
import { themeContext } from '../common/AppConfig'

export const ThemeContext = createContext();

const ThemeContextProvider = props => {
    const [isLightTheme, setisLightTheme] = useState(true)
    const [dark] = useState({
        textColor: themeContext.darkTextColor,
        ui: themeContext.darkUi,
        bg: themeContext.darkBg
        ,
    })
    const [light] = useState({
        textColor: themeContext.lightTextColor,
        ui: themeContext.lightUi,
        bg: themeContext.lightBg,
    })
    const toggleTheme = () => {
        setisLightTheme(currentState => !currentState)
    };
    return (
        <ThemeContext.Provider value={{ isLightTheme, light, dark, toggleTheme }}>
            {props.children}
        </ThemeContext.Provider>
    );
}

export default ThemeContextProvider;