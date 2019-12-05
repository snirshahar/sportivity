const authService = require('./auth.service')
const logger = require('../../services/logger.service')

async function login(req, res) {
    const { email, password } = req.body
    try {
        const user = await authService.login(email, password)
        req.session.user = user;
        res.json(user)
    } catch (err) {
        res.status(401).send({ error: err })
    }
}

async function register(req, res) {
    try {
        const { email, password, fullName } = req.body
        // logger.debug(email + ", " + password + ', ' + fullName)
        const account = await authService.register(email, password, fullName);
        // logger.debug(`auth.route - new account created: ` + JSON.stringify(account))
        req.session.user = account
        console.log(req.session.user);
        res.json(account)
    } catch (err) {
        // logger.error('[REGISTER] ' + err)
        res.status(500).send({ error: 'could not register, please try later' })
    }
}

async function logout(req, res) {
    try {
        req.session.destroy()
        res.send({ message: 'logged out successfully' })
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

module.exports = {
    login,
    register,
    logout
}