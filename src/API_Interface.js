import axios from 'axios';

const AxiosConfigured = () => {
    // Indicate to the API that all requests for this app are AJAX
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    // Set the baseURL for all requests to the API domain instead of the current domain
    // axios.defaults.baseURL = `http://localhost:8443/api/v1`;
    axios.defaults.baseURL = `http://localhost:8443/api`;


    // Allow the browser to send cookies to the API domain (which include auth_token)
    axios.defaults.withCredentials = true;


//    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf_token;

    return axios;
};


const axiosAgent = AxiosConfigured();

export default class APIInterface {

    async getUserInfo(username, password) {
        return axiosAgent.get(`login/${username}/${password}`)
            .then(userInfo => userInfo.data)
            .catch(error => (
                {
                    error,
                    user: undefined
                }));
    }

    async createAccount(username, password) {
        axiosAgent.get(`create-account/${username}/${password}`)
            .then(console.log(`account created!`))
            .catch(error => (
                {
                    error,
                    user: undefined
                }));

        return this.getUserInfo(username, password);
    }

    async updateStats(gamesPlayed, wins, unitsDestroyed, unitsLost, propertiesCaptured, damageDealt, username) {
        axiosAgent.get(`stats/${gamesPlayed}/${wins}/${unitsDestroyed}/${unitsLost}/${propertiesCaptured}/${damageDealt}/${username}`)
            .then(console.log(`stats updated!`))
            .catch(error => (
                {
                    error,
                    user: undefined
                }
            ))
    }

}