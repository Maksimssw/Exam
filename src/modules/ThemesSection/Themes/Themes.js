import { useState, useEffect } from "react";
import './themes.scss';
import { Link } from "react-router-dom";

const Themes = (data) => {

    // Все темы
    const [themes, useThemes] = useState(Array.from(data.data));

    console.log(themes);

    // Создание тем
    const topic =  themes !== false ? themes.map((el, i) => {
        return(
            <li key={i} className="themes__list">
                {i + 1})
                <Link 
                    to={`/themes/${el}`}
                    className="themes__link">
                        {el}
                </Link>
            </li>
        )
    }) : null

    console.log(topic);

    return(
        <section className="themes">
            <div className="container">
                <h1 className="themes__title">Тренеровка по темам</h1>
                <nav>
                    <ul className="themes__wrapper">
                        {topic}
                    </ul>
                </nav>
            </div>
        </section>
    )
}

export default Themes;