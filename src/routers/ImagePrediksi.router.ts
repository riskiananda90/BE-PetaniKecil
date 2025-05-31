import express, { Request, Response, NextFunction } from "express";
import { imagePrediksiHandler } from "../controllers/ImagePrediksi.controller";

const router = express.Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  await imagePrediksiHandler(req, res, next);
});

export default router;
