const express = require("express");
const app = express();
const routes = require("./routes"); //busca el archivo index por defecto9
const PORT = 8080;

const { dbConnection } = require("./config/config");

app.use(express.json());

app.use("/", routes);

dbConnection();

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
