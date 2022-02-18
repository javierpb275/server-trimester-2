/* 
Before runing server: npm install
Run the server in development mode: npm run dev
Start the server: npm run start
*/
const app = require("./app");

app.listen(app.get("port"), () => {
  console.log(`Server is up on port ${app.get("port")}`);
});
