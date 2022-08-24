"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import file from img.ts
const img_1 = __importDefault(require("./img"));
//create server using express
const express_1 = __importDefault(require("express"));
// Router() function is used to create a new router object.
// This function is used when you want to create a new router object in
//  your program to handle requests.
const rout_call = express_1.default.Router();
// data that showing to dom
const data = `<h2>API is working</h2>
<div> add to url: /images?filename=test&width=800&height=500</div>
<div> replace test to img Name and size accordig to you </div>`;
// Api call
rout_call.get('/', (rq, rs) => {
    rs.send(data);
});
rout_call.use('/images', img_1.default);
// export the data
exports.default = rout_call;
