const Biblioteca = require('../src/Trabalho01Turma02');

let biblioteca;
beforeEach(() => {
    biblioteca = new Biblioteca();
});

test("Adicionar livro", () => {
    biblioteca.adicionarLivro({ id: 1, titulo: 'Código limpo', autor: 'Robert C. Martin' });
    biblioteca.adicionarLivro({ id: 2, titulo: 'Design pattern', autor: 'Erich Gamma' });
    expect(biblioteca.listarLivros()).toHaveLength(2);
})

test("Remover livro", () => {
    biblioteca.adicionarLivro({ id: 1, titulo: 'Código limpo', autor: 'Robert C. Martin' });
    biblioteca.adicionarLivro({ id: 2, titulo: 'Design pattern', autor: 'Erich Gamma' });
    biblioteca.removerLivro(1);
    expect(biblioteca.listarLivros()).toHaveLength(1);
})

test("Buscar livro por ID", () => {
    biblioteca.adicionarLivro({ id: 1, titulo: 'Código limpo', autor: 'Robert C. Martin' });
    biblioteca.adicionarLivro({ id: 2, titulo: 'Design pattern', autor: 'Erich Gamma' });
    expect(biblioteca.buscarLivroPorId(2).id).toEqual(2);
})

test("Buscar livro por título", () => {
    biblioteca.adicionarLivro({ id: 1, titulo: 'Código limpo', autor: 'Robert C. Martin' });
    biblioteca.adicionarLivro({ id: 2, titulo: 'Design pattern', autor: 'Erich Gamma' });
    biblioteca.adicionarLivro({ id: 3, titulo: 'Design code' });
    expect(biblioteca.buscarLivroPorTitulo('Design')).toHaveLength(2);
    expect(biblioteca.buscarLivroPorTitulo('limpo')).toHaveLength(1);
})

test("Listar livros", () => {
    biblioteca.adicionarLivro({ id: 1, titulo: 'Código limpo', autor: 'Robert C. Martin' });
    biblioteca.adicionarLivro({ id: 2, titulo: 'Design pattern', autor: 'Erich Gamma' });
    expect(biblioteca.listarLivros()).toHaveLength(2);
})

test("Adicionar membro", () => {
    biblioteca.adicionarMembro({ id: 1, nome: 'Dyorgio' });
    biblioteca.adicionarMembro({ id: 2, nome: 'Gustavo' });
    expect(biblioteca.listarMembros()).toHaveLength(2);
})

test("Remover membro", () => {
    biblioteca.adicionarMembro({ id: 1, nome: 'Gustavo' });
    biblioteca.adicionarMembro({ id: 2, nome: 'Dyorgio' });
    biblioteca.removerMembro(1);
    expect(biblioteca.listarMembros()).toHaveLength(1);
})

test("Buscar membro por ID", () => {
    biblioteca.adicionarMembro({ id: 1, nome: 'Gustavo' });
    biblioteca.adicionarMembro({ id: 2, nome: 'Dyorgio' });
    expect(biblioteca.buscarMembroPorId(2).id).toEqual(2);
})

test("Listar membros", () => {
    biblioteca.adicionarMembro({ id: 1, nome: 'Gustavo' });
    biblioteca.adicionarMembro({ id: 2, nome: 'Dyorgio' });
    expect(biblioteca.listarMembros()).toHaveLength(2);
})

test("Emprestar livro", () => {
    biblioteca.adicionarLivro({ id: 1, titulo: 'Código limpo', autor: 'Robert C. Martin' });
    biblioteca.adicionarMembro({ id: 1, nome: 'Gustavo' });
    expect(biblioteca.emprestarLivro(1, 1)).toStrictEqual(true);
    expect(biblioteca.buscarLivroPorId(1).emprestado).toStrictEqual(true);
})

test("Emprestar livro inválido", () => {
    biblioteca.adicionarLivro({ id: 1, titulo: 'Código limpo', autor: 'Robert C. Martin' });
    biblioteca.adicionarMembro({ id: 1, nome: 'Gustavo' });
    expect(biblioteca.emprestarLivro(1, 2)).toStrictEqual(false);
    expect(biblioteca.listarLivrosEmprestados()).toHaveLength(0);
})

test("Emprestar livro não cadastrado", () => {
    biblioteca.adicionarMembro({ id: 1, nome: 'Gustavo' });
    expect(biblioteca.emprestarLivro(1, 1)).toStrictEqual(false);
    expect(biblioteca.buscarLivroPorId(1)).toBeUndefined();
})

test("Emprestar livro já emprestado", () => {
    biblioteca.adicionarLivro({ id: 1, titulo: 'Código limpo', autor: 'Robert C. Martin' });
    biblioteca.adicionarMembro({ id: 1, nome: 'Gustavo' });
    biblioteca.adicionarMembro({ id: 2, nome: 'Dyorgio' });
    biblioteca.emprestarLivro(1, 1);
    expect(biblioteca.emprestarLivro(1, 2)).toStrictEqual(false);
    expect(biblioteca.buscarLivroPorId(1).emprestado).toStrictEqual(true);
})

test("Devolver livro", () => {
    biblioteca.adicionarLivro({ id: 1, titulo: 'Código limpo', autor: 'Robert C. Martin' });
    biblioteca.adicionarMembro({ id: 1, nome: 'Gustavo' });
    biblioteca.emprestarLivro(1, 1);
    expect(biblioteca.devolverLivro(1)).toStrictEqual(true);
    expect(biblioteca.buscarLivroPorId(1).emprestado).toStrictEqual(false);
})

test("Devolver livro inválido", () => {
    biblioteca.adicionarLivro({ id: 1, titulo: 'Código limpo', autor: 'Robert C. Martin' });
    expect(biblioteca.devolverLivro(1)).toStrictEqual(false);
    expect(biblioteca.listarLivrosEmprestados()).toHaveLength(0);
})

test("Devolver livro não emprestado", () => {
    biblioteca.adicionarLivro({ id: 1, titulo: 'Código limpo', autor: 'Robert C. Martin' });
    biblioteca.adicionarMembro({ id: 1, nome: 'Gustavo' });
    expect(biblioteca.devolverLivro(1)).toStrictEqual(false);
    expect(biblioteca.listarLivrosEmprestados()).toHaveLength(0);
})

test("Devolver livro não cadastrado", () => {
    biblioteca.adicionarMembro({ id: 1, nome: 'Gustavo' });
    expect(biblioteca.devolverLivro(1)).toStrictEqual(false);
    expect(biblioteca.buscarLivroPorId(1)).toBeUndefined();
})

test("Devolver livro já devolvido", () => {
    biblioteca.adicionarLivro({ id: 1, titulo: 'Código limpo', autor: 'Robert C. Martin' });
    biblioteca.adicionarMembro({ id: 1, nome: 'Gustavo' });
    biblioteca.emprestarLivro(1, 1);
    biblioteca.devolverLivro(1);
    expect(biblioteca.devolverLivro(1)).toStrictEqual(false);
    expect(biblioteca.listarLivrosEmprestados()).toHaveLength(0);
})

test("Listar livro já emprestado", () => {
    biblioteca.adicionarLivro({ id: 1, titulo: 'Código limpo', autor: 'Robert C. Martin' });
    biblioteca.adicionarMembro({ id: 1, nome: 'Gustavo' });
    biblioteca.emprestarLivro(1, 1);
    expect(biblioteca.listarLivrosEmprestados()).toHaveLength(1);
})

test("Listar livro dispónivel", () => {
    biblioteca.adicionarLivro({ id: 1, titulo: 'Código limpo', autor: 'Robert C. Martin' });
    expect(biblioteca.listarLivrosDisponiveis()).toHaveLength(1);
})

test("Contar livros" , () => {
    biblioteca.adicionarLivro({ id: 1, titulo: 'Código limpo', autor: 'Robert C. Martin' });
    biblioteca.adicionarLivro({ id: 2, titulo: 'Design pattern', autor: 'Erich Gamma' });
    expect(biblioteca.contarLivros()).toStrictEqual(2);
})

test("Contar membros" , () => {
    biblioteca.adicionarMembro({ id: 1, nome: 'Gustavo' });
    biblioteca.adicionarMembro({ id: 2, nome: 'Dyorgio' });
    expect(biblioteca.contarMembros()).toStrictEqual(2);
})

test("Listar livros por autor", () => {
    biblioteca.adicionarLivro({ id: 1, titulo: 'Código limpo', autor: 'Robert C. Martin' });
    biblioteca.adicionarLivro({ id: 2, titulo: 'Design pattern', autor: 'Erich Gamma' });
    biblioteca.adicionarLivro({ id: 3, titulo: 'Design code', autor: 'Erich Gamma' });
    expect(biblioteca.listarLivrosPorAutor('Erich Gamma')).toHaveLength(2);
    expect(biblioteca.listarLivrosPorAutor('Robert C. Martin')).toHaveLength(1);
})

test("Listar livros por genero", () => {
    biblioteca.adicionarLivro({ id: 1, titulo: 'Código limpo', autor: 'Robert C. Martin', genero: 'Tecnologia' });
    biblioteca.adicionarLivro({ id: 2, titulo: 'Design pattern', autor: 'Erich Gamma', genero: 'Tecnologia' });
    biblioteca.adicionarLivro({ id: 3, titulo: 'Design code', autor: 'Erich Gamma', genero: 'Tecnologia' });
    expect(biblioteca.listarLivrosPorGenero('Tecnologia')).toHaveLength(3);
    expect(biblioteca.listarLivrosPorGenero('Romance')).toHaveLength(0);
})

test("Atualiza informação livro", () => {
    biblioteca.adicionarLivro({ id: 1, titulo: 'Código limpo', autor: 'Robert C. Martin' });
    biblioteca.atualizarInformacaoLivro(1, {genero: 'Tecnologia'});
    expect(biblioteca.buscarLivroPorId(1)).toEqual({ id: 1, titulo: 'Código limpo', autor: 'Robert C. Martin', genero: 'Tecnologia' });
})

test("Atualiza informação livro não existente", () => {
    biblioteca.atualizarInformacaoLivro(1, {genero: 'Tecnologia'});
    expect(biblioteca.buscarLivroPorId(1)).toBeUndefined();
})

test("Listar livro por ano", () => {
    biblioteca.adicionarLivro({ id: 1, titulo: 'Código limpo', autor: 'Robert C. Martin', ano: 2008 });
    biblioteca.adicionarLivro({ id: 2, titulo: 'Design pattern', autor: 'Erich Gamma', ano: 1994 });
    biblioteca.adicionarLivro({ id: 3, titulo: 'Design code', autor: 'Erich Gamma', ano: 2000 });
    expect(biblioteca.listarLivrosPorAno(2000)).toHaveLength(1);
    expect(biblioteca.listarLivrosPorAno(1994)).toHaveLength(1);
})