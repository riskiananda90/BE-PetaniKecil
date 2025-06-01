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
exports.textPrediksiHandler = textPrediksiHandler;
const granite_1 = require("../models/granite");
function textPrediksiHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { diagnosisText, judul } = req.body;
        console.log(diagnosisText + judul);
        if (!diagnosisText) {
            return res.status(400).json({ error: "Diagnosis tidak boleh kosong" });
        }
        try {
            const advice = yield (0, granite_1.callReplicateModel)(diagnosisText, judul);
            res.json({ advice });
        }
        catch (error) {
            console.error("Error callReplicateModel:", error);
            if (next) {
                next(error);
            }
            else {
                res.status(500).json({ error: "Gagal memproses dengan Replicate" });
            }
        }
    });
}
