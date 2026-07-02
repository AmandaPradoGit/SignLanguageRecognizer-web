'use client';

import LevelCard from './level-cards';

export default function LevelsContainer() {
  const levels = [
    {
      level: 1,
      title: 'Vogais',
      description: 'Aprenda as vogais em libras',
      color: 'bg-pink-500',
    },
    {
      level: 2,
      title: 'Consoantes - Básico',
      description: 'Aprenda consoantes simples e estáticas',
      color: 'bg-yellow-500',
    },
    {
      level: 3,
      title: 'Consoantes - Intermediário',
      description: 'Aprenda consoantes ',
      color: 'bg-blue-500',
    },
    {
      level: 4,
      title: 'Avançado',
      description: 'Conversas complexas e nuances da língua',
      color: 'bg-orange-500',
    },
    {
      level: 5,
      title: 'Expert',
      description: 'Domine completamente a Libras',
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
            color={levelData.color}
          />
        ))}
      </div>
    </div>
  );
}
