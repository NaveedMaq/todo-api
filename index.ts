import express, { Express } from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Task } from './src/task/task.entity';
import { taskRouter } from './src/task/task.router';

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
  entities: [Task],
});

// Define the server port
const port = process.env.PORT || 3000;

app.use(taskRouter);

AppDataSource.initialize()
  .then(() => {
    console.log('👍 Data Source has been initialized');

    // Start listening to the requests on the defined port
    app.listen(port, () => console.log('👍 Server started on port', port));
  })
  .catch((error) => {
    console.log('💥 Error during datasource initialization', error);
  });
