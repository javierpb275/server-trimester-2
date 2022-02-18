/*
arrancar servidor en modo desarrollo: npm run dev
arrancar servidor: npm run start
Tambien puedes hacer:
desarrollo: nodemon src/index
normal: node src/index
*/

const app = require("./app");
const { startMongooseConnection } = require("./db/mongoose");

startMongooseConnection();

app.listen(app.get("port"), () => {
  console.log("Server is up on port", app.get("port"));
});