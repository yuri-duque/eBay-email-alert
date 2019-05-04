const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const AlertService = require("./Service/alertService");
const EbayService = require("./Service/ebayService");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json({}));
app.use(cors());

const alertService = new AlertService();
const ebayService = new EbayService();

app.get("/alerts", async (req, res) => alertService.list(req, res));
app.post("/alerts", async (req, res) => alertService.create(req, res));
app.put("/alerts", async (req, res) => alertService.update(req, res));
app.delete("/alerts", async (req, res) => alertService.delete(req, res));

app.get("/alerts/searchProduct", async (req, res) => ebayService.get(req, res));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
