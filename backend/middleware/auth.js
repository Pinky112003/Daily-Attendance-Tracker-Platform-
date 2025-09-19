const authMiddleware = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).send('Unauthorized');
    }
    next();
};

const adminMiddleware = (req, res, next) => {
    if (!req.session.user || !req.session.user.is_admin) {
        return res.status(403).send('Forbidden');
    }
    next();
};

module.exports = { authMiddleware, adminMiddleware };
