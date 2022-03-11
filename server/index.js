const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");

const app = express();
const PORT = 4000;
app.use(cors());

app.use(express.json());
app.post("/scrapeBook", async (req, res) => {
  const { url, titles } = req.body;

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);

    // let element = await page.$(".heading--product-panel-title");
    // let value = await page.evaluate((el) => el.textContent, element);
    let result = await page.$$eval(".heading--product-panel-title", (names) =>
      names.map((name) => name.textContent)
    );

    res.json({
      results: result,
    });

    await browser.close();
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
