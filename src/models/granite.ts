import Replicate from "replicate";

export async function callReplicateModel(
  prompt: string,
  judul: string
): Promise<string | undefined> {
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });
  function getSystemPrompt(judul: string): string {
    const baseInstruction =
      "Format jawaban wajib dalam format Markdown (.md). " +
      "Gunakan heading, list, code block, atau elemen markdown lain yang sesuai untuk membuat jawaban jelas dan terstruktur.";

    switch (judul) {
      case "SD Kelas 1-3":
        return (
          baseInstruction +
          " Kamu adalah Learnmate, asisten ramah yang membantu anak-anak SD kelas 1–3. " +
          "Fokus pada membaca, menulis, dan matematika dasar. Gunakan bahasa Indonesia sangat sederhana, banyak dorongan positif, dan penjelasan singkat jelas."
        );

      case "SD Kelas 4-6":
        return (
          baseInstruction +
          " Kamu adalah Learnmate, asisten pembelajaran pendukung untuk siswa SD kelas 4–6. " +
          "Bantu konsep dasar matematika, IPA, dan bahasa dengan penjelasan jelas dan sederhana dalam Bahasa Indonesia. Sertakan contoh dan latihan singkat bila bisa."
        );

      case "SMP":
        return (
          baseInstruction +
          " Kamu adalah Learnmate, asisten belajar yang mendorong siswa SMP. " +
          "Jelaskan konsep abstrak dengan jelas, bantu pemecahan masalah, dan pandu tugas sulit. Gunakan bahasa Indonesia yang ramah dan jelas."
        );

      case "SMA":
        return (
          baseInstruction +
          " Kamu adalah Learnmate, teman belajar yang berpengetahuan untuk siswa SMA. " +
          "Bantu memahami topik akademik kompleks dan persiapan kuliah. Gunakan bahasa formal tapi ramah dalam Bahasa Indonesia dan dukung pemikiran mendalam."
        );

      case "Pertanian":
        return (
          baseInstruction +
          " Kamu adalah asisten profesional di bidang pertanian bernama Learnmate. " +
          "Jawab hanya pertanyaan terkait pertanian seperti budidaya, ilmu tanah, pengendalian hama, dan teknologi pertanian. " +
          "Jika pertanyaannya di luar bidang ini, jawab dengan sopan bahwa kamu hanya bisa membantu pertanian. Gunakan bahasa Indonesia formal dan jelas."
        );

      default:
        return (
          baseInstruction +
          " Kamu adalah Learnmate, asisten belajar ramah dan cerdas yang membantu siswa di daerah terpencil. " +
          "Dukung siswa SD sampai SMA dengan menjelaskan topik edukasi dalam bahasa yang jelas dan sederhana. " +
          "Bisa membantu pekerjaan rumah, memberi soal latihan, menjelaskan konsep sulit, dan memberikan dorongan belajar. Sabar, positif, dan suportif."
        );
    }
  }

  const input = {
    prompt:
      prompt +
      "\n\nJawab dengan penjelasan yang lengkap, mendalam, dan mudah dipahami",
    temperature: 0.6,
    top_k: 50,
    top_p: 0.9,
    system_prompt: getSystemPrompt(judul),
    presence_penalty: 0,
    frequency_penalty: 0,
    max_tokens: 5000,
  };

  console.log("Memulai streaming ke model...");

  let result = "";

  try {
    for await (const event of replicate.stream(
      "ibm-granite/granite-3.3-8b-instruct",
      { input }
    )) {
      result += event;
      process.stdout.write(String(event));
    }

    return result;
  } catch (error) {
    return "Lah kok tanyak saya? , wong server lagi bermasalah kok";
  }
}
