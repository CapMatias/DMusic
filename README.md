# Dmusic

Player de música imersivo inspirado na experiência clássica do iPod Cover Flow, com fundo neural WebGL e reprodução local de áudio.

Design original criado no Figma: [Dmusic Design](https://www.figma.com/design/i88lXATp2VpKUPBTtcErAK/Dmusic)

## Como Executar

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

## Funcionalidades

- **Cover Flow 3D** com navegação por drag/swipe e efeito de profundidade via CSS perspective
- **Player local** com HTML5 Audio — reproduz arquivos MP3 diretamente da pasta `public/music/`
- **Auto-play** — quando uma música termina, a próxima toca automaticamente
- **Fundo neural WebGL** — efeito visual animado com shaders customizados
- **Capas de álbuns** via API do iTunes Search
- **Busca por músicas** com barra de pesquisa integrada
- **Virtualização de lista** via `@tanstack/react-virtual` para performance com muitas músicas
- **Persistência de sessão** — Zustand com `localStorage` para lembrar a última música
- **Responsivo** — layout adaptado para desktop e mobile

## Tecnologias

- **Frontend:** React, TypeScript, Vite
- **Estilização:** Tailwind CSS
- **Estado:** Zustand
- **Virtualização:** TanStack Virtual
- **Feedback:** Sonner
- **Background:** WebGL/GLSL shaders
- **Áudio:** HTML5 Audio API
