const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (userId, secret, expiration) => {
    const token = jwt.sign({ id: userId }, secret, {
        expiresIn: expiration,
    });
    return token;
};

const hashPassword = async (password) => {
    const rounds = 10;
    const salt = await bcrypt.genSalt(rounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

const comparePassword = async (inputPassword, userPassword) => {
    return await bcrypt.compare(inputPassword, userPassword);
};

module.exports = {
    generateToken,
    hashPassword,
    comparePassword
}