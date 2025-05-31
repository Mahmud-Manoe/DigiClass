const axios = require("axios");
exports.evaluateAnswer = async (soal, kunci_jawaban, jawaban_siswa, bobot_penilaian) => {
  const data = {
    soal,
    kunci_jawaban,
    jawaban_siswa,
    bobot_penilaian
  };

  try {
    
    const response = await axios.post("https://nodeapi-pied.vercel.app/gemini", data);

    const evaluation = response.data.evaluation || response.data; // tergantung struktur responsenya
    const score = evaluation.match(/Nilai Akhir:\s*(\d+)/)?.[1];

    return parseInt(score);
  } catch (error) {
    console.error("Error evaluating answer:", error);
    return 0; // nilai default jika gagal
  }
};