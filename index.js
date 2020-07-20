const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swagUI = require('swagger-ui-dist');
const fs = require('fs');
const genSwagger = require('./genSwagger');
const dbInstance = require('./connections/mysql');
const bootstrap = require('./utils/bootstrap');

const {
  port
} = require('./config');

const abs = swagUI.getAbsoluteFSPath();
const _port = process.env.PORT || port;
const app = express();
app.use((req, res, next) => {
  console.log('REQ:', req.url);
  next();
})
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/health', (req, res) => res.status(200).json({
  healthy: true,
  time: new Date().getTime()
}));
app.use('/swagger.json', express.static('./swagger.json'));
const indexContent = fs.readFileSync(`${abs}/index.html`).toString().replace("https://petstore.swagger.io/v2/swagger.json", `http://localhost:${port}/swagger.json`);
app.get("/index.html", (req, res) => res.send(indexContent));
app.get("/", (req, res) => res.send(indexContent));
app.use(express.static(abs));

const models = require('./models');

const dbModels = models(dbInstance());
global.DB = dbInstance();
genSwagger(dbModels);
require('./routes')(app);

app.get('/health', (req, res) => res.json({
  success: true
}));
app.listen(_port, () => console.log(`API ${_port}! \n\n\n`));

module.exports = app; // for testing