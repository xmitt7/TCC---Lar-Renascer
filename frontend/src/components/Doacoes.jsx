import React, { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://tcc-lar-renascer.onrender.com/";

export default function Doacoes() {
  const [formData, setFormData] = useState({
    nome_doador: '',
    anonimo: false,
    telefone: '',
    valor_informado: '',
    mensagem: ''
  });

  const [pixData, setPixData] = useState({ copia_e_cola: '', qr_code_base64: '' });
  const [loadingPix, setLoadingPix] = useState(true);
  const [statusEnvio, setStatusEnvio] = useState(null);
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    console.log("Iniciando busca do Pix em:", `${API_BASE_URL}/pix`);
    
    fetch(`${API_BASE_URL}/pix`)
      .then(res => {
        console.log("Status da resposta HTTP:", res.status);
        if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log("Dados brutos recebidos da API:", data);

        const textoPix = data.copia_e_cola || "";
        const imagemPix = data.qr_code_base64 || "";

        console.log("Chave copia_e_cola extraída:", textoPix ? "Sucesso" : "Vazia");
        console.log("Chave qr_code_base64 extraída:", imagemPix ? "Sucesso" : "Vazia");

        setPixData({
          copia_e_cola: textoPix,
          qr_code_base64: imagemPix
        });
        setLoadingPix(false);
      })
      .catch(err => {
        console.error("Erro crítico na requisição do Pix:", err);
        setLoadingPix(false);
      });
  }, []);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCopyPix = () => {
    if (pixData.copia_e_cola) {
      navigator.clipboard.writeText(pixData.copia_e_cola);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 3000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusEnvio('enviando');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/doacoes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          valor_informado: parseFloat(formData.valor_informado) || 0
        })
      });

      if (response.ok) {
        setStatusEnvio('sucesso');
        setFormData({ nome_doador: '', anonimo: false, telefone: '', valor_informado: '', mensagem: '' });
      } else {
        setStatusEnvio('erro');
      }
    } catch (error) {
      setStatusEnvio('erro');
    }
  };

  return (
    <div className="w-full flex items-center justify-center px-4 font-['Nunito',sans-serif]">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12 transform sm:scale-95 origin-center">
        
        {/* COLUNA 1: FORMULÁRIO */}
        <div className="p-6 lg:col-span-7 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-[#3D0C33] uppercase bg-[#FAEAF5] px-3 py-1 rounded-full w-max block mb-2">
              Lar Renascer
            </span>
            <h2 className="text-2xl font-semibold text-[#1E0F35] tracking-tight mb-1 font-serif">
              Registrar Contribuição
            </h2>
            <p className="text-xs text-[#4E3490] mb-4">
              Preencha os dados abaixo para receber agradecimentos do Lar Renascer.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#3D2060] uppercase tracking-wider mb-1">Nome do Doador</label>
                <input
                  type="text"
                  name="nome_doador"
                  disabled={formData.anonimo}
                  value={formData.anonimo ? 'Anônimo' : formData.nome_doador}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#D4C5ED] shadow-sm focus:border-[#C0399A] focus:ring-2 focus:ring-[#FAEAF5] transition bg-white p-2.5 text-sm outline-none disabled:bg-gray-50 disabled:text-gray-400"
                  required={!formData.anonimo}
                />
              </div>

              <div className="flex items-center space-x-3 bg-[#FAFAF8] p-2.5 rounded-xl border border-[#D4C5ED]">
                <input
                  type="checkbox"
                  name="anonimo"
                  id="anonimo"
                  checked={formData.anonimo}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#C0399A] focus:ring-[#C0399A] border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="anonimo" className="text-xs text-[#1E0F35] font-medium cursor-pointer select-none">
                  Quero fazer uma doação anônima
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#3D2060] uppercase tracking-wider mb-1">Telefone / WhatsApp</label>
                  <input
                    type="text"
                    name="telefone"
                    placeholder="(47) 99999-0000"
                    value={formData.telefone}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#D4C5ED] shadow-sm focus:border-[#C0399A] focus:ring-2 focus:ring-[#FAEAF5] transition bg-white p-2.5 text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#3D2060] uppercase tracking-wider mb-1">Valor da Doação (R$)</label>
                  <input
                    type="number"
                    name="valor_informado"
                    placeholder="0,00"
                    step="0.01"
                    min="1"
                    value={formData.valor_informado}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#D4C5ED] shadow-sm focus:border-[#C0399A] focus:ring-2 focus:ring-[#FAEAF5] transition bg-white p-2.5 text-sm outline-none font-medium text-[#C0399A]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#3D2060] uppercase tracking-wider mb-1">Mensagem de Apoio (Opcional)</label>
                <textarea
                  name="mensagem"
                  rows="2"
                  placeholder="Deixe uma mensagem para o Lar..."
                  value={formData.mensagem}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#D4C5ED] shadow-sm focus:border-[#C0399A] focus:ring-2 focus:ring-[#FAEAF5] transition bg-white p-2.5 text-sm outline-none resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={statusEnvio === 'enviando'}
                className="w-full bg-[#C0399A] hover:bg-[#922876] text-white font-semibold py-2.5 px-4 rounded-xl shadow-md transition transform active:scale-[0.99] disabled:opacity-50 cursor-pointer text-sm"
              >
                {statusEnvio === 'enviando' ? 'Processando...' : 'Confirmar Intenção'}
              </button>

              {statusEnvio === 'sucesso' && (
                <div className="p-2.5 bg-green-50 border border-green-200 rounded-xl text-green-700 text-xs font-semibold text-center">
                  🎉 Intenção registrada com sucesso! Agradecemos seu apoio.
                </div>
              )}
              {statusEnvio === 'erro' && (
                <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold text-center">
                  ⚠️ Erro ao registrar. Se preferir, utilize diretamente o Pix ao lado.
                </div>
              )}
            </form>
          </div>
        </div>

        {/* COLUNA 2: CARD INTEGRADO DO PIX */}
        <div className="p-6 lg:col-span-5 bg-[#3D0C33] flex flex-col items-center justify-center text-center text-white">
          <div className="w-full max-w-sm flex flex-col items-center">
            <h3 className="text-lg font-semibold text-[#E8A020] mb-1 font-serif">Doação Instantânea</h3>
            <p className="text-[11px] text-[#F0BCDF] mb-4 px-2 leading-relaxed">
              Aponte a câmera do seu banco para o QR Code ou use o código Copia e Cola.
            </p>

            <div className="bg-white p-3 rounded-xl shadow-lg mb-5 transition-all duration-300 flex items-center justify-center">
              {loadingPix ? (
                <div className="w-40 h-40 sm:w-44 sm:h-44 bg-gray-50 rounded-lg flex items-center justify-center animate-pulse">
                  <span className="text-xs text-gray-400 font-medium">Buscando Pix...</span>
                </div>
              ) : pixData.qr_code_base64 ? (
                <img 
                  src={pixData.qr_code_base64} 
                  alt="QR Code Pix Lar Renascer" 
                  className="w-40 h-40 sm:w-44 sm:h-44 object-contain block"
                />
              ) : (
                <div className="w-40 h-40 sm:w-44 sm:h-44 bg-gray-50 rounded-lg flex items-center justify-center border border-dashed border-gray-300">
                  <span className="text-xs text-red-400 p-4">QR Code indisponível</span>
                </div>
              )}
            </div>

            {/* Área Pix Copia e Cola Dupla */}
            <div className="w-full space-y-1.5 text-left">
              <label className="block text-[10px] font-semibold text-[#DF88C4] uppercase tracking-wider pl-1">Código Copia e Cola</label>
              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <input
                  type="text"
                  readOnly
                  value={loadingPix ? "Carregando..." : pixData.copia_e_cola || "Código não gerado"}
                  className="flex-1 bg-[#3D0C33] border border-[#DF88C4]/40 text-[11px] text-[#FAEAF5] p-2.5 rounded-xl outline-none font-mono truncate text-center sm:text-left"
                />
                <button
                  type="button"
                  onClick={handleCopyPix}
                  disabled={loadingPix || !pixData.copia_e_cola}
                  className={`px-3 py-2.5 rounded-xl font-semibold text-[11px] transition whitespace-nowrap shadow-sm active:scale-95 cursor-pointer ${
                    copiado 
                      ? 'bg-green-600 text-white' 
                      : 'bg-[#E8A020] text-[#3A1E00] hover:bg-[#B87A10]'
                  }`}
                >
                  {copiado ? '✓ Copiado' : '📋 Copiar'}
                </button>
              </div>
            </div>

            {/* Rodapé Interno do Card */}
            <div className="mt-5 pt-4 border-t border-[#DF88C4]/20 text-[10px] text-[#DF88C4] w-full leading-relaxed">
              Favorecido: <strong className="text-white">Lar Renascer</strong><br />
              Joinville - SC • Associação Beneficente Renascer
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}