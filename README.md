### **README - Frontend (Vue.js)**

# Sistema de Agendamento de Transferências Financeiras - Frontend

Este repositório contém a implementação do **frontend** para o sistema de agendamento de transferências financeiras, utilizando **Vue.js**. A interface de usuário permite que os usuários agendem transferências financeiras e visualizem o extrato das transferências realizadas, interagindo com o backend fornecido pelo repositório **transferencias-agendamento-back**.

## Funcionalidades

- **Listagem de Transferências**: Exibe todos os agendamentos de transferências realizadas.
- **Novo Agendamento**: Permite ao usuário agendar uma nova transferência financeira.

---

## Como Executar o Frontend

### Pré-requisitos

- **Node.js**: Necessário para rodar o servidor de desenvolvimento e gerenciar dependências.
- **npm** ou **yarn**: Para gerenciamento de pacotes.

### Passos para Executar o Frontend

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/RodrigoBritoGit/transferencias-agendamento-front.git
   cd transferencias-agendamento-front
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Instale o axios**:
   ```bash
   npm install axios
   ```
   
4. **Execute o servidor de desenvolvimento**:
   Para rodar o frontend localmente, execute:
   ```bash
   npm run serve
   ```
   O frontend será iniciado na porta **3000** .

---

## Comunicação com o Backend

O frontend se comunica com o backend através dos seguintes endpoints:

- **GET http://localhost:8080/api/transferencias**: Para listar todos os agendamentos de transferências.
- **POST http://localhost:8080/api/transferencias**: Para agendar uma nova transferência.

---

## Decisões Arquiteturais

- **Vue.js** foi utilizado para desenvolver o frontend devido à sua facilidade de uso, flexibilidade e performance.
- O design da interface foi desenvolvido com foco na simplicidade e usabilidade, permitindo ao usuário agendar transferências e visualizar o extrato de forma eficiente.

---

## Considerações Finais

Este frontend foi desenvolvido para fornecer uma interface simples e funcional para interagir com o sistema de agendamento de transferências financeiras. Ele foi projetado para ser eficiente, com foco na experiência do usuário e na integração com o backend.

---
