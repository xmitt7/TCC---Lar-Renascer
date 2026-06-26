import React, { useState, useEffect } from 'react';

export default function RelatorioDoacoes() {
  const [busca, setBusca] = useState('');
  const [doacoes, setDoacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const API_URL = "https://tcc-lar-renascer.onrender.com";

  const USUARIO_PROTEGIDO = "admin"; 
  const SENHA_PROTEGIDA = "renascer2026";

  useEffect(() => {
    async function carregarDoacoes() {
      try {
        setCarregando(true);
        const credenciaisBase64 = btoa(`${USUARIO_PROTEGIDO}:${SENHA_PROTEGIDA}`);
        
        const res = await fetch(`${API_URL}/doacoes`, {
          method: 'GET',
          headers: {
            'Authorization': `Basic ${credenciaisBase64}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        setDoacoes(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setErro("Não foi possível carregar o relatório de doações.");
      } finally {
        setCarregando(false);
      }
    }
    carregarDoacoes();
  }, []);

  const filtradas = doacoes.filter(d => 
    d.nomeDoador?.toLowerCase().includes(busca.toLowerCase()) || d.valor?.toString().includes(busca)
  );

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <style>{`@media print { .nao-imprimir { display: none !important; } table { width: 100%; border-collapse: collapse; } th, td { border: 1px solid #ccc; padding: 8px; } }`}</style>

      <div style={{ borderBottom: '2px solid #00b894', paddingBottom: '15px', marginBottom: '20px' }}>
        <h1 style={{ color: '#2d3436', margin: 0 }}>💰 Relatório de Doações e Pix</h1>
        <p style={{ color: '#777', margin: '5px 0 0 0' }}>Uso interno exclusivo para a administração do Lar Renascer.</p>
      </div>

      {erro && <div style={{ padding: '15px', backgroundColor: '#ffeaea', color: '#d63031', borderRadius: '5px', marginBottom: '20px' }}>⚠️ {erro}</div>}

      <div className="nao-imprimir" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px', gap: '10px' }}>
        <input 
          type="text" 
          placeholder="Buscar por doador ou valor..." 
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          style={{ padding: '10px', width: '300px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button onClick={() => window.print()} style={{ padding: '10px 20px', backgroundColor: '#00b894', color: 'white', fontWeight: 'bold', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          🖨️ Salvar PDF / Imprimir
        </button>
      </div>

      {carregando ? (
        <p style={{ textAlign: 'center', color: '#00b894' }}>Carregando dados seguros das doações...</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
          <thead>
            <tr style={{ backgroundColor: '#00b894', color: 'white' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Doador</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Valor</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Forma</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Data</th>
            </tr>
          </thead>
          <tbody>
            {filtradas.length === 0 ? (
              <tr><td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: '#999' }}>Nenhuma doação registrada.</td></tr>
            ) : (
              filtradas.map((d, idx) => (
                <tr key={d.id || idx} style={{ backgroundColor: idx % 2 === 0 ? '#f9f9f9' : 'white', borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>{d.nomeDoador || 'Anônimo'}</td>
                  <td style={{ padding: '12px', color: '#2d3436', fontWeight: 'bold' }}>
                    {Number(d.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </td>
                  <td style={{ padding: '12px' }}><span style={{ background: '#dfe6e9', padding: '3px 8px', borderRadius: '3px', fontSize: '12px' }}>{d.tipo || 'Pix'}</span></td>
                  <td style={{ padding: '12px' }}>{d.dataDoacao ? new Date(d.dataDoacao).toLocaleDateString('pt-BR') : '---'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}