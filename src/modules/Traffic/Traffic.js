import './traffic.scss';
import './reset.scss'
import { Link } from 'react-router-dom'
import trafficLights from '../img/traffic_lights.png';


const Traffic= () => {
    return (
        <>
        <header className='header'>
            <div className='container'>
                <img className='header__traffic_lights' src={trafficLights} alt={trafficLights}/>
                <h1 className='header__title'>Экзамены и Билеты 2021 года</h1>
            </div>
        </header>
        <section className='traffic'>
            <div className='container'>
                <div className='traffic__wrapper'>
                    <div className='traffic__list'>
                        <Link className='traffic__link' to={'/'}>Билеты</Link>
                        <Link className='traffic__link' to={'/'}>Экзамен</Link>
                        <Link className='traffic__link' to={'/themes'}>Темы</Link>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default Traffic;