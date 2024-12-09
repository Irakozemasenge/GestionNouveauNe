/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
function TranslateComponent() {
    useEffect(() => {
        let intervalId;
        const checkGoogleTranslate = () => {
            if (window.google && window.google.translate && window.google.translate.TranslateElement) {
                clearInterval(intervalId);
                new window.google.translate.TranslateElement(
                    { pageLanguage: 'fr' },
                    'btr'
                );
            }
        };
        intervalId = setInterval(checkGoogleTranslate, 100);
        return () => {
            clearInterval(intervalId);
        };
    }, []);


    return <div id='btr'></div>;
}

export default TranslateComponent;



