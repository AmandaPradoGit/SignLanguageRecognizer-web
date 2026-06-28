// Componente para o background com estética geométrica e colorida
const GeometricBackground = () => {
  return (
    <div className="fixed inset-0 bg-black overflow-hidden z-0">
      {/* Formas geométricas flutuantes */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-pink-400 transform rotate-45 opacity-80"></div>
      <div className="absolute top-20 right-20 w-16 h-16 bg-yellow-400 rounded-full opacity-80"></div>
      <div className="absolute top-40 left-1/3 w-12 h-12 bg-blue-500 opacity-80"></div>
      <div className="absolute top-60 right-1/4 w-24 h-24 bg-orange-400 transform rotate-12 opacity-80"></div>
      <div className="absolute bottom-20 left-20 w-18 h-18 bg-purple-400 rounded-full opacity-80"></div>
      <div className="absolute bottom-40 right-10 w-20 h-20 bg-green-400 transform -rotate-12 opacity-80"></div>
      
      {/* Estrelas e elementos decorativos */}
      <div className="absolute top-1/4 left-1/2 text-pink-500 text-2xl">✦</div>
      <div className="absolute top-1/2 right-1/4 text-blue-500 text-xl">✦</div>
      <div className="absolute bottom-1/4 left-1/4 text-yellow-500 text-xl">✦</div>
      <div className="absolute bottom-1/3 right-1/3 text-orange-500 text-2xl">✦</div>
      
    </div>
  );
};

// Componente para o header
const Header = () => {
  return (
    <header className="relative z-20 p-6">
      <nav className="flex justify-between items-center max-w-6xl mx-auto">
        <div className="text-2xl font-bold text-blue-500 drop-shadow-lg">
          SemNome
        </div>
        <div className="hidden md:flex space-x-12">
          {['Início', 'Como Funciona'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className=" text-blue-200 hover:text-blue-900 transition-colors duration-300 font-medium"
            >
              {item}
            </a>
          ))}
        </div>
        <button className="bg-blue-500 hover:bg-pink-500 text-white px-6 py-2 rounded-lg font-bold transition-all duration-300 transform hover:scale-105">
          Começar Agora
        </button>
      </nav>
    </header>
  );
};

// Componente para a seção hero
const HeroSection = () => {
  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center text-center px-6">
      <div className="max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-extrabold text-pink-600 mb-6 drop-shadow-xl">
          Aprenda o Alfabeto em
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-900">
            Libras com Aprendizado de Máquina
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-2xl mx-auto">
          Plataforma gamificada com IA e MediaPipe para tornar o aprendizado interativo e envolvente.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-blue-500 hover:bg-pink-600 text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105">
            Experimentar Grátis
          </button>
          <button className="hover:bg-pink-900 hover:text-pink-200 hover:border-pink-500 text-blue-600 px-8 py-3 rounded-lg font-bold transition-all duration-300 border-2 border-blue-500">
            Saiba Mais
          </button>
          
        </div>
        <p className="text-sm text-gray-500 pt-8">
          Este jogo irá solicitar o acesso à webcam para extrair as coordenadas da sua mão,<br/>
          todos os dados são processados localmente e NÃO serão serão armazenados ou enviados !
        </p>
      </div>
      
      <div className="absolute bottom-10 animate-bounce">
        <div className="w-8 h-8 bg-blue-500 rounded-full mx-auto"></div>
      </div>
    </section>
  );
};
// Componente principal
const LandingPage = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <GeometricBackground />
      <div className="relative z-10">
        <Header />
        <HeroSection />
      </div>
    </div>
  );
};

export default LandingPage;