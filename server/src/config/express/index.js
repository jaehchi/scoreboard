import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { json, urlencoded } from 'body-parser';
import compression from 'compression';
import { resolve } from 'path';

import router from '../../routes';

const middleWare = [
  compression(),
  helmet(),
  cors({
    allowedHeaders: ['Content-type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT','DELETE', 'OPTIONS']
  }),
  json(),
  urlencoded( { extended: true } ),
  express.static( resolve( __dirname, '../../../../client/public') ) 
]

class App {
  constructor () {
    this.express = express();
    this.mountMiddleWare();
  }

  mountMiddleWare() {
    this.express.use(...middleWare);
    this.express.get('/*', (req, res) => {
      res.sendFile(resolve(__dirname, '../../../../client/public/index.html'))
    });
  }

  mountRoutes() {
    this.express.use('/api', router);
  }
}

export default new App;