// ThemedComponent.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainPage from "../pages/mainPage";

const ThemedDiv = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColor};
  padding: 20px;
`;

const ThemedComponent = () => {
    const [theme, setTheme] = useState({
        backgroundColor: '#e4f5fd',
        textColor: '#03030e',
    });

    useEffect(() => {
        const updateTheme = () => {
            const currentHour = new Date().getHours();
            if (currentHour >= 7 && currentHour < 18) {
                setTheme({
                    backgroundColor: '#e4f5fd',
                    textColor: '#03030e',
                });
            } else {
                setTheme({
                    backgroundColor: '#3c405c',
                    textColor: '#fff',
                });
            }
        };
        updateTheme();
        const intervalId = setInterval(updateTheme, 60000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <ThemedDiv theme={theme}>
            <MainPage/>
        </ThemedDiv>
    );
};

export default ThemedComponent;
