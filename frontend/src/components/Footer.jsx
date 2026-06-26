import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#3D0C33] h-14 px-6 flex items-center justify-between mt-auto">
      <img src="assets/logo.png" alt="Lar Renascer" className="h-8" />
      <div className="hidden md:flex gap-10 text-pink-300 text-md">
        <a href="#">Privacidade</a>
        <a href="#">Termos de Uso</a>
      </div>
    </footer>
  );
}