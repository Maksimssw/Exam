import Https from "./https.hook"

const Server = () => {

    const {loading, error, request} = Https();

    const requestTickets = async (url) => {
        console.log(url)
        const res = await request(url);
        return res;
    } // Получение всех билетов

    return {loading, error, requestTickets};
}

export default Server;