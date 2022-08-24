"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
// import path lib
const path_1 = __importDefault(require("path"));
//import file from main folder
const processing_1 = __importDefault(require("../main/processing"));
// creating server using express
const express_1 = __importDefault(require("express"));
// Router() function is used to create a new router object.
// This function is used when you want to create a new router object in
//  your program to handle requests.
const image = express_1.default.Router();
image.get('/', (rq, rs) => __awaiter(void 0, void 0, void 0, function* () {
    // req.query property is an object containing the property for each query string parameter in the route
    const height = Number(rq.query.height);
    // convert string to integer
    const width = Number(rq.query.width);
    const fileName = rq.query.filename;
    //  original path of images
    const origin = `${path_1.default.resolve(__dirname, `./../../img/original/${fileName}.jpg`)}`;
    // modified images path
    const lattest = `${path_1.default.resolve(__dirname, `./../../img/modified/new_${fileName}_${width}_${height}.jpg`)}`;
    //  fs. existsSync() method is used to synchronously check
    // if a file already exists in the given path or not
    if (fs_1.default.existsSync(lattest)) {
        rs.sendFile(lattest);
    }
    // checking all data provided or not
    else if (!fileName || !width || !height) {
        rs.status(404).send('Please provide required data filename, height, width ');
        return;
    }
    // if negative value or zeroo
    else if (width <= 0 || height <= 0) {
        rs.status(404).send(`<h1> Please provide width and height Postive value</h1>`);
        return;
    }
    // calling to resize the image and send fileto new path
    else if (fs_1.default.existsSync(origin) && width > 0 && height > 0) {
        try {
            const data = (0, processing_1.default)(width, height, lattest, origin);
            data
                .then(() => rs.status(200).sendFile(lattest))
                .catch(() => rs.status(404).send(`<h1> error!!!</h1>`));
        }
        catch (err) {
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
}));
// export the creted data
exports.default = image;
