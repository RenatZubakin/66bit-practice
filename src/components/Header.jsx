import s from './layout.module.scss'
import {useEffect, useLayoutEffect, useState} from "react";

export default function Header(props){

    return(
        <header className={s.header_container}>
            <div className={s.header_content}>
                <h1>Название страницы</h1>
            </div>
        </header>

    )
}