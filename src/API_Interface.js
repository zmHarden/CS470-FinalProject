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

    /*
    async allRoutes() {
        return axiosAgent.get(`routes/all-routes`);
    }

    async allMarkets() {
        return axiosAgent.get(`markets/all-markets`);
    }

    async allEmployees() {
        return axiosAgent.get(`employees/all-employees`);
    }

    async allAccounts() {
        return axiosAgent.get(`accounts/all-accounts`);
    }

    async getCycleID() {
        return axiosAgent.get(`cycleID`);
    }

    async getInputInfo(input, comp) {
        if (comp === 'Market'){
            return axiosAgent.get(`markets/${input}`)
        }else if (comp === 'Account'){
            return axiosAgent.get(`accounts/${input}`)
        }else if (comp === 'Route'){
            return axiosAgent.get(`routes/${input}`)
        }
    }

    async getNumTransactions(cycleID) {
        return axiosAgent.get(`transactions/${cycleID}`);
    }

    async getTransactionsWithMarketID(cycleID, marketID) {
        return axiosAgent.get(`transactions/${cycleID}/${marketID}/trans-for-market`)
    }

    async getTransactionsWithAccountID(cycleID, accountID) {
        return axiosAgent.get(`transactions/${cycleID}/${accountID}/one-account`)
    }

    async getTransactionsWithRouteID(cycleID, routeID) {
        return axiosAgent.get(`transactions/${cycleID}/${routeID}/trans-for-route`)
    }
    */

}