import { Request, Response, NextFunction } from "express";
import { callLlamaVisionModel } from "../models/llma";
import { uploadImageToImgBB } from "../models/UploadImageBB";
import { callReplicateModel } from "../models/granite";

export async function imagePrediksiHandler(
  req: Request,
  res: Response,
  next?: NextFunction
) {
  const { imageBase64 } = req.body;

  if (!imageBase64) {
    return res.status(400).json({ error: "Parameter kurang lengkap" });
  }

  try {
    const imageUrl = await uploadImageToImgBB(imageBase64);
    if (!imageUrl)
      return res.status(500).json({ error: "Gagal upload gambar" });
    const diagnosis = await callLlamaVisionModel(imageUrl);
    const advice = await callReplicateModel(diagnosis, "Prediksi");
    res.json({ advice });
  } catch (error: any) {
    console.error(error);
    if (next) {
      next(error);
    } else {
      res.status(500).json({ error: "Gagal memproses prediksi gambar" });
    }
  }
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