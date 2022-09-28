import express from 'express';
import bodyParser from 'body-parser';
import { initializeApp, cert } from 'firebase-admin/app';
import credentials from '../credentials.json';
import { db } from './db';
import { routes } from './routes';

initializeApp({
  credential: cert(credentials),
  databaseURL: 'https://members-only.firebaseio.com'
});

const app = express();

app.use(bodyParser.json());

routes.forEach((route) => {
  app[route.method](route.path, route.handler);
});

const start = async () => {
  await db.connect(
    'mongodb+srv://GascoA:abc1234@cluster0.cseviwm.mongodb.net/?retryWrites=true&w=majority'
  );
  app.listen(8080, () => {
    console.log('Server is listening on port 8080');
  });
};

start();
