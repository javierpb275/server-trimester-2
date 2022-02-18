const jwt = require("jsonwebtoken");
const config = require("../config/config")

const auth = async (
    req,
    res,
    next
) => {
    try {
        const authHeader = req.header("Authorization");
        if (!authHeader) {
            throw new Error();
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            throw new Error();
        }

        const payload = jwt.verify(
            token,
            config.AUTH.ACCESS_TOKEN_SECRET
        );

        req.userId = payload.id;

        next();
    } catch (err) {
        res.status(401).send({ error: "Please authenticate" });
    }
};

module.exports = auth;