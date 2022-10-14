import quetions from '../../questions.json';
import Themes from '../ThemesSection/Themes/Themes';

const ThemesPage = () => {

    const data = new Set(quetions.map(el => {
        return el.topic;
    }));

    console.log(data);

    return(
        <Themes data={data}/>
    )
}

export default ThemesPage;