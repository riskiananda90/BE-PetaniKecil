import express, { Request, Response, NextFunction } from "express";
import { textPrediksiHandler } from "../controllers/textPrediksi.controller";

const router = express.Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  await textPrediksiHandler(req, res, next);
});

export default router;
