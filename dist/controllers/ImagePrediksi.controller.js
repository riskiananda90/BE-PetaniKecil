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
Object.defineProperty(exports, "__esModule", { value: true });
exports.imagePrediksiHandler = imagePrediksiHandler;
const llma_1 = require("../models/llma");
const UploadImageBB_1 = require("../models/UploadImageBB");
const granite_1 = require("../models/granite");
function imagePrediksiHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { imageBase64 } = req.body;
        if (!imageBase64) {
            return res.status(400).json({ error: "Parameter kurang lengkap" });
        }
        try {
            const imageUrl = yield (0, UploadImageBB_1.uploadImageToImgBB)(imageBase64);
            if (!imageUrl)
                return res.status(500).json({ error: "Gagal upload gambar" });
            const diagnosis = yield (0, llma_1.callLlamaVisionModel)(imageUrl);
            const advice = yield (0, granite_1.callReplicateModel)(diagnosis, "Prediksi");
            res.json({ advice });
        }
        catch (error) {
            console.error(error);
            if (next) {
                next(error);
            }
            else {
                res.status(500).json({ error: "Gagal memproses prediksi gambar" });
            }
        }
    });
}
// [Input User / Deteksi Penyakit]
//         ↓
// [Model AI: Jenis Penyakit]
//         ↓
// [Rule Based / Prompting: Rekomendasi Produk]
//         ↓
// [Cari Produk: dari DB lokal atau Web Scraping/API]
//         ↓
// [Frontend: Tampilkan Gambar + Nama Produk + Link Beli]
