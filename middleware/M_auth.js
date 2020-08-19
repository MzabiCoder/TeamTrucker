const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req,res,next) => {
    // get the token from the header
    const token = req.header('x-auth-token')
    // check if not token
    if (!token) {
        return res.status(401).json({ message:'No token, authorization denied !!!'})
    }
    try {
        // we verify the token and once its verified the payload its stored into decoded
        const decoded = jwt.verify(token, config.get('JWTsecret')) 
        // we assign the user to the req object
        req.user = decoded.user
        next()
    } catch (error) {
        res.status(401).json({message:'Token is not valid'})
    }
}