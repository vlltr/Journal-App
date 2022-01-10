import axios from 'axios'

const journalApi = axios.create({
    baseURL: 'https://vuejs-demo-510ee-default-rtdb.firebaseio.com'
})

journalApi.interceptors.request.use( (config) => {
    config.params ={
        auth: localStorage.getItem('idToken')
    }

    // config.headers = {
    //     authorization: 'bearer token'
    // }
    return config
})

export default journalApi