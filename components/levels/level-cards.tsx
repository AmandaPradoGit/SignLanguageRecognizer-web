'use client';

import Link from 'next/link';

interface LevelCardProps {
  level: number;
  title: string;
  description: string;
  letters?: string;
  color: string;
}

export default function LevelCard({ level, title, description, letters, color }: LevelCardProps) {
  const isHexColor = color.startsWith('#') || color.startsWith('rgb');
  const style = isHexColor ? { backgroundColor: color } : undefined;

  return (
    <Link href={`/levels/${level}`}>
      <div
        className={`
          ${isHexColor ? '' : color}
          rounded-lg p-6 cursor-pointer
          transform transition-all duration-300
          hover:scale-105 hover:shadow-2xl
          border-2 border-opacity-50 
          backdrop-blur-sm bg-opacity-10
          flex flex-col pt-16
          h-98p
        `}
        style={style}
      >
        <div className="text-5xl font-bold mb-3 text-white drop-shadow-lg">
          {level}
        </div>
        <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
          {title}
        </h3>
        <p className="text-sm text-gray-100 drop-shadow-md">
          {description}
        </p>
        <p className="text-md text-gray-100 font-extrabold drop-shadow-md">
          {letters ?? ''}
        </p>
      </div>
    </Link>
  );
}
