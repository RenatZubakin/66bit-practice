import {useLayoutEffect, useState} from "react";

export const useTheme= ()=>{
    const [theme,setTheme]=useState(localStorage.getItem('theme')||'light')
    useLayoutEffect(()=>{
        //добавляем странице дополнительный атрибут data-theme,чтобы подстраивать стили под его значение
        //переменные со стилями находятся в файле index.css на 23-38 строчке
        document.documentElement.setAttribute('data-theme',theme);
        //сохраняем в localStorage, чтобы тема сохранялась при перезагрузке страницы
        localStorage.setItem('theme',theme);
    },[theme])

    return  {theme,setTheme}
}