const useCalculator = () => {

    // Получение данных с LocalStorage 
    const getData = (data) => {
        return localStorage.getItem(data) ? 
            localStorage.getItem(data)
                .split('-')
                .filter(function(item, pos) {
                    return localStorage.getItem(data).indexOf(item) !== pos;
                })
                .filter(el => el !== '') : 0;
    }
    
    // Подсчет решенных билетов
    const coutingSolvedTickets = (score) => {    
        const num = getData('solvedTickets');

        if (num === 0) return num

        if(score === 'percent'){
            // Процент пройденых билетов
            console.log(num);
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

    return {coutingSolvedTickets, coutingSolvedQuestion}
}

export default useCalculator;