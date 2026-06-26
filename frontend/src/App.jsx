import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Doacoes from './components/Doacoes';
import Gestantes from './components/Gestantes';
import Footer from './components/Footer';

export default function App() {
  const [telaAtiva, setTelaAtiva] = useState('landing');

  const handleScrollToContato = () => {
    if (telaAtiva !== 'landing') {
      setTelaAtiva('landing');
      setTimeout(() => {
        const element = document.getElementById('contato');
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const element = document.getElementById('contato');
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-stone-50">
      <Navbar onNavigate={setTelaAtiva} onScrollToContato={handleScrollToContato} currentTab={telaAtiva} />
      
      <main className="flex-grow pt-20">
        {telaAtiva === 'landing' && <LandingPage onNavigate={setTelaAtiva} />}
        {telaAtiva === 'doacoes' && <Doacoes />}
        {telaAtiva === 'gestantes' && <Gestantes />}
      </main>

      <Footer />
    </div>
  );
}