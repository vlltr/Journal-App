import axios from 'axios'

const journalApi = axios.create({
    baseURL: 'https://vuejs-demo-510ee-default-rtdb.firebaseio.com'
})

export default journalApi