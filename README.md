🌐 Portfólio Web | Vitor Fazano

Meu site pessoal desenvolvido para apresentar meus projetos, habilidades e trajetória como desenvolvedor.

## 📷 Preview do Projeto

![Preview do Projeto](./preview0.png)

# Portfólio — Vitor Fazano
 
Site estático (HTML + CSS + JavaScript puro), sem dependências de build.
 
## Estrutura
 
```
index.html                  # todas as seções
style.css                   # estilos + variáveis de tema + responsividade
script.js                   # menu, tema, animações, filtro e formulário
img/                        # ilustrações e imagens (placeholders em SVG)
curriculo/curriculo-vitor-fazano.pdf   # currículo exibido/baixado
```
 
## O que já vem pronto
 
- Tema escuro/claro com preferência salva no navegador
- Menu fixo com destaque da seção atual, versão mobile em drawer e barra de progresso de rolagem
- Hero com efeito de digitação, animação flutuante e botões de ação
- Seções: Sobre (cards + contadores), Projetos (com filtro por categoria), Habilidades (barras de nível),
  Formação (linha do tempo), Currículo (PDF embutido) e Contato (formulário com validação)
- Animações de entrada ao rolar e respeito a `prefers-reduced-motion`
- Layout responsivo (desktop, tablet e celular)
 
## Como personalizar
 
| O que trocar | Onde |
| --- | --- |
| Foto/ilustrações | substitua os arquivos em `img/` mantendo os nomes (ou ajuste o `src` no HTML) |
| Currículo | substitua `curriculo/curriculo-vitor-fazano.pdf` |
| Projetos | edite os blocos `<article class="card-projeto">` em `index.html` (o `data-cat` controla o filtro) |
| Níveis das habilidades | atributo `data-level` de cada `<span>` dentro de `.bar` |
| Cores | variáveis `--laranja`, `--bg`, `--surface`… no topo de `style.css` |
| E-mail do formulário | constante `EMAIL` em `script.js` |
 
O formulário abre o app de e-mail do visitante (`mailto:`). Para receber as mensagens direto na caixa de
entrada sem isso, troque o envio por um serviço como Formspree: coloque `action="https://formspree.io/f/SEU_ID"`
e `method="POST"` no `<form>` e remova o `ev.preventDefault()`.
 
## Rodar localmente
 
```bash
python3 -m http.server 8000
# abra http://localhost:8000
```
 
## Publicar no GitHub Pages
 
1. Crie um repositório e envie estes arquivos.
2. Settings → Pages → Source: `main` / `root`.
3. O site fica em `https://SEU_USUARIO.github.io/NOME_DO_REPO/`.
