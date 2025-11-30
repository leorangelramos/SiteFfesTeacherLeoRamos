# Teacher Leo Ramos - Plataforma de Ensino de Inglês

Este repositório contém o código-fonte do site oficial do **Professor Leo Ramos** (FFES). O projeto é uma plataforma web interativa focada no ensino de língua inglesa, oferecendo exercícios gramaticais, práticas de conversação com IA, artigos e informações sobre cursos.

🔗 **Website Oficial:** [teacherleoramos.com.br](https://teacherleoramos.com.br/)

## 📋 Sobre o Projeto

O site foi desenvolvido para ser uma ferramenta centralizadora de conteúdo educacional. Ele vai além de um site institucional, funcionando como um **LMS (Learning Management System) leve**, rodando diretamente no navegador do aluno sem necessidade de login complexo ou banco de dados pesado para as funções básicas.

### Funcionalidades Principais

- **Navegação por Abas e Acordeões:** Interface organizada que permite alternar entre _Exercícios, Listening, Vocabulário, Speaking, Writing e Reading_ sem recarregar a página.
- **Gamificação (Sistema de XP):** Os alunos ganham pontos de experiência (XP) ao completar exercícios corretamente. O progresso é salvo localmente no navegador (`localStorage`).
- **Reconhecimento de Voz (Speaking):** Utiliza a **Web Speech API** para ouvir a pronúncia do aluno e comparar com a frase alvo, fornecendo feedback imediato (Sucesso/Erro).
- **Busca Inteligente:** Barra de pesquisa com auto-complete que indexa todos os links de exercícios e opções do site, facilitando a navegação.
- **Exercícios Interativos:**
  - _Writing:_ Validação de respostas escritas com feedback de erro específico.
  - _Reading/Ordenação:_ Funcionalidade de "arrastar e soltar" (botões de subir/descer) para reorganizar parágrafos de textos.
- **Design Responsivo:** Layout adaptável para mobile e desktop, com menu fixo e identidade visual consistente.

## 🛠️ Tecnologias Utilizadas

O projeto foi construído com tecnologias web padrão (Vanilla), garantindo alta performance e compatibilidade.

- **HTML5:** Estrutura semântica e acessibilidade (ARIA attributes).
- **CSS3:** Variáveis CSS (`:root`), Flexbox, CSS Grid e design responsivo via Media Queries.
- **JavaScript (ES6+):** Lógica de interação, manipulação do DOM e APIs do navegador.
- **SEO & Metadados:** Configuração completa de Open Graph (OG Tags), Twitter Cards e JSON-LD para Rich Snippets (Schema.org).
- **Apache (.htaccess):** Configuração de cache de navegador para otimização de performance (Expires Headers).

## 📂 Estrutura de Arquivos

```text
/
├── index.html                  # Página principal e estrutura do conteúdo
├── cursos-e-ebook.html         # Página dedicada a Cursos e E-book (NOVA)
├── exercicios-e-artigos.html   # Página dedicada a Exercícios e Artigos (NOVA)
├── sitemap.xml                 # Mapa do site para indexação do Google
├── .htaccess                   # Configurações de servidor e cache
├── CSS/
│   └── style.css               # Estilos globais e responsividade
├── JS/
│   └── script.js               # Toda a lógica interativa (Search, Tabs, Speaking API)
├── Images/                     # Logotipos, ícones e imagens de perfil
├── Videos/                     # Vídeos de background (Hero section)
├── Ex1/                        # Exercícios de Verbos
├── Ex2-3-4-5-6/                # Exercícios de Gramática (Pronomes, Artigos, etc.)
├── ExListen/                   # Exercícios de Listening e Speaking
└── Artigos/                    # Artigos educacionais e vocabulário técnico

🚀 Como Rodar Localmente
Clone este repositório.

Certifique-se de que a estrutura de pastas (CSS, JS, Images, etc.) esteja mantida.

Abra o arquivo index.html em qualquer navegador moderno (Chrome, Edge, Firefox).

Nota: Para a funcionalidade de Speaking (Reconhecimento de Voz), recomenda-se o uso do Google Chrome, pois a API webkitSpeechRecognition tem melhor suporte neste navegador.

📢 Contato e Redes Sociais
Youtube: @teacherleoramos

Instagram: @teacherleoramos

WhatsApp: +55 (11) 95558-2118

Desenvolvido por Leo Ramos - Todos os direitos reservados.

```
