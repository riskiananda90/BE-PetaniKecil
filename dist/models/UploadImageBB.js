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
exports.uploadImageToImgBB = uploadImageToImgBB;
const axios_1 = __importDefault(require("axios"));
const IMGBB_API_KEY = "f3ffe030992bae94b3bea9826657fba6";
function uploadImageToImgBB(base64Image) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
            const formData = new URLSearchParams();
            formData.append("key", IMGBB_API_KEY);
            formData.append("image", base64Data);
            const response = yield axios_1.default.post("https://api.imgbb.com/1/upload", formData.toString(), {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            });
            return response.data.data.url || null;
        }
        catch (error) {
            console.error("Gagal upload ke ImgBB:", error);
            return null;
        }
    });
}
