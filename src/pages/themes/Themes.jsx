import {useTheme} from '../../hooks/useTheme';
import s from './themes.module.scss'
import axios from "axios";

export default function Themes(){
    //Кастомный хук для темы
    const {theme,setTheme}=useTheme();

    //получение темы по нажатии на кнопку
    const getTheme=async (name)=>{
        await axios.get(`https://frontappapi.dock7.66bit.ru/api/theme/get?name=${name}`)
            .then(res=> setTheme(res.data.name))

    }
    return(
        <div className={s.container}>
            <div onClick={()=>getTheme('light')} className={s.button_container}>
                <p>Светлая тема</p>
            </div>
            <div onClick={()=>getTheme('dark')} className={s.button_container}>
                <p>Тёмная тема</p>
            </div>
            <div onClick={()=>getTheme('blue')} className={s.button_container}>
                <p>Голубая тема</p>
            </div>
        </div>
    )
}