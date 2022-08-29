let jwt = require('jsonwebtoken')

exports.verifyToken = (req, res, next)=>{
    const authHeader = req.get['Authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(!token) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
        if(err) return res.sendStatus(403)
        req.username = decoded.username
        next()
    })
}