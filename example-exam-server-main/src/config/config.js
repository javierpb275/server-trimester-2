module.exports = {
  DB: {
    URI: process.env.MONGODB_URI || "mongodb://localhost:27017/apiclase",
    USER: process.env.MONGODB_USER || "apiclase",
    PASSWORD: process.env.MONGODB_PASSWORD || "abc123..",
    NAME: process.env.MONGODB_NAME || "apiclase",
  },
};
