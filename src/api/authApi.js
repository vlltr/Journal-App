import axios from 'axios'

const authApi = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
    params: {
        key: 'AIzaSyB0OCf1Qjgm5uAxiMSlAnZRqMQcNT2rvRA'
    }
})

export default authApi