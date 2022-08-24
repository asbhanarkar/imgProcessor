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
const sharp_1 = __importDefault(require("sharp"));
// sharp is The typical use case for this high speed Node.
// js module is to convert large images in common formats to smaller,
// web-friendly JPEG, PNG, WebP, GIF and AVIF images of varying dimensions.
// As well as image resizing, operations such as rotation, extraction,
// compositing and gamma correction
// create modify function to resize img
const modify = (width, height, lattest, origin) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, sharp_1.default)(origin).resize(width, height).toFile(lattest);
});
// export the modify function
exports.default = modify;
