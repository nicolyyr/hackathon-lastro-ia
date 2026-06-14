from dotenv import load_dotenv
load_dotenv()
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import anthropic
import os
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

class AnalyzeRequest(BaseModel):
    images: list[str]

@app.post("/analyze")
async def analyze(request: AnalyzeRequest):
    content = []

    for i, img_b64 in enumerate(request.images):
        content.append({
            "type": "text",
            "text": f"Foto {i+1}:"
        })
        content.append({
            "type": "image",
            "source": {
                "type": "base64",
                "media_type": "image/jpeg",
                "data": img_b64
            }
        })

    content.append({
        "type": "text",
        "text": """Você é um especialista em análise de anúncios imobiliários.
Analise as fotos acima e retorne um JSON com a seguinte estrutura:
{
  "score": <número de 0 a 100 representando transparência>,
  "summary": "<resumo geral em 1-2 frases>",
  "general_alerts": ["<alerta geral 1>", "<alerta geral 2>"],
  "photos": [
    {"alerts": ["<alerta foto 1>", "<alerta foto 2>"]},
    ...
  ],
  "recommendation": "<recomendação final para o comprador>"
}

Para cada foto, identifique:
- Uso de lente grande-angular
- Iluminação artificial excessiva
- Possível edição ou renderização digital
- Ângulos enganosos
- Cômodos omitidos no conjunto de fotos

Responda APENAS com o JSON, sem texto adicional."""
    })

    message = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1000,
        messages=[{"role": "user", "content": content}]
    )

    raw = message.content[0].text
    clean = raw.replace("```json", "").replace("```", "").strip()
    result = json.loads(clean)
    return result