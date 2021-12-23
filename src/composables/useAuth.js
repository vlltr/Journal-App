import { useStore } from 'vuex'

const useAuth = () => {
    const store = useStore()

    const createUser = async (user) => {
        const response = await store.dispatch('auth/createUser', user)
        
        return response
        // console.log('test',user)

    }

    return {
        createUser
    }
}

export default useAuth