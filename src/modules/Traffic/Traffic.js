import './traffic.scss';
import './reset.scss'
import { Link } from 'react-router-dom'
import Header from '../Header/Header';
import exclamationMark from '../icons/exclamation-mark.png';
import book from '../icons/book.png';

const Traffic = () => {
    return (
        <>
            <Header/>
            <div className='traffic'>
                <div className='container'>
                    <div className='traffic__wrapper'>
                        <Link className='traffic__btn traffic_tickets' to='/tickets'>Билеты AB</Link>
                        <Link className='traffic__btn traffic_exam' to='/'>Экзамен</Link>
                        <Link className='traffic__btn traffic_light traffic_mistakes' to='/'>
                            Ошибки
                            <div className='traffic__icon'>
                                <img src={exclamationMark} alt="exclamation-mark"/>
                            </div>
                        </Link>
                        <Link className='traffic__btn traffic_light' to='/'>
                            Темы
                            <div className='traffic__icon'>
                                <img src={book} alt="book"/>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Traffic;