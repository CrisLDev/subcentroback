const jwt = require('jsonwebtoken');
function tokenValidation(req, res, next) {
    const token = req.header('Authorization').split(' ')[1];

    if(!token) return res.status(401).json({msg: 'Acceso denegado'});
    
    const payload = jwt.verify(token, 'rashumulukaska');

    req.userId = payload.id;

    next()
}

module.exports = tokenValidation;