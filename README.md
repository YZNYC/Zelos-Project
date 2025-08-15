# Zelos - Sistema de Chamados

## 📝 Descrição do Projeto

O Zelos é um sistema de gerenciamento de chamados em desenvolvimento, voltado para controle de atendimento e acompanhamento de solicitações de forma intuitiva e visualmente agradável, para suprir as necessidades apontadas pelo SENAI Armando Arruda de Pereira em um controle dos chamados de manutenção e derivados.

O projeto está sendo construído com Next.js no frontend e Express.js + MySQL no backend, com foco em modularidade, responsividade e integração fluida entre front e back.


## ⚙️ Tecnologias Utilizadas

Frontend:
Next.js 13 (App Router)

Tailwind CSS (estilização responsiva)

Recharts (gráficos)

React (componentização)

Design adaptado para desktop, tablet e mobile

Efeitos visuais: transições suaves, menus laterais, cards interativos 3D

Backend:
Node.js + Express.js

MySQL (via mysql2)

Autenticação simples e log de acessos

Estrutura de CRUD para gerenciamento de clientes, produtos, pedidos e itens de pedido

Integração com frontend via API REST

## 🏗 Status do Projeto

✅ Já Implementado:
Frontend:

Estrutura de páginas com Next.js

Layout responsivo com Tailwind

Cards de dashboard e gráficos (pie chart e line chart) funcionando visualmente

Menu lateral e cabeçalho fixo

Backend:

Configuração do Express + MySQL

Conexão com banco de dados estabelecida

Tabelas básicas criadas (clientes, produtos, pedidos, itens_pedido)

Integração básica frontend ↔ backend via Axios

Autenticação simples de usuário

CLI de teste para interagir com o backend (via Inquirer + Axios + Chalk)

## ⚙ Em andamento:

Backend:

Rotas completas para CRUD ainda incompletas

Tratamento de relações entre tabelas e foreign keys

Integração completa com frontend ainda pendente

Logs de acesso e segurança básica

Frontend:

Ajustes finais em gráficos (line chart precisa gerar valores altos sempre, pie chart dimensionamento)

Correção de bugs de atualização e remoção de dados no cliente CLI

Transições e efeitos visuais mais refinados

Responsividade:

Ajustes finos no header, textos e partículas no mobile/tablet

## ⏳ Pendências:

Finalizar backend:

CRUD completo com validação e tratamento de erros

Rotas de autenticação mais robustas

Integração com frontend

Frontend:

Finalizar todos os gráficos do dashboard

Cards 3D totalmente interativos

Menus laterais com navegação completa

Efeitos visuais adicionais (transições, hover, etc.)

Documentação do código e README final

Testes (unitários e integração)

Possível evolução futura:

Integração com Electron para versão desktop

Dashboard de gerenciamento completo de guerreiros/recursos fictícios

Sistema de notificações em tempo real

