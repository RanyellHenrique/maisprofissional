export const usuarios = [
    {"nome": "Cliente" },
    {"nome": "Trabalhador"},
]

export const getUsuario = (nome: string)  => {
    return usuarios.filter(usuario => nome == usuario.nome).shift();
}