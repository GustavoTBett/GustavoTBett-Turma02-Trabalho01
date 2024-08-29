const Banco = require('../src/banco');

let conta;
beforeEach(() => {
    conta = new Banco('Fulano', 100);
});

test("Depositar válido", () => {
    expect(conta.depositar(10)).toStrictEqual(110);
});

test("Sacar válido", () => {
    expect(conta.sacar(10)).toStrictEqual(90);
});

test("Sacar inválido", () => {
    expect(() => conta.sacar(110)).toThrow('Saldo insuficiente');
    expect(conta.obterSaldo()).toStrictEqual(100);
});

test("Transferir válido", () => {
    const conta2 = new Banco('Beltrano', 100);
    conta.transferir(10, conta2);
    expect(conta.obterSaldo()).toStrictEqual(90);
    expect(conta2.obterSaldo()).toStrictEqual(110);
});

test("Transferir inválido", () => {
    const conta2 = new Banco('Beltrano', 100);
    expect(() => conta.transferir(110, conta2)).toThrow('Saldo insuficiente');
    expect(conta.obterSaldo()).toStrictEqual(100);
    expect(conta2.obterSaldo()).toStrictEqual(100);
});

test("Obter saldo", () => {
    expect(conta.obterSaldo()).toStrictEqual(100);
    conta.depositar(50);
    expect(conta.obterSaldo()).toStrictEqual(150);
});

test("Obter histórico de transações", () => {
    conta.depositar(50);
    conta.sacar(20);
    const historico = conta.obterHistorico();
    expect(historico).toHaveLength(2);
    expect(historico[0]).toEqual({ tipo: 'Depósito', valor: 50 });
    expect(historico[1]).toEqual({ tipo: 'Saque', valor: 20 });
});

test("Definir limite de saque", () => {
    conta.definirLimiteDeSaque(50);
    expect(() => conta.verificarLimiteDeSaque(60)).toThrow('Saque acima do limite permitido');
    expect(conta.verificarLimiteDeSaque(40)).toStrictEqual(true);
});

test("Aplicar juros", () => {
    conta.aplicarJuros(10);  // 10% de 100 = 10
    expect(conta.obterSaldo()).toStrictEqual(110);
    const historico = conta.obterHistorico();
    expect(historico).toHaveLength(1);
    expect(historico[0]).toEqual({ tipo: 'Juros', valor: 10 });
});

test("Pagar conta", () => {
    conta.pagarConta(50, 'Conta de Luz');
    expect(conta.obterSaldo()).toStrictEqual(50);
    const historico = conta.obterHistorico();
    expect(historico).toHaveLength(2);
    expect(historico[1]).toEqual({ tipo: 'Pagamento', valor: 50, descricao: 'Conta de Luz' });
});

test("Pagar conta com saldo insuficiente", () => {
    expect(() => conta.pagarConta(150, 'Conta de Água')).toThrow('Saldo insuficiente');
    expect(conta.obterSaldo()).toStrictEqual(100);
});

test("Obter total depositado", () => {
    conta.depositar(50);
    conta.depositar(30);
    expect(conta.obterTotalDepositado()).toStrictEqual(80);
});

test("Verificar limite de saque", () => {
    conta.definirLimiteDeSaque(100);
    expect(conta.verificarLimiteDeSaque(50)).toStrictEqual(true);
    expect(() => conta.verificarLimiteDeSaque(150)).toThrow('Saque acima do limite permitido');
});
