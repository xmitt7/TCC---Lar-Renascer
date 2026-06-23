const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

const qrcode = require('qrcode');

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

// ROTA PÚBLICA: Gerar o QR Code para Doação via Pix
app.get('/pix', async (req, res) => {
  try {
    // IMPORTANTE: Para o MVP, você pode gerar um "Pix Copia e Cola" estático (sem valor definido) 
    // direto no aplicativo do banco da instituição e colar a string inteira aqui.
    // Abaixo está uma string de exemplo (não funcional).
    const payloadPix = "00020126580014br.gov.bcb.pix0136123e4567-e89b-12d3-a456-4266554400005204000053039865802BR5913Lar Renascer6009Joinville62070503***6304ABCD";

    // Gera a imagem do QR Code em formato Data URI (Base64) - fácil para o frontend exibir na tag <img>
    const qrCodeImage = await qrcode.toDataURL(payloadPix);

    res.json({
      copia_e_cola: payloadPix,
      qr_code_base64: qrCodeImage
    });
  } catch (error) {
    console.error('Erro ao gerar QR Code:', error);
    res.status(500).json({ erro: 'Erro interno ao gerar o PIX.' });
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