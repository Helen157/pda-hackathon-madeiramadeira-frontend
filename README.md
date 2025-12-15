# 🧩 Onboarding Inteligente — Frontend

Frontend do projeto **Onboarding Conversacional Inteligente**, desenvolvido durante o **Hackathon 2025 da Programadores do Amanhã**, em parceria com o desafio da **MadeiraMadeira**.

A aplicação faz parte de uma solução baseada em **WhatsApp + Micro-Frontends**, com foco em **reduzir fricção**, **aumentar conversão** e **garantir segurança** no cadastro de prestadores de serviço.

---

## 🚀 Tecnologias Utilizadas

- React (Vite)
- TypeScript
- HTML5 / CSS
- Web APIs 

---

## 🧠 Conceito da Solução

O frontend é composto por **micro-telas (micro-frontends)**, acionadas conforme o avanço da jornada do usuário no chatbot.

Cada tela resolve um único problema, como:

- Verificação facial (prova de vida)
- Confirmação de identidade
- Aceite de contrato
- Visualização de informações pós-aprovação

Essas telas são abertas via link, sem necessidade de download de aplicativo.

---

## ▶️ Como Rodar o Projeto Localmente

### 1️⃣ Acesse a pasta do frontend
```bash
cd frontend-hackathon
npm install
npm run dev
http://localhost:5173

## 🔗 Integração com Backend

Este frontend foi projetado para ser integrado com um backend em FastAPI, responsável por:

- Orquestrar o fluxo do chatbot

- Integrar com IA generativa

- Realizar validações de segurança

- Controlar a navegação entre os micro-frontends

A integração ocorre via APIs REST e links dinâmicos enviados pelo chatbot.

👥 Time

Squad 3 — Hackathon 2025

- Helen Gonçalves - Líder / Dev Front-end
- Lucy Lima - Dev Back-end
- Sabrina Marques - Dev Front-end
- Daniel Alves - Dev Back e Front-end
- Flaviano Kiffer - Designer

Instituto Programadores do Amanhã