const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const OpenAI = require('openai');
const messages = []

const client = new OpenAI({
  apiKey:"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" // This is the default and can be omitted
});

async function main(input) {
  messages.push({ role: 'user', content: input })
  const chatCompletion = await client.chat.completions.create({
   // messages: [{ role: 'user', content: 'who is going to win US elections' }],
    messages: messages,
    model: 'gpt-3.5-turbo',
  });
  //console.log(chatCompletion.choices);
  return chatCompletion.choices[0]?.message?.content

}


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

// Render Html File
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'templates/index.html'));
});

app.post('/api', async function (req, res, next) {
  console.log(req.body)
  const mes = await main(req.body.input)
  res.json({success: true, message: mes})
})


app.listen(port, () => {
  console.log("Running...")
  // Code.....
})