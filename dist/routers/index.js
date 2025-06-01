"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ImagePrediksi_router_1 = __importDefault(require("./ImagePrediksi.router"));
const textPrediksi_router_1 = __importDefault(require("./textPrediksi.router"));
// import Ecommerce from "./Ecommerce.router";
const router = express_1.default.Router();
router.use("/image-prediksi", ImagePrediksi_router_1.default);
router.use("/text-prediksi", textPrediksi_router_1.default);
exports.default = router;
