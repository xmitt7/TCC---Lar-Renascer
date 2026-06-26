const prisma = require('../config/prismaClient');

const cadastrarGestante = async (req, res) => {
  try {
    const { nome, idade, contato, situacao_relatada, observacoes } = req.body;

    if (!nome || !idade || !contato) {
      return res.status(400).json({ erro: 'Preencha todos os campos obrigatórios.' });
    }

    const novaGestante = await prisma.gestante.create({
      data: { 
        nome, 
        idade: parseInt(idade, 10), 
        contato, 
        situacao_relatada: situacao_relatada || null, 
        observacoes 
      }
    });

    res.status(201).json(novaGestante);
  } catch (error) {
    console.error('Erro ao cadastrar gestante:', error);
    res.status(500).json({ erro: 'Erro interno ao salvar os dados.' });
  }
};

const listarGestantes = async (req, res) => {
  try {
    const gestantes = await prisma.gestante.findMany({
      orderBy: { criado_em: 'desc' }
    });
    res.json(gestantes);
  } catch (error) {
    console.error('Erro ao listar gestantes:', error);
    res.status(500).json({ erro: 'Erro interno ao buscar os dados.' });
  }
};

module.exports = { cadastrarGestante, listarGestantes };