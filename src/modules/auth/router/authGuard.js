import store from '@/modules/daybook/store'

const isAuthenticatedGuard = async (to, from, next) => {
    const { ok } = await store.dispatch('auth/checkAuthToken')
    if (ok) next()
    else next({ name: 'login' })
    // console.log(ok)
}

export default isAuthenticatedGuard