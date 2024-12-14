"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors")); // Importando o cors
const app = (0, express_1.default)();
const port = 3000;
// Middleware
app.use((0, cors_1.default)()); // Para fins de teste, deixei as requisições de qualquer origem
app.use(body_parser_1.default.json());
// Banco de dados em memória (temporário)
let contas = [];
// Taxas de transações
const TAXA_DEBITO = 0.03;
const TAXA_CREDITO = 0.05;
const TAXA_PIX = 0;
// Endpoint para criar uma nova conta
app.post('/conta', (req, res) => {
    const { numero_conta, saldo } = req.body;
    // Verifica se já existe uma conta com o mesmo número
    if (contas.find(c => c.numero_conta === numero_conta)) {
        return res.status(400).json({ message: 'Conta já existe' });
    }
    // Cria a nova conta
    const novaConta = { numero_conta, saldo };
    contas.push(novaConta);
    // Retorna a resposta com uma mensagem
    res.status(201).json({
        message: "Conta criada com sucesso!",
        conta: novaConta
    });
});
// Endpoint para realizar uma transação
app.post('/transacao', (req, res) => {
    const { forma_pagamento, numero_conta, valor } = req.body;
    // Busca a conta pelo número
    const conta = contas.find(c => c.numero_conta === numero_conta);
    // Verifica se a conta existe
    if (!conta) {
        return res.status(404).json({ message: 'Conta não encontrada' });
    }
    // Define a taxa de acordo com a forma de pagamento
    let taxa = 0;
    switch (forma_pagamento) {
        case 'D': // Débito
            taxa = TAXA_DEBITO;
            break;
        case 'C': // Cartão de Crédito
            taxa = TAXA_CREDITO;
            break;
        case 'P': // Pix
            taxa = TAXA_PIX;
            break;
        default:
            return res.status(400).json({ message: 'Forma de pagamento inválida' });
    }
    // Calcula o valor total da transação
    const valorTotal = valor + valor * taxa;
    // Verifica se há saldo suficiente
    if (conta.saldo < valorTotal) {
        return res.status(400).json({ message: 'Saldo insuficiente' });
    }
    // Deduz o valor do saldo da conta
    conta.saldo -= valorTotal;
    // Retorna o saldo atualizado
    res.status(201).json({
        message: "Transação realizada com sucesso!",
        numero_conta: conta.numero_conta,
        saldo_atualizado: conta.saldo
    });
});
// Endpoint para buscar uma conta pelo número
app.get('/conta', (req, res) => {
    const numero_conta = req.query.numero_conta ? parseInt(req.query.numero_conta) : NaN;
    // Verifica se o numero_conta é válido
    if (isNaN(numero_conta)) {
        return res.status(400).json({ message: 'Número da conta inválido' });
    }
    // Busca a conta pelo número
    const conta = contas.find(c => c.numero_conta === numero_conta);
    // Verifica se a conta existe
    if (!conta) {
        return res.status(404).json({ message: 'Conta não encontrada' });
    }
    // Retorna os dados da conta
    res.status(200).json({
        numero_conta: conta.numero_conta,
        saldo: conta.saldo
    });
});
// Inicialização do servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
