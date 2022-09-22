import './header.scss';

const Header = () => {

    return(
        <>
            <header className="header">
                <div className="container">
                    <div className="header__wrapper">
                        <div className="header__list">
                            <p className='header__text'>0 / 800</p>
                            <div className="header__scale">
                                <div className='header__active' style={{
                                    width: `0%`
                                }}></div>
                            </div>
                            <p className='header__heading'>Вопросы</p>
                        </div>
                        <div className="header__list">
                            <p className='header__text'>0 / 40</p>
                            <div className="header__scale">
                                <div className='header__active' style={{
                                    width: `0%`
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