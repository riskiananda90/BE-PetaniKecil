// handlers/textPrediksiHandler.ts
import { Request, Response, NextFunction } from "express";
import { callReplicateModel } from "../models/granite";

export async function textPrediksiHandler(
  req: Request,
  res: Response,
  next?: NextFunction
) {
  const { diagnosisText, judul } = req.body;
  console.log(diagnosisText + judul);

  if (!diagnosisText) {
    return res.status(400).json({ error: "Diagnosis tidak boleh kosong" });
  }

  try {
    const advice = await callReplicateModel(diagnosisText, judul);

    res.json({ advice });
  } catch (error: any) {
    console.error("Error callReplicateModel:", error);
    if (next) {
      next(error);
    } else {
      res.status(500).json({ error: "Gagal memproses dengan Replicate" });
    }
  }
}
