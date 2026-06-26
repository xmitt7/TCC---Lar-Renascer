const express = require('express');
const cors = require('cors');

// Importação das rotas
const pixRoutes = require('./src/routes/pixRoutes');
const doacoesRoutes = require('./src/routes/doacoesRoutes');
const gestantesRoutes = require('./src/routes/gestantesRoutes');

const app = express();

// Middlewares Globais
app.use(cors({
  origin: [
    'http://localhost:5173',     
    'https://tcc-lar-renascer.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Injeção das Rotas
app.use('/pix', pixRoutes);
app.use('/doacoes', doacoesRoutes);
app.use('/gestantes', gestantesRoutes);

// Rota Raiz (Health Check)
app.get('/', (req, res) => {
  res.send('Servidor do Lar Renascer rodando perfeitamente!');
});

// Início do Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});