import Mistakes from "../MistakesSection/Mistakes/Mistakes"
import questions from '../../questions.json';

const MistakesPage = () => {

    let arrs = []

    const data = localStorage.getItem('mistakes') ? localStorage.getItem('mistakes')
                .split('-')
                .filter(el => el !== '')
                .map(el => el.split('_'))
                .filter(el => {
        const res = questions.filter(els => {
            return els.ticket_number.replace(/\D/g, '') === el[0] &&
                     els.title.replace(/\D/g, '') === el[1]
        })

        arrs.push(...res);
    }) : null

    return(
        <section className="mistake">
            <div className="container">
                <Mistakes data={arrs}/>
            </div>
        </section>
    )
}

export default MistakesPage