const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    try {
        const token = req.header('x-auth-token')

        // console.log(token)
        if (!token)
            return res.json({ msg: 'No authentication token, autherization denied.' })
        
        const verified = jwt.verify(token, process.env.JWT_SECRET)

        if (!verified)
            return res.status(401).json({ msg: 'Invalid token, autherization denied.' })

        req.user = verified.id
        next()
    } catch (err) {
        res.status(500).json(err.message)
    }
}

module.exports = auth