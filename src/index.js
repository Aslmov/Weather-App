import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import "@fontsource/poiret-one";
import MainPage from "./pages/mainPage";
import ThemedComponent from "./widget/ThemeComponent";
import sevenDays from "./pages/sevenDays";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SevenDays from "./pages/sevenDays";
import ThemedComponent2 from "./widget/ThemeComponent2";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<ThemedComponent />} />
                <Route path="/sevenDays" element={<ThemedComponent2 />} />
            </Routes>
        </Router>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
