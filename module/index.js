"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//creating server usin express
const express_1 = __importDefault(require("express"));
// import index file from rout folder
const index_1 = __importDefault(require("./rout/index"));
// port number
const port = 8000;
const App = (0, express_1.default)();
// uses middleware
App.use('/api', index_1.default);
// data added todom
const data = `<h2> Server started at localhost Port: ${port} </h2>
<div> check api working or  Not to add in url: /api </div>`;
// uses get middleware and send data
App.get('/', (rq, rs) => {
    rs.status(200).send(data);
});
const printC = () => {
    console.log(`use to privew http://localhost:${port}`);
};
// listen port
App.listen(port, printC);
// export the all data
exports.default = App;
