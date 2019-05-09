const express = require('express');
const next = require('next');
const mongoose = require('mongoose');

require('dotenv').config();

const User = require('./models/User');

const dev = process.env.NODE_ENV !== 'production';
const MONGO_URL = process.env.MONGO_URL_TEST;

const options = {
  userNewUrlParser: true,
  useCreateIndex: true,
  useFinndAndModify: false,
};
mongoose.connect(MONGO_URL, options);

const port = process.env.PORT || 8000;
const ROOT_URL = `http://localhost:${port}`;

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('/', async (req, res) => {
    // const user = { email: 'team@alo7.com' };
    const user = await User.findOne({ slug: 'team-builder-book' });
    app.render(req, res, '/', { user });
  });

  server.get('*', (req, res) => handle(req, res));

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on port ${ROOT_URL}`); // eslint-disable-line no-console
  });
});
