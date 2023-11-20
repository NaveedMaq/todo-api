import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

// Instantiate the express app
const app: Express = express();
dotenv.config();

// Define the server port
const port = process.env.PORT || 3000;

// Create a default route
app.get('/', (req: Request, res: Response) => {
  res.send('Express + Typescript server');
});

// Start listening to the requests on the defined port
app.listen(port, () => console.log('Server started on port', port));
