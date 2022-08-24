//creating server usin express
import express, { Request, Response } from 'express';
// import index file from rout folder
import exRouter from './rout/index';
// port number
const port = 8000;

const App = express();
// uses middleware
App.use('/api', exRouter);
// data added todom
const data = `<h2> Server started at localhost Port: ${port} </h2>
<div> check api working or  Not to add in url: /api </div>`;
// uses get middleware and send data
App.get('/', (rq: Request, rs: Response): void => {
  rs.status(200).send(data);
});

const printC = (): void => {
  console.log(`use to privew http://localhost:${port}`);
};
// listen port
App.listen(port, printC);
// export the all data
export default App;
