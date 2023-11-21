import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import bodyParser from 'body-parser';
import cors from 'cors';

// Instantiate the express app
const app: Express = express();
dotenv.config();

// Parse request body
app.use(bodyParser.json());

// Use CORS install types as well
app.use(cors());

// Create database connection
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  synchronize: true,
});

// Define the server port
const port = process.env.PORT || 3000;

// Create a default route
app.get('/', (req: Request, res: Response) => {
  res.send('Express + Typescript server');
});

AppDataSource.initialize()
  .then(() => {
    console.log('👍 Datasource connection established');

    // Start listening to the requests on the defined port
    app.listen(port, () => console.log('👍 Server started on port', port));
  })
  .catch((error) => {
    console.log('💥 Error during datasource initialization', error);
  });
