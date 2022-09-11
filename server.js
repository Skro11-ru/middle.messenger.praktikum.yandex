import express from 'express';
import path from 'node:path';
import * as url from 'node:url';

import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(
  express.static(`${path.dirname(url.fileURLToPath(import.meta.url))}/dist`),
);
app.get('*', (request, response) => {
  response.sendFile(
    `${path.dirname(url.fileURLToPath(import.meta.url))}/dist/`,
  );
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at http://localhost:${PORT}!`);
});
