require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes/v1/index");
const morgan = require("morgan");
const ui = require("swagger-ui-express");
const YAML = require("yamljs");
// const document = YAML.load("./swagger.yaml");
const cors_proxy = require("cors-anywhere");
const http = require("http"); // Pastikan modul http sudah di-require
const env = process.env;
const app = express();

const socketSetup = require('./config/socket.js'); // Modul untuk inisiasi socket.io
// app.use(morgan('tiny'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// const options = {
//   origin: "*",
// };

app.use(
  cors({
    credentials: true,
    origin: true,
    methods: ["GET", "POST", "DELETE", "PUT", "OPTION"],
  })
);

// app.use(cors(options));

app.use(routes);

const io = socketSetup(server); 

//setup ldevice lain
server.listen(env.PORT, "0.0.0.0", () => {
  console.info(`App listening at http://localhost:${env.PORT}`);
});
// server.listen(env.PORT,, () => {
//   console.info(`App listening at http://localhost:${env.PORT}`);
// });

module.exports = app;
