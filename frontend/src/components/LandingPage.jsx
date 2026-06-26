import React from 'react';

export default function LandingPage({ onNavigate }) {
  return (
    <div className="bg-stone-50 font-['Nunito',sans-serif]">
      {/* SEÇÃO HERO */}
      <section className="relative h-[550px]">
        <img src="/assets/teste_landpage.jpg" alt="Foto da landpage" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[#3D0C33]/70"></div>
        <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-6">
          <div className="max-w-2xl">
            <span className="uppercase tracking-widest text-[#E8A020] text-xs font-bold">
              Associação Beneficente Renascer: Lar da Gestante • Joinville SC
            </span>
            <h1 className="mt-4 text-5xl font-serif text-white leading-tight">
              Renascer é sempre possível
            </h1>
            <p className="mt-5 text-pink-200 leading-8">
              Oferecemos acolhimento, apoio e oportunidades para pessoas em situação
              de vulnerabilidade social.
            </p>
          </div>
        </div>
      </section>

      {/* BARRA DE SERVIÇOS */}
      <div className="w-full bg-[#C0399A] py-5 text-white text-md">
        <ul className="flex justify-center items-center gap-10">
          <li className="flex items-center gap-2">
            <span>🏠</span>
            <span>Acolhimento residencial</span>
          </li>
          <li className="w-1 h-1 rounded-full bg-[#FAEAF5]"></li>
          <li className="flex items-center gap-2">
            <span>🏫</span>
            <span>Educação e capacitação</span>
          </li>
          <li className="w-1 h-1 rounded-full bg-[#FAEAF5]"></li>
          <li className="flex items-center gap-2">
            <span>🧠</span>
            <span>Apoio psicossocial</span>
          </li>
        </ul>
      </div>

      {/* SEÇÃO: O QUE FAZEMOS */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <span className="uppercase text-sm tracking-wider text-[#C0399A] font-bold">
            O que fazemos
          </span>
          <h2 className="text-4xl font-serif text-slate-900 mt-2">
            O trabalho sendo feito
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl">
            Cada dia no Lar Renascer é uma oportunidade de transformar vidas.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <article className="group bg-stone-50 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <img src="/assets/acolhimento_casa.png" alt="Acolhimento" className="h-56 w-full object-cover" />
              <div className="p-8">
                <div className="w-12 h-12 rounded-xl bg-[#FAEAF5] flex items-center justify-center transition-transform group-hover:rotate-12">
                  <span className="text-xl">🏠</span>
                </div>
                <h3 className="font-serif text-xl mt-4 text-slate-800">Acolhimento residencial</h3>
                <p className="text-slate-600 mt-2 leading-relaxed">
                  Moradia segura e estruturada para pessoas em situação de vulnerabilidade.
                </p>
              </div>
            </article>

            <article className="group bg-stone-50 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <img src="/assets/sala_de_aula.png" alt="Educação" className="h-56 w-full object-cover" />
              <div className="p-8">
                <div className="w-12 h-12 rounded-xl bg-[#FAEAF5] flex items-center justify-center transition-transform group-hover:rotate-12">
                  <span className="text-xl">🏫</span>
                </div>
                <h3 className="font-serif text-xl mt-4 text-slate-800">Educação e capacitação</h3>
                <p className="text-slate-600 mt-2 leading-relaxed">
                  Oficinas, cursos e acompanhamento pedagógico para todas as idades.
                </p>
              </div>
            </article>

            <article className="group bg-stone-50 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <img src="/assets/apoio_psicossocial.png" alt="Apoio" className="h-56 w-full object-cover" />
              <div className="p-8">
                <div className="w-12 h-12 rounded-xl bg-[#FAEAF5] flex items-center justify-center transition-transform group-hover:rotate-12">
                  <span className="text-xl">🩺</span>
                </div>
                <h3 className="font-serif text-xl mt-4 text-slate-800">Apoio psicossocial</h3>
                <p className="text-slate-600 mt-2 leading-relaxed">
                  Atendimento psicológico e suporte assistencial contínuo focado na autonomia.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CAMPANHA DE INVERNO */}
      <div className="w-full bg-[#E8A020] py-6">
        <div className="max-w-7xl mx-auto px-6">
          <span className="uppercase tracking-wider text-black text-xs font-bold">
            Campanha de Inverno 2026
          </span>
          <h2 className="text-xl font-serif text-black mt-1">
            Ajude a aquecer mais famílias neste inverno
          </h2>
          <p className="mt-1 text-black text-sm max-w-2xl opacity-90">
            Doe roupas, cobertores e alimentos não perecíveis.
          </p>
        </div>
      </div>

      {/* GALERIA */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <span className="uppercase text-sm tracking-wider text-[#C0399A] font-bold">
            Galeria
          </span>
          <h2 className="text-4xl font-serif text-slate-900 mt-2">
            Momentos do lar
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl">
            Um registro do nosso dia a dia
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="group bg-stone-50 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <img src="/assets/voluntario.png" alt="Voluntário atuando" className="h-64 w-full object-cover" />
            </div>
            <div className="group bg-stone-50 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <img src="/assets/maos.png" alt="Mãos unidas apoiando" className="h-64 w-full object-cover" />
            </div>
            <div className="group bg-stone-50 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <img src="/assets/coracao.png" alt="Afeto no lar" className="h-64 w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* HISTÓRIAS DE SUPERAÇÃO */}
      <section className="py-12 px-6 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <span className="uppercase text-sm tracking-wider text-[#C0399A] font-bold">
            Histórias de superação
          </span>
          <div className="grid md:grid-cols-2 gap-12 mt-6">
            <div className="bg-white p-6 rounded-2xl border-l-4 border-[#C0399A] shadow-sm">
              <img src="/assets/foto_testemunho_icone.png" alt="Leticia A." className="h-12 w-12 object-cover rounded-full mb-3" />
              <h2 className="text-slate-800 italic font-medium">
                "O Lar me deu a chance de recomeçar. Hoje tenho emprego, casa e minha família está comigo."
              </h2>
              <p className="text-slate-900 font-bold mt-2 text-xs">Leticia A.</p>
              <p className="text-slate-500 text-xs">Assistida há 2 anos</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border-l-4 border-[#C0399A] shadow-sm">
              <img src="/assets/foto_testemunho_icone_2.png" alt="Paola M." className="h-12 w-12 object-cover rounded-full mb-3" />
              <h2 className="text-slate-800 italic font-medium">
                "Ser voluntária aqui mudou minha perspectiva de vida. Ver o impacto real é emocionante demais."
              </h2>
              <p className="text-slate-900 font-bold mt-2 text-xs">Paola M.</p>
              <p className="text-slate-500 text-xs">Voluntária desde 2022</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO DE CONTATO */}
      <section id="contato" className="py-20 px-6 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <span className="uppercase text-sm tracking-wider text-[#C0399A] font-bold">
            Fale Conosco
          </span>
          <h2 className="text-4xl font-serif text-slate-900 mt-2 mb-12">
            Estamos aqui para ouvir você
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* CARD E-MAIL */}
            <div className="group p-8 rounded-3xl bg-stone-50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#FAEAF5] rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform group-hover:rotate-12">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-[#C0399A]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </div>
              <h3 className="font-serif text-xl mb-2 text-slate-800">E-mail</h3>
              <p className="text-slate-600 mb-4 text-sm">Envie suas dúvidas ou propostas</p>
              <a href="mailto:contato@abrenascer.org.br" className="text-[#C0399A] font-semibold hover:underline break-all">
                contato@abrenascer.org.br
              </a>
            </div>

            {/* CARD WHATSAPP */}
            <div className="group p-8 rounded-3xl bg-stone-50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
        <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform duration-300 group-hover:rotate-12">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512" className="w-8 h-8 text-green-600">
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
          </svg>
        </div>
        <h3 className="font-serif text-xl mb-2 text-slate-800">WhatsApp</h3>
        <p className="text-slate-600 mb-4 text-sm">Conversa rápida e direta</p>
        <div className="flex flex-col gap-1 text-green-700 font-semibold text-sm">
          <a href="https://wa.me/554732277910" target="_blank" rel="noreferrer" className="hover:underline">(47) 3227-7910</a>
          <a href="https://wa.me/5547996178465" target="_blank" rel="noreferrer" className="hover:underline">(47) 99617-8465</a>
        </div>
      </div>

            {/* CARD INSTAGRAM */}
            <div className="group p-8 rounded-3xl bg-stone-50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform group-hover:rotate-12">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8 text-pink-600">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
              </div>
              <h3 className="font-serif text-xl mb-2 text-slate-800">Instagram</h3>
              <p className="text-slate-600 mb-4 text-sm">Siga o nosso dia a dia</p>
              <a 
                href="https://www.instagram.com/larrenascerjoinville/" 
                target="_blank" 
                rel="noreferrer"
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2.5 rounded-full text-sm font-medium inline-block shadow-md hover:shadow-lg transition-shadow"
              >
                @larrenascerjoinville
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION (CTA)*/}
      <section className="bg-[#C0399A] py-16 mt-10">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-serif text-white">
            Juntos podemos transformar mais vidas
          </h2>
          <p className="text-pink-200 mt-2">
            Sua doação faz a diferença todos os dias.
          </p>
          <button 
            onClick={() => onNavigate('doacoes')}
            className="mt-8 bg-[#E8A020] text-amber-950 px-8 py-4 rounded-full font-bold text-lg transform transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-xl hover:bg-[#f4ae31] flex items-center gap-3 mx-auto cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
            Fazer uma doação!
          </button>
        </div>
      </section>
    </div>
  );
}