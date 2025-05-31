import express from "express";
import imagePrediksiRouter from "./ImagePrediksi.router";
import textPrediksiRouter from "./textPrediksi.router";
// import Ecommerce from "./Ecommerce.router";
const router = express.Router();

router.use("/image-prediksi", imagePrediksiRouter);
router.use("/text-prediksi", textPrediksiRouter);
// router.get("/product", Ecommerce);

export default router;
