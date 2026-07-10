'use client';

import LevelCard from './level-cards';

export default function LevelsContainer() {
  const levels = [
    {
      level: 1,
      title: 'As Vogais',
      description: 'Aprenda a base do alfabeto com formatos simples e estáticos.',
      letters: 'Letras: A, E, I, O, U.',
      color: 'bg-pink-500',
    },
    {
      level: 2,
      title: 'Sinais Firmes',
      description: 'Expanda seu vocabulário com as consoantes estáticas.',
      letters: 'Letras: B, C, L, M, N, S, V, W.',
      color: '#dcc604',
    },
    {
      level: 3,
      title: 'Desafio Dinâmico',
      description: 'Domine letras com movimentos, giros e alta coordenação.',
      letters: 'Letras: D, F, G, H, J, K, P, Q, R, T, X, Y, Z.',
      color: 'bg-blue-500',
    },
    {
      level: 4,
      title: 'Soletração',
      description: 'Pratique a dactilologia juntando as letras para formar palavras.',
      color: 'bg-orange-500',
    },
    {
      level: 5,
      title: 'Modo Livre',
      description: 'Treine no seu próprio ritmo e faça o sinal que quiser.',
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="relative z-10 pt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto px-4">
        {levels.map((levelData) => (
          <LevelCard
            key={levelData.level}
            level={levelData.level}
            title={levelData.title}
            description={levelData.description}
            letters={levelData.letters}
            color={levelData.color}
          />
        ))}
      </div>
    </div>
  );
}