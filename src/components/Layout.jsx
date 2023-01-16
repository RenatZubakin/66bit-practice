import Header from "./Header";
import s from './layout.module.scss'
import {Outlet} from 'react-router-dom'
import Footer from "./Footer";

export default function Layout(props){
    return(
        <div className={s.layout}>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    )
}