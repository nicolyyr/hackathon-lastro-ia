function ReportCard({ report }) {
  return (
    <div className="mt-10 space-y-6">
      {/* Score geral */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-bold mb-1">Relatório do Anúncio</h3>
        <div className="flex items-center gap-3 mt-3">
          <span className="text-4xl font-bold text-blue-400">
            {report.score}/100
          </span>
          <span
            className={`text-sm px-3 py-1 rounded-full font-medium ${
              report.score >= 75
                ? "bg-green-900 text-green-300"
                : report.score >= 50
                ? "bg-yellow-900 text-yellow-300"
                : "bg-red-900 text-red-300"
            }`}
          >
            {report.score >= 75
              ? "✅ Confiável"
              : report.score >= 50
              ? "⚠️ Atenção"
              : "🚨 Alto Risco"}
          </span>
        </div>
        <p className="text-gray-400 mt-3 text-sm">{report.summary}</p>
      </div>

      {/* Alertas gerais */}
      {report.general_alerts?.length > 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h4 className="font-semibold mb-3 text-yellow-400">⚠️ Alertas Gerais</h4>
          <ul className="space-y-2">
            {report.general_alerts.map((alert, i) => (
              <li key={i} className="text-gray-300 text-sm">
                • {alert}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Análise por foto */}
      {report.photos?.map((photo, i) => (
        <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h4 className="font-semibold mb-3">Foto {i + 1}</h4>
          {photo.alerts.length === 0 ? (
            <p className="text-green-400 text-sm">✅ Sem irregularidades detectadas</p>
          ) : (
            <ul className="space-y-2">
              {photo.alerts.map((alert, j) => (
                <li key={j} className="text-yellow-300 text-sm">
                  ⚠️ {alert}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}

      {/* Recomendação */}
      {report.recommendation && (
        <div className="bg-blue-950 border border-blue-800 rounded-xl p-6">
          <p className="text-blue-300 text-sm">💡 {report.recommendation}</p>
        </div>
      )}
    </div>
  );
}

export default ReportCard;