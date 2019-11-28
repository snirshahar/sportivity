import HttpService from './HttpService.js'

const BASE_URL = 'http://localhost:3000/'

export default {
    login,
    logout,
    signup,
}
const signup = async (userCred) => {
    return await HttpService.post(BASE_URL + 'signup', userCred)
}
const login = async (userCred) => {
    return await HttpService.post(BASE_URL + 'login', userCred)
}
const logout = async () => {
    await HttpService.post(BASE_URL + 'logout')
    sessionStorage.clear();
    return console.log('user logout successfully');
    
}




