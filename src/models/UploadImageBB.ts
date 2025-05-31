import axios from "axios";

const IMGBB_API_KEY = "f3ffe030992bae94b3bea9826657fba6"

export async function uploadImageToImgBB(
  base64Image: string
): Promise<string | null> {
  try {
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
    const formData = new URLSearchParams();
    formData.append("key", IMGBB_API_KEY);
    formData.append("image", base64Data);

    const response = await axios.post(
      "https://api.imgbb.com/1/upload",
      formData.toString(),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    return response.data.data.url || null;
  } catch (error) {
    console.error("Gagal upload ke ImgBB:", error);
    return null;
  }
}
