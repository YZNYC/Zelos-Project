# Zelos-Project
## 🛠️ Sistema de Chamados - Escola SENAI Armando de Arruda Pereira

Este é um projeto de sistema de chamados interno, desenvolvido para a **Escola SENAI Armando de Arruda Pereira**, com o objetivo de gerenciar solicitações de manutenção, apoio técnico e serviços diversos, com base no número de patrimônio dos itens escolares.

---

## 📚 Índice

- [📌 Sobre o Projeto](#-sobre-o-projeto)
- [🧰 Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [📌 Tarefas Pendentes](#-tarefas-pendentes)

---

## 📌 Sobre o Projeto

O sistema permite:
- Registro de chamados de manutenção e serviços técnicos.
- Identificação dos itens através do número de patrimônio da escola.
- Acompanhamento dos chamados por técnicos.
- Apontamentos de progresso e status.
- Histórico completo de serviços realizados.

---

## 🧰 Tecnologias Utilizadas

- **Frontend:** Next.js (React)
- **Backend:** Node.js (Express)
- **Banco de Dados:** MySQL
- **Autenticação:** (em desenvolvimento)
- **Middlewares personalizados:** (parcialmente implementados)

---

## 📌 Tarefas Pendentes
 
 - Criar e definir os tipos de usuários (Admin, Técnico, Solicitante)

 - 0 Finalizar todos os Controllers (CRUD completo para todas as entidades)

 - Corrigir e validar todos os Middlewares

 - Implementar autenticação completa

 - Concluir o desenvolvimento do Frontend em Next.js

 - Tela de login

 - Cadastro de chamados

 - Painel de técnico

 - Histórico de chamados

 - Implementar tratamento de erros e logs

 - Adicionar testes básicos no backend (opcional)

 - Documentar a API com Swagger ou alternativa simples

 - Configurar integração com Active Directory

<<<<<<< HEAD
 - Adicionar controle de status dos chamados (ex: aberto, em andamento, concluído)
=======
Agora, o sistema estará rodando em `http://localhost:3000`.

## Estrutura de Diretórios

A estrutura de diretórios do projeto segue a organização padrão do Next.js, com algumas adições para o backend:

```
/public              # Arquivos públicos estáticos
/app               # Páginas do frontend (Next.js)
  /usuario               # paginas do usuário comum 
  /admin               # paginas do administrador 
  /tecnico               # paginas do tecnico
/components          # Componentes reutilizáveis da UI
/utils               # Funções utilitárias
```

## Banco de Dados

O banco de dados utiliza o **MySQL** com a seguinte estrutura:

- **`usuarios`**: Tabela de usuários, contendo informações como nome, email, senha, função e status.
- **`pool`**: Pool de chamados (ex.: manutenção, apoio técnico, etc.).
- **`pool_tecnico`**: Relacionamento entre técnicos e tipos de serviços.
- **`chamados`**: Tabela de chamados, associando os chamados aos usuários e técnicos.
- **`apontamentos`**: Registra os apontamentos dos técnicos, incluindo horários de início e fim dos serviços.

## Desenvolvimento

Este projeto segue boas práticas de desenvolvimento utilizando o framework **Next.js** para o frontend e **Node.js/Express** para o backend. O banco de dados MySQL é acessado utilizando o **MySQL2**, proporcionando uma maneira eficiente e segura de interagir com o banco.

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
>>>>>>> 4a414a4 (Integracao AD)
