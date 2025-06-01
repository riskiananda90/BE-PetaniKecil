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
exports.callLlamaVisionModel = callLlamaVisionModel;
const axios_1 = __importDefault(require("axios"));
function callLlamaVisionModel(imageUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
        const modelVersion = "nohamoamary/nabtah-plant-disease:33eabfb8b9664ec729b58d89d53e7ae8cd4e35979ebd5d27d22d1d95d88f7ee2";
        const url = `https://api.replicate.com/v1/predictions`;
        const body = {
            version: modelVersion,
            input: {
                image: imageUrl,
            },
        };
        try {
            const response = yield axios_1.default.post(url, body, {
                headers: {
                    Authorization: `Token ${REPLICATE_API_TOKEN}`,
                    "Content-Type": "application/json",
                },
            });
            const prediction = response.data;
            let status = prediction.status;
            let result = null;
            const predictionUrl = prediction.urls.get;
            while (status !== "succeeded" && status !== "failed") {
                yield new Promise((r) => setTimeout(r, 1000));
                const check = yield axios_1.default.get(predictionUrl, {
                    headers: {
                        Authorization: `Token ${REPLICATE_API_TOKEN}`,
                    },
                });
                status = check.data.status;
                console.log("Ini dia ", check);
                if (status === "succeeded") {
                    result = check.data.output;
                }
                else if (status === "failed") {
                    throw new Error("Prediction failed");
                }
            }
            return result;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    });
}
