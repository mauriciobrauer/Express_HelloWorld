const OpenAI = require("openai");
const { Configuration, OpenAIApi } = OpenAI;

var express = require("express");
var router = express.Router();

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
//const response = await openai.listEngines();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "ProDocs" });
});

router.post("/peticion", async (req, res) => {
  const { tipo_contrato } = req.body;

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Pretende que eres un abogado, escribe un contrato de ${tipo_contrato}`,
    max_tokens: 1000,
    temperature: 0,
  });
  //res.send("ok");
  console.log(response.data);
  if (response.data) {
    if (response.data.choices) {
      res.send(response.data.choices[0].text);
    }
  }
});

module.exports = router;
