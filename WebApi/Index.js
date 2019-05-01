const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const AlertService = require("./Service/alertService");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json({}));
app.use(cors());

const service = new AlertService();

// req = request / res = response
app.get("/alerts", async (req, res) => service.list(req, res));
app.post("/alerts", async (req, res) => service.create(req, res));
app.put("/alerts", async (req, res) => service.update(req, res));
app.delete("/alerts", async (req, res) => service.delete(req, res));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
