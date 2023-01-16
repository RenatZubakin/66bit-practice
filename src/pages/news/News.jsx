import s from './news.module.scss'
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {RiProfileLine} from "react-icons/ri"
import {MdRefresh} from "react-icons/md"
import {useDispatch, useSelector} from "react-redux";
import {loadingNews, refreshNews} from "../../store/newsSlice";


// Для реализации pull-to-refresh обновления страницы, есть уже готовая библиотека,
// но с помощью ее, решение данной задачи будет занимать несколько строк, поэтому я решил сам
// написать данный функционал
// Для сохранения новостей при перезагрузке страницы используются библиотки
// redux-toolkit и redux-persist. Библиотека redux-persist, при перезагрузке страницы,
// сохраняет состояние в localStorage, а после забирает его оттуда. Данное решение
// показалось мне более инетересным, чем простое сохранение всех новостей в localStorage.
// Так же реализовано обновление новостей по кнопке, кнопка появляется на экране, когда
// пользователь немного пролистнул страницу.

export default function News() {

    const state = useSelector(store => store.news.news);
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [fetching, setFetching] = useState(state.length === 0);
    const [scrollY, setScroll] = useState(0);

    // В хуке происходит подгрузка новостей на страницу за счет отслеживания состояния переменной fetching
    useEffect(() => {
        axios.get(`https://frontappapi.dock7.66bit.ru/api/news/get?page=${page}&count=10`)
            .then(res => {
                dispatch(loadingNews(res.data))
            })
            .finally(() => {
                setFetching(false)
                setPage(page + 10);

            })
    }, [fetching])

    useEffect(() => {
        document.addEventListener('scroll', scrollingHandler)
        return function () {
            document.removeEventListener('scroll', scrollingHandler)
        }
    }, [])

    //Функция, которая отслеживает прокрутку до конца страницы и вызывает подгрузку новостей
    const scrollingHandler = (e) => {
        if (e.target.documentElement.scrollHeight - e.target.documentElement.scrollTop - window.innerHeight < 100) {
            setFetching(true);
        }
        setScroll(e.target.documentElement.scrollTop)
    }

// Релизация обновления новостей при помощи свайпа

    const circleRefreshContainer = useRef();
    const circleRefresh = useRef()
    const [loading, setLoading] = useState(false);
    const [isPulling, setIsPulling] = useState(false);
    const initialPullState = {
        current: 0,
        initial: 0,
        progress: 0
    }
    const [pullState, setPullState] = useState(initialPullState);

    //Функция которая отслеживает начало косания экрана.
    const handleTouchStart = e => {
        if (!loading && window.pageYOffset === 0) {
            let init = e.changedTouches[0].pageY
            setPullState({...pullState, initial: init})
        }
    };


    //Функция которая отслеживает свайп по экрану
    const handleTouchMove = e => {
        const y = e.changedTouches[0].pageY;
        if (!loading && y >= pullState.current && window.pageYOffset === 0) {
            setIsPulling(true)
            setPullState({...pullState, current: y})
            if (y - pullState.initial <= 80 && y - pullState.initial > 0) {
                circleRefresh.current.style.marginTop = `${pullState.current - pullState.initial + 50}px`
            }
        }
    };


    //Функция которая отслеживает конец свайпа по экрану
    const handleTouchEnd = (e) => {
        if ((pullState.current - pullState.initial) >= 0) {
            setLoading(true);
            return pullRefreshHandler();
        }

    };


    // функция обновления новостей
    const pullRefreshHandler = async () => {
        axios.get(`https://frontappapi.dock7.66bit.ru/api/news/get?page=1&count=10`)
            .then(res => dispatch(refreshNews(res.data)))
            .finally(() => {
                setLoading(false)
                circleRefresh.current.style.marginTop = 0;
                setPullState(initialPullState);
                return setTimeout(() => {
                    setIsPulling(false);
                }, 1500)

            })
    }


    //Функция обновления новостей по кнопке, которая появляется после небольшой прокрутки страницы
    const refreshButtonHandler = async () => {
        axios.get(`https://frontappapi.dock7.66bit.ru/api/news/get?page=1&count=10`)
            .then(res => dispatch(refreshNews((res.data))))
            .finally(()=>{
                window.scrollTo({top: 0, behavior: 'smooth'  })
                setPage(11);
            })
    }

    return (
        <div ref={circleRefreshContainer} onTouchStart={handleTouchStart}
             onTouchMove={handleTouchMove}
             onTouchEnd={handleTouchEnd}
             className={s.page_container}>
            <div ref={circleRefresh} className={isPulling ? s.refresh_active : s.refresh_container}>
                <MdRefresh className={s.refresh_icon}/>
            </div>
            <div onClick={refreshButtonHandler} className={scrollY > 600 ? s.refresh_button_active : s.refresh_button}>
                <p>Новые новости</p>
            </div>
            {
                state.map(elem => (
                    <div className={s.news_container}>
                        <div className={s.news_head}>
                            <RiProfileLine width={50} className={s.icon}/>
                            <div className={s.title}>
                                <h4>{elem.title}</h4>
                                <p>{elem.createdAt}</p>
                            </div>
                        </div>
                        <div className={s.news_body}>
                            <p>{elem.content}</p>
                        </div>
                    </div>
                ))}
        </div>
    )
}