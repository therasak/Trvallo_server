const jwt = require('jsonwebtoken')

const AuthMiddelWare = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {console.log("NO token"); return res.status(401).json({isUser: false, message: "Not Authenticated"});}

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decode.userId;
        next()
    } catch (err) {
        console.log("Token exppired")
        return res.status(403).json({LoggedIn: false, message: "Invalid Token"});

    }
}

module.exports = {AuthMiddelWare}