const useCalculator = () => {

    // Получение данных с LocalStorage 
    const getData = (data) => {
        const arr =  localStorage.getItem(data) ? 
            localStorage.getItem(data).split('-') : 0;
                
        try{
            return Array.from(new Set(arr)).filter(el => el !== '')
        }catch{
            return 0;
        }
    }
    
    // Подсчет решенных билетов
    const coutingSolvedTickets = (score) => {    
        const num = getData('solvedTickets');

        if (num === 0) return num

        if(score === 'percent'){
            // Процент пройденых билетов
            return num.length / 40 * 100;
        } else {
            // Число пройденых билетов
            return num.length
        }
    }

    // Подсчет решенных вопросов
    const coutingSolvedQuestion = (score) => {
         const num = getData('solvedTickets');

        if (num === 0) return num

        const numQuestion = num.length * 20;

        if(score === 'percent'){
            // Процент пройденых вопросов
            return numQuestion  / 800 * 100;
        } else {
            // Число пройденых вопросов
            return numQuestion 
        }
    }

    // Подсчет решенных тем
    const coutingSolvedThemes = (score) => {
        const num = getData('passedTopic');
        if (num === 0) return num

        if(score === 'percent'){
            // Процент пройденых тем
            return num.length / 27 * 100;
        } else {
            // Число пройденых тем
            return num.length
        }
    }
 
    return {coutingSolvedTickets, coutingSolvedQuestion, coutingSolvedThemes}
}

export default useCalculator;