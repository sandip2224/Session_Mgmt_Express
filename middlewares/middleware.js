const redirectLogin = (req, res, next) => {
    const { userId } = req.session
    if (!userId) {
        console.log('[401] User is not authenticated to access /home')
        return res.redirect('/login')
    }
    next()
}

const redirectDashboard = (req, res, next) => {
    const { userId } = req.session
    if (userId) {
        return res.redirect('/dashboard')
    }
    next()
}

module.exports = { redirectLogin, redirectDashboard }