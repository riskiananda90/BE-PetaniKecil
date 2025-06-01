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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callReplicateModel = callReplicateModel;
const replicate_1 = __importDefault(require("replicate"));
const ecommerceFetcher_1 = require("../models/ecommerceFetcher");
function callReplicateModel(prompt, judul) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, e_1, _b, _c;
        const replicate = new replicate_1.default({
            auth: process.env.REPLICATE_API_TOKEN,
        });
        function getSystemPrompt(judul) {
            const baseInstruction = "Format jawaban wajib dalam format Markdown (.md) dan sangat bagus kalau ada gambar maka berikan dalam bentuk tautan aja yang bisa di klik   " +
                "Gunakan heading, point pointnya , list, code block, atau elemen markdown lain yang sesuai untuk membuat jawaban jelas dan terstruktur.";
            switch (judul) {
                case "CariProduct":
                    return "Kamu adalah si pencari product di tempat jualan , berikan hanya 1 nama product yang sesuai tanpa penjelasan lainnya tanpa kata lainya , cuman 1 product yang paling relavan dengan perintah berikut ";
                case "Prediksi":
                    return (baseInstruction +
                        "Beri tahu bahwa hasil prediksi penyakit tanaman pengguna telah ditemukan. " +
                        "Kamu adalah seorang ilmuwan spesialis dalam prediksi penyakit tumbuhan. " +
                        "Berikan deskripsi yang sangat detail mengenai penyakit tumbuhan tersebut, termasuk gejala-gejalanya, penyebab, dan bagaimana penyakit itu menyebar. " +
                        "Fokus kamu adalah menjelaskan hasil prediksi tersebut secara ilmiah dan mudah dipahami oleh petani atau pengguna umum.");
                case "SD Kelas 1-3":
                    return (baseInstruction +
                        " Kamu adalah Learnmate, asisten ramah yang membantu anak-anak SD kelas 1–3. " +
                        "Fokus pada membaca, menulis, dan matematika dasar. Gunakan bahasa Indonesia sangat sederhana, banyak dorongan positif, dan penjelasan singkat jelas.");
                case "SD Kelas 4-6":
                    return (baseInstruction +
                        " Kamu adalah Learnmate, asisten pembelajaran pendukung untuk siswa SD kelas 4–6. " +
                        "Bantu konsep dasar matematika, IPA, dan bahasa dengan penjelasan jelas dan sederhana dalam Bahasa Indonesia. Sertakan contoh dan latihan singkat bila bisa.");
                case "SMP":
                    return (baseInstruction +
                        " Kamu adalah Learnmate, asisten belajar yang mendorong siswa SMP. " +
                        "Jelaskan konsep abstrak dengan jelas, bantu pemecahan masalah, dan pandu tugas sulit. Gunakan bahasa Indonesia yang ramah dan jelas.");
                case "SMA":
                    return (baseInstruction +
                        " Kamu adalah Learnmate, teman belajar yang berpengetahuan untuk siswa SMA. " +
                        "Bantu memahami topik akademik kompleks dan persiapan kuliah. Gunakan bahasa formal tapi ramah dalam Bahasa Indonesia dan dukung pemikiran mendalam.");
                case "Pertanian":
                    return (baseInstruction +
                        " Kamu adalah asisten profesional di bidang pertanian bernama Agribot. " +
                        "Jawab hanya pertanyaan terkait pertanian seperti budidaya, ilmu tanah, pengendalian hama, dan teknologi pertanian. " +
                        "Jika pertanyaannya di luar bidang ini, jawab dengan sopan bahwa kamu hanya bisa membantu pertanian. Gunakan bahasa Indonesia formal dan jelas.");
                default:
                    return (baseInstruction +
                        " Kamu adalah Learnmate, asisten belajar ramah dan cerdas yang membantu siswa di daerah terpencil. " +
                        "Dukung siswa SD sampai SMA dengan menjelaskan topik edukasi dalam bahasa yang jelas dan sederhana. " +
                        "Bisa membantu pekerjaan rumah, memberi soal latihan, menjelaskan konsep sulit, dan memberikan dorongan belajar. Sabar, positif, dan suportif.");
            }
        }
        const systemPrompt = getSystemPrompt(judul);
        let fullPrompt;
        if (judul === "CariProduct") {
            fullPrompt = `${systemPrompt}\n\n${prompt}\n\n jawab dengan 1 nama product aja `;
        }
        else {
            fullPrompt = `${systemPrompt}\n\n${prompt}\n\nJawab dengan penjelasan yang lengkap, mendalam, dan mudah dipahami.`;
        }
        const input = {
            prompt: fullPrompt,
            temperature: 0.6,
            top_k: 50,
            top_p: 0.9,
            system_prompt: systemPrompt,
            presence_penalty: 0,
            frequency_penalty: 0,
            max_tokens: 5000,
        };
        console.log("Memulai streaming ke model...");
        let result = "";
        try {
            try {
                for (var _d = true, _e = __asyncValues(replicate.stream("ibm-granite/granite-3.3-8b-instruct", { input })), _f; _f = yield _e.next(), _a = _f.done, !_a; _d = true) {
                    _c = _f.value;
                    _d = false;
                    const event = _c;
                    result += event;
                    process.stdout.write(String(event));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (judul === "CariProduct") {
                const productName = result.trim();
                console.log("Product name dari Replicate:", productName);
                const tokopediaResult = yield (0, ecommerceFetcher_1.getTokopediaProducts)(productName);
                console.log("Hasil Tokopedia:", tokopediaResult);
                return tokopediaResult;
            }
            else {
                return result;
            }
        }
        catch (error) {
            console.error("Error dalam callReplicateModel:", error);
            return "Maaf, terjadi kesalahan pada server. Silakan coba lagi nanti.";
        }
    });
}
