# Sistema de Gestão Bancária

Este projeto foi desenvolvido como parte de um teste técnico para criação de um sistema de gestão bancária, utilizando uma api para gerenciar contas e transações financeiras.

## Tecnologias utilizadas

### Backend
- Linguagem: Typescript
- Framework: Node.js com express

### Frontend
- Linguagem: Typescript
- Framework: Vue.js 3
- Biblioteca de UI: Vuetify

## Funcionalidades

### conta/
- POST: Criação de contas bancárias.
- GET: Consulta de informações de contas.
- Foi criado um array contas que serve como um banco de dados temporário e local enquanto o servidor está em execução.

### transacao/
- POST: Registro de transações financeiras: (depóstiso, saques e transferências), incluíndo aplicações de taxas e validações de saldo.

## Execução do projeto

### Requisitos
- Node.js (versão 19.2.0 ou superior) e npm/yarn instalados

## Passos

### 1. Clone o repositório
```bash
git clone https://github.com/jonjgc/teste-objective.git
```

### 2. Abra o backend do projeto e instale as dependências
```bash
cd backend-sistema-bancario
```
```bash
code .
```
```bash
npm install
```

### 3. Inicie o servidor Node.js:
```bash
npx tsc && node dist/app.js
```

### 4. Enquanto o servidor do backend está sendo executado, abra uma outra janela do cmd e execute o frontend da aplicação
```bash
cd frontend-sistema-bancario
```
```bash
code .
```

### 5. Instale as dependências
```bash
npm install
```

### 6. Inicie a aplicação frontend:
```bash
npm run serve
```


