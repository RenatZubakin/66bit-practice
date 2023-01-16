import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Themes from "./pages/themes/Themes";
import News from "./pages/news/News";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {useTheme} from "./hooks/useTheme";
import Layout from "./components/Layout";
import {useEffect, useState} from "react";

function App({navigation}) {
    const {theme, setTheme} = useTheme()
    return (
        <div className="App">
            <Routes>
                <Route path={'/'} element={<Layout />}>
                    <Route index element={<News/>}/>
                    <Route path={'themes'} element={<Themes/>}/>
                </Route>
            </Routes>

        </div>
    );
}

export default App;
