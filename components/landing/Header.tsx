import Link from 'next/link';

export default function Header() {
  return (
    <header className="relative z-20 p-6">
      <nav className="flex justify-between items-center max-w-6xl mx-auto">
        <div className="text-2xl font-bold text-blue-500 drop-shadow-lg">SemNome</div>
        <div className="hidden md:flex space-x-12">
          {['Início', 'Como Funciona'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-blue-200 hover:text-blue-900 transition-colors duration-300 font-medium"
            >
              {item}
            </a>
          ))}
        </div>
        <Link
          href="/levels"
          className="inline-flex items-center justify-center bg-blue-500 hover:bg-pink-500 text-white px-6 py-2 rounded-lg font-bold transition-all duration-300 transform hover:scale-105"
        >
          Começar Agora
        </Link>
      </nav>
    </header>
  );
}
