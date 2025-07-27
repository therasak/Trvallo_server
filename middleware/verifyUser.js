const jwt = require('jsonwebtoken')

const AuthMiddelWare = (req, res, next) => {
    const token = req.cookies.token;
    // console.log("Token")

    if (!token) {return res.status(401).json({message: "Not Authenticated"});}

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decode.userId;
        next()
    } catch (err) {
        console.log("Token exppired")
        return res.status(403).json({message: "Invalid Token"});

    }
}

module.exports = {AuthMiddelWare}