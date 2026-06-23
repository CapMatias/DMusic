# 🎵 Dmusic

Dmusic é um player de música imersivo inspirado na experiência clássica do iPod Cover Flow, combinando design moderno com alta performance.

O design original foi criado no Figma: [Dmusic Design](https://www.figma.com/design/i88lXATp2VpKUPBTtcErAK/Dmusic)

## 🚀 Como Executar

Siga os passos abaixo para rodar o projeto localmente:

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

3. **Acesse no navegador:**
   Abra o link fornecido pelo Vite (geralmente `http://localhost:5173`).

## ✨ Funcionalidades e Otimizações

O projeto foi aprimorado com as seguintes tecnologias e técnicas de engenharia de software:

- **⚡ Performance de Renderização:** Implementação de **Virtualização de Lista** via `@tanstack/react-virtual`, permitindo a navegação fluida mesmo com milhares de músicas sem sobrecarregar o DOM.
- **🧠 Gerenciamento de Estado Global:** Migração para **Zustand**, eliminando renderizações desnecessárias e organizando a lógica de reprodução e busca.
- **🔍 Busca Inteligente (Fuzzy Search):** Integração com `Fuse.js` para permitir buscas tolerantes a erros de digitação em artistas, álbuns e músicas.
- **💾 Persistência de Sessão:** Uso de `localStorage` para lembrar a última música selecionada e o estado do player após recarregar a página.
- **🎨 UX Premium:** 
  - Efeitos de **Skeleton Screen** durante o carregamento de capas.
  - Notificações em tempo real via **Sonner**.
  - Interface totalmente traduzida para **Português**.
- **🌐 Integração de API:** Consumo dinâmico de capas de álbuns através da API do iTunes da Apple.

## 🛠️ Tecnologias Utilizadas

- **Frontend:** React, TypeScript, Vite
- **Estilização:** Tailwind CSS
- **Estado:** Zustand
- **Virtualização:** TanStack Virtual
- **Busca:** Fuse.js
- **Feedback:** Sonner
