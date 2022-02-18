module.exports = {
    DB: {
        URI: process.env.MONGODB_URI || "mongodb://apiclase:abc123..@127.0.0.1:27017/apiclase",
        USER: process.env.MONGODB_USER || "apiclase",
        PASSWORD: process.env.MONGODB_PASSWORD || "abc123..",
        NAME: process.env.MONGODB_NAME || "apiclase",
    },
    AUTH: {
        ACCESS_TOKEN_SECRET:
            process.env.ACCESS_TOKEN_SECRET || "someaccesstokensecret",
        REFRESH_TOKEN_SECRET:
            process.env.REFRESH_TOKEN_SECRET || "somerefreshtokensecret",
    },
};