import fetch from "node-fetch";

interface TokopediaProduct {
  title: string;
  price: string;
  image: string;
  shop: string;
  url: string;
}

export async function getTokopediaProducts(
  keyword: string
): Promise<TokopediaProduct[]> {
  const url = `https://tokopedia7.p.rapidapi.com/product/search?q=${encodeURIComponent(
    keyword
  )}&ob=2`;

  const headers = {
    "x-rapidapi-key": "4561811048msh7381409aa70d150p16791djsn32b1a4f055a9",
    "x-rapidapi-host": "tokopedia7.p.rapidapi.com",
  };

  try {
    const response = await fetch(url, { method: "GET", headers });

    if (!response.ok) {
      console.error(
        `Error API Tokopedia: ${response.status} ${response.statusText}`
      );
      return [];
    }

    const json: any = await response.json();

    const products = json?.results?.data?.products;

    if (!Array.isArray(products)) {
      console.error("Response tidak memiliki data produk yang valid.");
      return [];
    }

    return products.slice(0, 5).map((item: any) => ({
      title: item.name,
      price: item.price,
      image: item.imageUrl,
      shop: item.shop?.name || "Unknown Store",
      url: item.url,
    }));
  } catch (error) {
    console.error("Gagal mengambil produk dari Tokopedia:", error);
    return [];
  }
}
