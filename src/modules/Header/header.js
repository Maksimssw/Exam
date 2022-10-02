import './header.scss';
import useCalculator from '../../hooks/useCalculator';

const Header = () => {

    const {coutingSolvedTickets, coutingSolvedQuestion} = useCalculator();

    return(
        <>
            <header className="header">
                <div className="container">
                    <h1 className='header__title'>Билеты АВ 2021 года</h1>
                    <div className="header__wrapper">
                        <div className="header__list">
                            <p className='header__text'>{coutingSolvedQuestion()} / 800</p>
                            <div className="header__scale">
                                <div className='header__active' style={{
                                    width: `${coutingSolvedQuestion('percent')}%`
                                }}></div>
                            </div>
                            <p className='header__heading'>Вопросы</p>
                        </div>
                        <div className="header__list">
                            <p className='header__text'>{coutingSolvedTickets()} / 40</p>
                            <div className="header__scale">
                                <div className='header__active' style={{
                                    width: `${coutingSolvedTickets('percent')}%`
                                }}></div>
                            </div>
                            <p className='header__heading'>Билеты</p>
                        </div>
                        <div className="header__list">
                            <p className='header__text'>0 / 27</p>
                            <div className="header__scale">
                                <div className='header__active' style={{
                                    width: `0%`
                                }}></div>
                            </div>
                            <p className='header__heading'>Темы</p>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;