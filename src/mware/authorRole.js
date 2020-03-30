// module.exports = function (req, res, next) {
//     if(!req.user.isAdmin) return res.status(403).send('Access Denied')
//     //check role base instead to deny or

//     //grant
//     next()
// }

module.exports =function (roles = []) {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }
    return [
        (req, res, next) => {
            if (roles.length && !roles.includes(req.user.role)) {
                // user's role is not authorized
                return res.status(401).json({ message: 'Unauthorized' });
            }
            next();
        }
    ]
}