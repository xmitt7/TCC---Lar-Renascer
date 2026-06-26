import React from 'react';

export default function Navbar({ onNavigate, onScrollToContato, currentTab }) {
  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-[#3D0C33] z-50 px-6 flex items-center justify-between shadow-md font-['Nunito',sans-serif]">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('landing')}>
        <img src="/assets/logo.png" alt="Logo Lar Renascer" className="h-12 w-auto object-contain" />
      </div>

      <div className="hidden md:flex gap-14 text-pink-200 text-md font-medium">
        <button 
          onClick={() => onNavigate('landing')} 
          className={`transition-colors cursor-pointer ${currentTab === 'landing' ? 'text-white font-bold' : 'hover:text-white'}`}
        >
          Sobre nós
        </button>
        <button 
          onClick={() => onNavigate('gestantes')} 
          className={`transition-colors cursor-pointer ${currentTab === 'gestantes' ? 'text-white font-bold' : 'hover:text-white'}`}
        >
          Gestantes
        </button>
        <button 
          onClick={onScrollToContato} 
          className="hover:text-white transition-colors cursor-pointer"
        >
          Contato
        </button>
      </div>

      <button 
        onClick={() => onNavigate('doacoes')}
        className={`bg-[#E8A020] text-amber-950 font-bold px-5 py-2.5 rounded-full text-sm hover:bg-[#f4ae31] transition-all transform active:scale-95 flex items-center gap-2 shadow-sm cursor-pointer ${currentTab === 'doacoes' ? 'ring-2 ring-white' : ''}`}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="currentColor" 
          viewBox="0 0 24 24" 
          className="w-4 h-4 text-amber-950"
        >
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
        </svg>
        Doe agora
      </button>
    </nav>
  );
}