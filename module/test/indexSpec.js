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
const index_1 = __importDefault(require("../index"));
// import processing file from main folder
const processing_1 = __importDefault(require("../main/processing"));
// import path library
const path_1 = __importDefault(require("path"));
// import supertest lirary
const supertest_1 = __importDefault(require("supertest"));
// supertest library that help to test api is working or not
const check = (0, supertest_1.default)(index_1.default);
//all syntax correct then test will accept
describe('get /api/images?filename=encenadaport&height=500&width=800', () => {
    it('test passed beacause all correct syntax', () => __awaiter(void 0, void 0, void 0, function* () {
        const path = check.get('/api/images?filename=encenadaport&height=500&width=800');
        expect((yield path).status).toBe(200);
    }));
});
//
describe('get request to be true', () => {
    it('respond true with status 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const path = check.get('/');
        expect((yield path).status).toBe(200);
    }));
});
// syntax wrong test
describe('get /api/height=500&width=800', () => {
    it('test accept', () => __awaiter(void 0, void 0, void 0, function* () {
        const path = check.get('/api/height=500&width=800');
        expect((yield path).status).toBe(404);
    }));
});
// resize test case but promise is wrong
describe('resizing theimage', () => {
    it('promise is wrong ', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expectAsync((0, processing_1.default)(200, 400, `${path_1.default.resolve(__dirname, `./../../img/original/fjord.jpg`)}`, `${path_1.default.resolve(__dirname, `./../../img/modified/fjord.jpg`)}`)).toBeRejected();
    }));
});
//we cannot use negative img size
describe('get /api/image?filename=icelandwaterfall&height=150&width=-150', () => {
    it('image sixe not negative thats why rejects', () => __awaiter(void 0, void 0, void 0, function* () {
        const path = check.get('/api/image?filename=icelandwaterfall&height=150&width=-150');
        expect((yield path).status).toBe(404);
    }));
});
describe('get request /api/images', () => {
    it('response with 404 without parameters', () => __awaiter(void 0, void 0, void 0, function* () {
        const path = check.get('/api/images');
        expect((yield path).status).toBe(404);
    }));
});
