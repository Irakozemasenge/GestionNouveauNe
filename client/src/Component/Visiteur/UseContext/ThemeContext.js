/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

// Créer un contexte pour gérer le thème
const ThemeContext = createContext();

// Créer un provider pour le contexte du thème
export const ThemeProvider = ({ children }) => {

    // '''''''''''''''''''''''''''''''''''''''''''''''' Dark Mode Admin et Visteur''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    const triggerRef = useRef();
    const close = () => triggerRef.current && triggerRef.current.close();
    //visiteur avec evenement onClick
    const [isDark, setIsDark] = useState('light');
    const toggleDarkMode = () => {
        const newDarkMode = isDark === 'dark' ? 'light' : 'dark';
        setIsDark(newDarkMode);
        localStorage.setItem('isDark', newDarkMode);
        close()
    };

    useEffect(() => {
        const storedValue = localStorage.getItem('isDark');
        if (storedValue) {
            setIsDark(storedValue);
        }
    }, [])

    //pour adimin avec evenement onChange dark
    const [isDarkadimin, GetisDarkadimin] = useState('light')
    const handleChange = (value) => {
        GetisDarkadimin(value);
        close()
        localStorage.setItem('isDark', value);
    };

    useEffect(() => {
        const storedValue = localStorage.getItem('isDark')
        if (storedValue) {
            GetisDarkadimin(storedValue);
        }
    }, [isDark]);


    //.................................Pour obtenir le valeur de Service et Publicite de Home page en son onglet appropie

    const [dataServiceHomme, setDataServiceHomme] = useState('');
    const [datapublicitesHomme, setDatapublicitesHomme] = useState('');

    // ............................login................
    const [isLogin, SetIsLogin] = useState(false);
    const [isAdmin, SetisAdmin] = useState(false)

    // ........... password........ 
    const [forgetPass, setForgetPass] = useState(false);
    const [isopnedChangeP, setIsOpenedChangeP] = useState(false)
    const [isOtpCode, setIsOtpCode] = useState(false)
    const [changePassoword, setchangePassoword] = useState(false)

    //  ................... basculer vers le site administrateurs sans deconnexion...................
    const [isGoSite, SeisGoSite] = useState(false)
    return (
        <ThemeContext.Provider
            value={{
                isDark,
                toggleDarkMode,
                triggerRef,
                isopnedChangeP,
                setIsOpenedChangeP,
                forgetPass,
                setForgetPass,
                close,
                handleChange,
                isDarkadimin,
                setDataServiceHomme,
                dataServiceHomme,
                setDatapublicitesHomme,
                datapublicitesHomme,
                SetIsLogin,
                isLogin,
                isOtpCode,
                setIsOtpCode,
                changePassoword,
                setchangePassoword,
                isGoSite,
                SeisGoSite,
                isAdmin,
                SetisAdmin
            }}>
            {children}
        </ThemeContext.Provider>
    );
};


export const useTheme = () => {
    return useContext(ThemeContext);
};
