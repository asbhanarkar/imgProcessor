import fs from 'fs';
// import path lib
import path from 'path';
//import file from main folder
import modify from '../main/processing';
// creating server using express
import express, { Request, Response } from 'express';

// Router() function is used to create a new router object.
// This function is used when you want to create a new router object in
//  your program to handle requests.
const image = express.Router();

image.get('/', async (rq: Request, rs: Response): Promise<void> => {
  // req.query property is an object containing the property for each query string parameter in the route
  const height = Number(rq.query.height);
  // convert string to integer
  const width = Number(rq.query.width);

  const fileName = rq.query.filename as unknown as string;
  //  original path of images
  const origin = `${path.resolve(
    __dirname,
    `./../../img/original/${fileName}.jpg`,
  )}`;
  // modified images path
  const lattest = `${path.resolve(
    __dirname,
    `./../../img/modified/new_${fileName}_${width}_${height}.jpg`,
  )}`;

  //  fs. existsSync() method is used to synchronously check
  // if a file already exists in the given path or not
  if (fs.existsSync(lattest)) {
    rs.sendFile(lattest);
  }
  // checking all data provided or not
  else if (!fileName || !width || !height ) {
    rs.status(404).send(
      'Please provide required data filename, height, width ',
    );
    return;
  }
  // if negative value or zeroo
  else if ( width <= 0 || height <= 0){
    rs.status(404).send(`<h1> Please provide width and height Postive value</h1>`);
    return
  }
  // calling to resize the image and send fileto new path
  else if (fs.existsSync(origin) && width > 0 && height > 0) {
    try {
      const data = modify(width, height, lattest, origin);
      data
        .then(() => rs.status(200).sendFile(lattest))
        .catch(() => rs.status(404).send(`<h1> error!!!</h1>`));
    } catch (err) {
      rs.status(404).send('<b>problem in processing file</b>');
      console.log(err);
    }
  }

  // if filename wrong then
  else {
    rs.status(404).send(`<h2><b> Image Not Found</b></h2>
               <div> replace test to one of the img <br>
               encenadaport <br>
               fjord<br>
               icelandwaterfall <br>
               palmtunnel <br>
               santamonica `);
  }
});

// export the creted data
export default image;
