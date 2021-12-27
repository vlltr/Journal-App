// export const myAction = async({ commit }) => {


// }
import authApi from "../../../../api/authApi"

export const createUser = async (_,user) => {
    const { email, password } = user

    try {
        const { data } = await authApi.post(':signUp', { email, password, returnSecureToken: true })
        console.log(data)
        return { ok: true }
    } catch (error) {
        return { ok: false, message: error.response.data.error }
    }
}