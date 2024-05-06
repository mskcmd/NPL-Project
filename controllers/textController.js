const express = require("express");
const Text = require("../models/Text");
const natural = require("natural");
const tokenizer = new natural.WordTokenizer();

const router = express.Router();

// GET all texts
router.get("/", async (req, res) => {
  try {
    const texts = await Text.find();
    res.render("index", { texts });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// POST a new text with sentiment analysis
router.post("/", async (req, res) => {
  try {
    const { content } = req.body;
    const newText = new Text({ content });

    // Perform sentiment analysis
    const analyzer = new natural.SentimentAnalyzer(
      "English",
      natural.PorterStemmer,
      "afinn"
    );
    const analysis = analyzer.getSentiment(tokenizer.tokenize(content));

    // Save sentiment analysis result
    newText.sentiment = analysis;

    await newText.save();
    res.redirect("/texts");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
