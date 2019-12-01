import HttpService from './HttpService'

export default {
    login,
    logout,
    register,
    getUsers,
    getById,
    remove,
    update
}

function getById(userId) {
    return HttpService.get(`user/${userId}`)
}
function remove(userId) {
    return HttpService.delete(`user/${userId}`)
}

function update(user) {
    return HttpService.put(`user/${user._id}`, user)
}

async function login(userCred) {
    try {
        const user = await HttpService.post('auth/login', userCred)
        return _handleLogin(user)
    } catch (err) {
        return err;
    }
}
async function register(userCred) {
    try {
        console.log('UserService', userCred)
        const user = await HttpService.post('auth/register', userCred)
        return _handleLogin(user)
    } catch (err) {
        sessionStorage.removeItem('user-cookie');
        return err;
    }
}
async function logout() {
    await HttpService.post('auth/logout');
    sessionStorage.clear();
}
function getUsers() {
    return HttpService.get('user')
}

function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}