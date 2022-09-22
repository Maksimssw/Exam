import './tickets.scss'
import { Link } from 'react-router-dom'

const Tickets = () => {
    return(
        <>
            <div className='back'>
                <div className='container'>
                    <div className='back__wrapper'>
                        <Link to="/" className='arrow arrow_left'>←</Link>
                        <p className='back__text'>Билеты ПДД АВ</p>
                    </div>
                </div>
            </div>
            <div className="tickets">
                <div className="container">
                    <h2 className='tickets__title'>Прогресс билетов</h2>
                    <div className='tickets__progress'>
                        <div className='tickets__active' style={{
                            width: '0%'
                        }}>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Tickets