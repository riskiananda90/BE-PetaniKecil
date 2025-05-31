import axios from "axios";
import { env } from "process";

export async function callLlamaVisionModel(imageUrl: string) {
  const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
  const modelVersion =
    "nohamoamary/nabtah-plant-disease:33eabfb8b9664ec729b58d89d53e7ae8cd4e35979ebd5d27d22d1d95d88f7ee2";

  const url = `https://api.replicate.com/v1/predictions`;

  const body = {
    version: modelVersion,
    input: {
      image: imageUrl,
    },
  };

  try {
    const response = await axios.post(url, body, {
      headers: {
        Authorization: `Token ${REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const prediction = response.data;

    let status = prediction.status;
    let result = null;
    const predictionUrl = prediction.urls.get;

    while (status !== "succeeded" && status !== "failed") {
      await new Promise((r) => setTimeout(r, 1000));
      const check = await axios.get(predictionUrl, {
        headers: {
          Authorization: `Token ${REPLICATE_API_TOKEN}`,
        },
      });
      status = check.data.status;
      console.log("Ini dia ", check);

      if (status === "succeeded") {
        result = check.data.output;
      } else if (status === "failed") {
        throw new Error("Prediction failed");
      }
    }

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}
