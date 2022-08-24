//import file from img.ts
import file from './img';
//create server using express
import express, { Request, Response } from 'express';

// Router() function is used to create a new router object.
// This function is used when you want to create a new router object in
//  your program to handle requests.
const rout_call = express.Router();
// data that showing to dom
const data = `<h2>API is working</h2>
<div> add to url: /images?filename=test&width=800&height=500</div>
<div> replace test to img Name and size accordig to you </div>`;
// Api call
rout_call.get('/', (rq: Request, rs: Response) => {
  rs.send(data);
});

rout_call.use('/images', file);
// export the data
export default rout_call;
