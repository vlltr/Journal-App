import { useStore } from 'vuex'
import {computed} from 'vue'

const useAuth = () => {
    const store = useStore()

    const createUser = async (user) => {
        const response = await store.dispatch('auth/createUser', user)
        return response
    }

    const loginUser = async (user) => {
        const response = await store.dispatch('auth/signInUser', user)
        return response
    }

    const checkAuthStatus = async () => {
        const response = await store.dispatch('auth/checkAuthToken')
        return response
    }

    return {
        checkAuthStatus,
        createUser,
        loginUser,
        
        authStatus: computed(() => store.getters['auth/currentState']),
        username: computed(() => store.getters['auth/username'])
    }
}

export default useAuth