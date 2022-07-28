import './themes.scss';
import { Link } from 'react-router-dom';

const Themes = () => {
    return(
        <section className='themes'>
            <div className='container'>
                <div className='themes__wrapper'>
                    <h1 className='themes__title'>Все темы билетов 2021 года!</h1>
                    <Link to={'./Общие положения'} className="themes__link">Общие положения</Link>
                    <Link to={'./Дорожные знаки'} className="themes__link">Дорожные знаки</Link>
                    <Link to={'./Дорожная разметка'} className="themes__link">Дорожная разметка</Link>
                    <Link to={'./Сигналы светофора и регулировщика'} className="themes__link">Сигналы светофора и регулировщика</Link>
                    <Link to={'./Начало движения, маневрирование'} className="themes__link">Начало движения, маневрирование</Link>
                    <Link to={'./Скорость движения'} className="themes__link">Скорость движения</Link>
                    <Link to={'./Обгон, опережение, встречный разъезд'} className="themes__link">Обгон, опережение, встречный разъезд</Link>
                    <Link to={'./Остановка и стоянка'} className="themes__link">Остановка и стоянка</Link>
                    <Link to={'./Проезд перекрестков'} className="themes__link">Проезд перекрестков</Link>
                    <Link to={'./Пользование внешними световыми приборами и звуковыми сигналами'} className="themes__link">Пользование внешними световыми приборами и звуковыми сигналами</Link>
                </div>
            </div>
        </section>
    )
}

export default Themes;