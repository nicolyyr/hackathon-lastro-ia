import { useState } from "react";
import UploadArea from "./components/UploadArea";
import ReportCard from "./components/ReportCard";

function App() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-2">
          <span className="text-2xl">🔍</span>
          <h1 className="text-xl font-bold tracking-tight">RealFrame</h1>
          <span className="ml-2 text-xs bg-blue-600 px-2 py-0.5 rounded-full">beta</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold mb-3">Detector de Maquiagem Imobiliária</h2>
          <p className="text-gray-400 text-lg">
            Envie as fotos do anúncio e a IA identifica manipulações visuais e omissões estratégicas.
          </p>
        </div>

        <UploadArea setReport={setReport} setLoading={setLoading} />

        {loading && (
          <div className="mt-10 flex flex-col items-center gap-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
            </div>
            <p className="text-gray-400 text-sm">Analisando imagens com IA...</p>
            <p className="text-gray-600 text-xs">Isso pode levar alguns segundos</p>
          </div>
        )}

        {report && !loading && <ReportCard report={report} />}
      </main>
    </div>
  );
}

export default App;