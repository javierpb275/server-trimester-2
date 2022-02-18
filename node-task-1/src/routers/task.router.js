const express = require("express");
const fsp = require("fs/promises");
const path = require("path");

const router = new express.Router();

router.post("/", async (req, res) => {
  const date = new Date();
  const data = { date: date.toLocaleString() };
  try {
    if (!req.header("X-Forwarded-For")) {
      res.status(400).send("Please, provide your IP address");
    }
    await fsp.writeFile(
      `${path.resolve(".")}/${req.header("X-Forwarded-For")}.json`,
      JSON.stringify(data)
    );
    res.status(201).json(data);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/", async (req, res) => {
  try {
    if (!req.header("X-Forwarded-For")) {
      res.status(400).send("Please, provide your IP address");
    }
    const buffer = await fsp.readFile(
      `${path.resolve(".")}/${req.header("X-Forwarded-For")}.json`
    );
    const data = JSON.parse(buffer);
    res.status(200).json(data);
  } catch (e) {
    res.status(404).send("Data Not found");
  }
});

module.exports = router;
