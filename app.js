import bodyParser from 'body-parser';
import express from 'express';

import { voiceHandler } from './voice';

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.end('Hello, world!');
});

app.post('/handle_voice', voiceHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
