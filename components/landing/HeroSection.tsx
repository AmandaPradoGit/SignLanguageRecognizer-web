import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center text-center px-6">
      <div className="max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-extrabold text-pink-600 mb-6 drop-shadow-xl">
          Aprenda o Alfabeto em
          <span className="block bg-clip-text text-transparent bg-linear-to-r from-blue-500 to-purple-900">
            Libras com Aprendizado de Máquina
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-2xl mx-auto">
          Plataforma gamificada com IA e MediaPipe para tornar o aprendizado interativo e envolvente.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/levels"
            className="inline-flex items-center justify-center bg-blue-500 hover:bg-pink-500 text-white px-6 py-2 rounded-lg font-bold transition-all duration-300 transform hover:scale-105"
          >
            Iniciar aprendizado
          </Link>
          <button className="inline-flex items-center justify-center hover:bg-pink-900 hover:text-pink-200 hover:border-pink-500 text-blue-600 px-8 py-3 rounded-lg font-bold transition-all duration-300 border-2 border-blue-500">
            Saiba Mais
          </button>
        </div>
        <p className="text-sm text-gray-500 pt-8">
          Este jogo irá solicitar o acesso à webcam para extrair as coordenadas da sua mão,<br />
          todos os dados são processados localmente e NÃO serão serão armazenados ou enviados !
        </p>
      </div>
      <div className="absolute bottom-10 animate-bounce">
        <div className="w-8 h-8 bg-blue-500 rounded-full mx-auto"></div>
      </div>
    </section>
  );
}
