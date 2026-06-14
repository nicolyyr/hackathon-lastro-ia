import { useState } from "react";

function UploadArea({ setReport, setLoading }) {
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleFiles = (files) => {
    const fileArray = Array.from(files).slice(0, 10);
    setImages(fileArray);
    const urls = fileArray.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleAnalyze = async () => {
    if (images.length === 0) return;
    setLoading(true);
    setReport(null);

    try {
      const base64Images = await Promise.all(
        images.map(
          (img) =>
            new Promise((resolve) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result.split(",")[1]);
              reader.readAsDataURL(img);
            })
        )
      );

      const response = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ images: base64Images }),
      });

      const data = await response.json();
      setReport(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-700 rounded-xl p-10 text-center cursor-pointer hover:border-blue-500 transition"
        onClick={() => document.getElementById("fileInput").click()}
      >
        <p className="text-gray-400 text-lg">
          Arraste as fotos aqui ou <span className="text-blue-400 underline">clique para selecionar</span>
        </p>
        <p className="text-gray-600 text-sm mt-1">Até 10 imagens por vez</p>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {/* Previews */}
      {previews.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {previews.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`foto ${i + 1}`}
              className="rounded-lg object-cover w-full h-32"
            />
          ))}
        </div>
      )}

      {/* Button */}
      {images.length > 0 && (
        <button
          onClick={handleAnalyze}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-xl"
        >
          Analisar {images.length} foto{images.length > 1 ? "s" : ""}
        </button>
      )}
    </div>
  );
}

export default UploadArea;