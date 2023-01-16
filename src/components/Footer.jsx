import s from './layout.module.scss'
import {Link} from "react-router-dom";
import {BsNewspaper,BsPalette} from "react-icons/bs"
export default function Footer(){
    return(
        <footer className={s.footer_container}>
            <div className={s.footer_content}>
                <div className={s.footer_item}>
                    <Link to={'/'}><BsNewspaper className={s.icon}/></Link>
                </div>
                <div className={s.footer_item}>
                    <Link to={'/themes'}><BsPalette className={s.icon}/></Link>
                </div>
            </div>
        </footer>

    )
}