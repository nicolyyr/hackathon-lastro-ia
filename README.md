# 🔍 RealFrame — Detector de Maquiagem Imobiliária

> Hackathon · IA no Mercado Imobiliário

---

## 📌 O Problema

Anúncios de imóveis frequentemente usam recursos visuais enganosos: lentes grande-angulares que distorcem o espaço, iluminação artificial exagerada, edições digitais pesadas e home staging que escondem defeitos reais. O resultado? Compradores que chegam a visitas frustrados ou, pior, tomam decisões de compra baseadas em fotos que não representam a realidade.

---

## 💡 A Solução

O **RealFrame** é um assistente inteligente que analisa as fotos de um anúncio imobiliário e gera um **relatório de transparência**, identificando possíveis manipulações visuais e omissões estratégicas.

O usuário sobe as fotos do anúncio e recebe, em segundos, alertas como:

- 📐 *"Possível uso de lente grande-angular — o ambiente pode parecer maior do que é."*
- 💡 *"Iluminação artificial intensa detectada — a luminosidade natural pode ser diferente."*
- 🖼️ *"Imagem possivelmente renderizada ou editada digitalmente."*
- 🚫 *"Cômodos críticos ausentes: banheiro, cozinha e área de serviço não foram fotografados."*

---

## 🎯 Público-Alvo

Compradores e inquilinos que buscam mais transparência e segurança na hora de avaliar imóveis online.

---

## ⚙️ Como Funciona

1. Usuário faz upload de 1 a 10 fotos do anúncio
2. As imagens são enviadas para análise via LLM multimodal
3. A IA identifica padrões visuais suspeitos em cada foto
4. Um relatório consolidado é gerado com score de confiabilidade
5. O usuário recebe alertas detalhados por imagem + resumo geral

---

## 📊 Exemplo de Output

    📋 RELATÓRIO DO ANÚNCIO — Apartamento Rua das Flores, 123

    Score de Transparência: 58/100 ⚠️ Atenção recomendada

    Foto 1 — Sala de Estar
      ⚠️ Lente grande-angular detectada
      ⚠️ Iluminação artificial intensa

    Foto 2 — Quarto
      ✅ Sem irregularidades detectadas

    Foto 3 — Fachada
      ✅ Sem irregularidades detectadas

    ⚠️ Cômodos ausentes nas fotos: banheiro, cozinha, área de serviço
    ⚠️ Apenas 3 fotos para um imóvel de 3 cômodos — cobertura insuficiente

    Recomendação: Solicite fotos adicionais antes de agendar visita.

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React + Tailwind CSS |
| Backend | Python (FastAPI) |
| IA — Visão | Claude Sonnet (multimodal) |
| Deploy | Vercel (frontend) + Render (backend) |

---

## 🚀 Como Rodar Localmente

    # Clone o repositório
    git clone https://github.com/nicolyyr/hackathon-lastro-ia
    cd hackathon-lastro-ia

    # Backend
    cd backend
    pip install -r requirements.txt
    uvicorn main:app --reload

    # Frontend
    cd ../frontend
    npm install
    npm run dev

⚠️ Necessário configurar a variável ANTHROPIC_API_KEY no arquivo .env

---

## 📁 Estrutura do Projeto

    realframe/
    ├── backend/
    │   ├── main.py
    │   ├── analyzer.py
    │   └── requirements.txt
    ├── frontend/
    │   ├── src/
    │   │   ├── App.jsx
    │   │   ├── components/
    │   │   │   ├── UploadArea.jsx
    │   │   │   └── ReportCard.jsx
    │   └── package.json
    └── README.md

---

## 👩‍💻 Desenvolvido por

Projeto desenvolvido para o Hackathon de IA no Mercado Imobiliário — 2026.