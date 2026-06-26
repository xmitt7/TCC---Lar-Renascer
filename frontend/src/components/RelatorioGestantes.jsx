import React, { useState, useEffect } from 'react';

export default function RelatorioGestantes() {
  const [busca, setBusca] = useState('');
  const [gestantes, setGestantes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const API_URL = "https://tcc-lar-renascer.onrender.com";
  
  const USUARIO_PROTEGIDO = "admin"; 
  const SENHA_PROTEGIDA = "renascer2026";

  useEffect(() => {
    async function carregarGestantes() {
      try {
        setCarregando(true);
        const credenciaisBase64 = btoa(`${USUARIO_PROTEGIDO}:${SENHA_PROTEGIDA}`);
        
        const res = await fetch(`${API_URL}/gestantes/interno`, {
          method: 'GET',
          headers: {
            'Authorization': `Basic ${credenciaisBase64}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        setGestantes(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setErro("Não foi possível carregar o relatório de gestantes.");
      } finally {
        setCarregando(false);
      }
    }
    carregarGestantes();
  }, []);

  const filtradas = gestantes.filter(g => 
    g.nome?.toLowerCase().includes(busca.toLowerCase()) || g.cpf?.includes(busca)
  );

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <style>{`@media print { .nao-imprimir { display: none !important; } table { width: 100%; border-collapse: collapse; } th, td { border: 1px solid #ccc; padding: 8px; } }`}</style>

      <div style={{ borderBottom: '2px solid #6c5ce7', paddingBottom: '15px', marginBottom: '20px' }}>
        <h1 style={{ color: '#2d3436', margin: 0 }}>🤰 Relatório de Gestantes Cadastradas</h1>
        <p style={{ color: '#777', margin: '5px 0 0 0' }}>Uso interno exclusivo para a administração do Lar Renascer.</p>
      </div>

      {erro && <div style={{ padding: '15px', backgroundColor: '#ffeaea', color: '#d63031', borderRadius: '5px', marginBottom: '20px' }}>⚠️ {erro}</div>}

      <div className="nao-imprimir" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px', gap: '10px' }}>
        <input 
          type="text" 
          placeholder="Buscar gestante por nome..." 
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          style={{ padding: '10px', width: '300px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button onClick={() => window.print()} style={{ padding: '10px 20px', backgroundColor: '#6c5ce7', color: 'white', fontWeight: 'bold', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          🖨️ Salvar PDF / Imprimir
        </button>
      </div>

      {carregando ? (
        <p style={{ textAlign: 'center', color: '#6c5ce7' }}>Carregando dados seguros das gestantes...</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
          <thead>
            <tr style={{ backgroundColor: '#6c5ce7', color: 'white' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Nome da Mãe</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Idade</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Telefone</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Data de Cadastro</th>
            </tr>
          </thead>
          <tbody>
            {filtradas.length === 0 ? (
              <tr><td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: '#999' }}>Nenhuma gestante encontrada.</td></tr>
            ) : (
              filtradas.map((g, idx) => (
                <tr key={g.id || idx} style={{ backgroundColor: idx % 2 === 0 ? '#f9f9f9' : 'white', borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>{g.nome}</td>
                  <td style={{ padding: '12px' }}>{g.idade} anos</td>
                  <td style={{ padding: '12px' }}>{g.telefone || 'Não informado'}</td>
                  <td style={{ padding: '12px' }}>{g.dataCadastro ? new Date(g.dataCadastro).toLocaleDateString('pt-BR') : '---'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}