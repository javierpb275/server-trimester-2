const app = require("./app");
const startMongooseConnection = require("./db/mongoose");

startMongooseConnection();

app.listen(app.get("port"), () => {
    console.log(`Server is up on port ${app.get("port")}`);
});