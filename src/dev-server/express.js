import express from 'express';
import path from 'path';

const server = express();

// development setup
const webpack = require('webpack');
const config = require('../../config/webpack.dev.js');
const compiler = webpack(config);
const webpackDevMiddleware = require('webpack-dev-middleware')(
  compiler,
  config.devServer
);
server.use(webpackDevMiddleware);

// hot reloading
const webpackHotMiddleware = require('webpack-hot-middleware')(compiler);
server.use(webpackHotMiddleware);

// static middleware
const staticMiddleware = express.static('dist');
server.use(staticMiddleware);

// start the server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`Development server started on port ${PORT}`));
