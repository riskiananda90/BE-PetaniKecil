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
exports.getTokopediaProducts = getTokopediaProducts;
const node_fetch_1 = __importDefault(require("node-fetch"));
function getTokopediaProducts(keyword) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const url = `https://tokopedia7.p.rapidapi.com/product/search?q=${encodeURIComponent(keyword)}&ob=2`;
        const headers = {
            "x-rapidapi-key": "4561811048msh7381409aa70d150p16791djsn32b1a4f055a9",
            "x-rapidapi-host": "tokopedia7.p.rapidapi.com",
        };
        try {
            const response = yield (0, node_fetch_1.default)(url, { method: "GET", headers });
            if (!response.ok) {
                console.error(`Error API Tokopedia: ${response.status} ${response.statusText}`);
                return [];
            }
            const json = yield response.json();
            const products = (_b = (_a = json === null || json === void 0 ? void 0 : json.results) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.products;
            if (!Array.isArray(products)) {
                console.error("Response tidak memiliki data produk yang valid.");
                return [];
            }
            return products.slice(0, 5).map((item) => {
                var _a;
                return ({
                    title: item.name,
                    price: item.price,
                    image: item.imageUrl,
                    shop: ((_a = item.shop) === null || _a === void 0 ? void 0 : _a.name) || "Unknown Store",
                    url: item.url,
                });
            });
        }
        catch (error) {
            console.error("Gagal mengambil produk dari Tokopedia:", error);
            return [];
        }
    });
}
