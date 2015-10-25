import bodyParser from 'body-parser';
import express from 'express';

import { voiceHandler, fetchLol, reset } from './voice';

const app = express();

app.use(express.static(`${__dirname}/public`));

let last = Date.now();
app.use((req, res, next) => {
  if (Date.now() - last < 1000) {
    res.end();
  }
  last = Date.now();
});

app.get('/', (req, res) => {
  res.end('Hello, world!');
});

app.get('/handle_voice', voiceHandler);

app.get('/fetch_lol', fetchLol);

app.get('/reset', reset);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
