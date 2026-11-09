# FilaZero — versão instalável (PWA)

## O que foi adaptado
- Manifesto PWA com nome, cores, ícone e modo de abertura independente do navegador.
- Service worker para cache de recursos estáticos e tela simples de indisponibilidade.
- Botão "Instalar app" quando o navegador disponibiliza a instalação.
- Metadados para instalação/atalho no iOS.
- Melhorias de responsividade, áreas de toque, safe areas e formulários móveis.
- Backend Express, banco SQLite, autenticação e fluxos de pedido preservados.

## Como executar
1. Instale Node.js (versão compatível com as dependências do projeto).
2. No diretório do projeto, execute `npm install`.
3. Execute `npm start`.
4. Acesse `http://localhost:3000`.

## Como instalar no celular
O PWA precisa estar publicado em HTTPS (ou aberto em localhost para testes).
- Android/Chrome: abra o endereço do FilaZero e use "Instalar app" ou "Adicionar à tela inicial".
- iPhone/iPad: abra no Safari, toque em Compartilhar e escolha "Adicionar à Tela de Início".

## Observações importantes
- O modo offline não permite autenticar, consultar pedidos nem enviar pedidos sem conexão. Dados pessoais e respostas da API não são armazenados no cache.
- Para uso real, configure `express-session` com armazenamento persistente, cookies `secure` em HTTPS, segredo por variável de ambiente e política de backup do SQLite.
- O aplicativo continua dependendo do servidor Node/Express publicado e acessível pela internet.
- O ícone vetorial está em `public/icons/icon.svg`.
