// export const myMutation = ( state ) => {

// }

export const loginUser = ( state, { user, idToken, refreshToken } ) => {
    if(idToken) {
        localStorage.setItem('idToken', idToken)
        state.idToken = idToken
    }

    if(idToken) {
        localStorage.setItem('refreshToken', refreshToken)
        state.refreshToken = refreshToken
    }

    state.user = user
    state.status = 'authenticated'
}

export const logout = ( state ) => {
    state.user = null
    state.status = 'not-authenticated'
    state.idToken = null
    state.refreshToken = null

    localStorage.removeItem('idToken')
    localStorage.removeItem('refreshToken')
}