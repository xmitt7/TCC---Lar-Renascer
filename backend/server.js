const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// ROTA PÚBLICA: Cadastrar uma nova gestante
app.post('/gestantes', async (req, res) => {
  try {
    const { nome, idade, contato, situacao_relatada, observacoes } = req.body;

    // Validação básica
    if (!nome || !idade || !contato || !situacao_relatada) {
      return res.status(400).json({ erro: 'Preencha todos os campos obrigatórios.' });
    }

    // Cria a gestante no banco via Prisma
    const novaGestante = await prisma.gestante.create({
      data: {
        nome,
        idade,
        contato,
        situacao_relatada,
        observacoes
      }
    });

    res.status(201).json(novaGestante);
  } catch (error) {
    console.error('Erro ao cadastrar gestante:', error);
    res.status(500).json({ erro: 'Erro interno ao salvar os dados.' });
  }
});

app.get('/', (req, res) => {
  res.send('Servidor do Lar Renascer rodando perfeitamente!');
});

app.listen(3000, () => {
  console.log('🚀 Servidor rodando na porta 3000');
});

// ==========================================
// MIDDLEWARE DE AUTENTICAÇÃO BÁSICA
// ==========================================
const basicAuth = (req, res, next) => {
  const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
  const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');

  if (login === process.env.INTERNAL_AUTH_USER && password === process.env.INTERNAL_AUTH_PASS) {
    return next(); // Credenciais corretas, prossegue para a rota
  }

  // Falha na autenticação: bloqueia o acesso
  res.set('WWW-Authenticate', 'Basic realm="401"');
  res.status(401).json({ erro: 'Acesso não autorizado.' });
};

// ==========================================
// ROTAS INTERNAS PROTEGIDAS (Uso do basicAuth)
// ==========================================

// Listar todas as gestantes (Área das freiras)
app.get('/interno/gestantes', basicAuth, async (req, res) => {
  try {
    const gestantes = await prisma.gestante.findMany({
      orderBy: { criado_em: 'desc' } // Mais recentes primeiro
    });
    res.json(gestantes);
  } catch (error) {
    console.error('Erro ao listar gestantes:', error);
    res.status(500).json({ erro: 'Erro interno ao buscar os dados.' });
  }
});

// Listar todas as doações (Área das freiras)
app.get('/interno/doacoes', basicAuth, async (req, res) => {
  try {
    const doacoes = await prisma.doacao.findMany({
      orderBy: { criado_em: 'desc' }
    });
    res.json(doacoes);
  } catch (error) {
    console.error('Erro ao listar doações:', error);
    res.status(500).json({ erro: 'Erro interno ao buscar os dados.' });
  }
});

// ROTA PÚBLICA: Registrar os dados de um doador (Formulário após o QR Code Pix)
app.post('/doacoes', async (req, res) => {
  try {
    const { nome_doador, anonimo, telefone, email, valor_informado, mensagem } = req.body;

    const novaDoacao = await prisma.doacao.create({
      data: {
        nome_doador: anonimo ? null : nome_doador,
        anonimo: anonimo || false,
        telefone,
        email,
        valor_informado,
        mensagem
      }
    });

    res.status(201).json(novaDoacao);
  } catch (error) {
    console.error('Erro ao registrar doação:', error);
    res.status(500).json({ erro: 'Erro interno ao salvar os dados da doação.' });
  }
});