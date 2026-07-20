'use client';

import React, { useEffect, useRef, useState } from 'react';
import HandTracker from './HandTracker';
import { preverLibras } from '../../hooks/useLibrasApi';

interface Props {
  level: string;
}

const LEVEL_DATA: Record<
  string,
  { letters: string[]; colorHex: string; description: string }
> = {
  '1': {
    letters: ['A', 'E', 'I', 'O', 'U'],
    colorHex: '#ec4899',
    description: 'Letras básicas A, E, I, O, U',
  },
  '2': {
    letters: ['B', 'C', 'L', 'M', 'N', 'S', 'V', 'W'],
    colorHex: '#dcc604',
    description: 'Letras intermédias B, C, L, M, N, S, V, W',
  },
  '3': {
    letters: ['D', 'F', 'G', 'H', 'J', 'K', 'P', 'Q', 'R', 'T', 'X', 'Y', 'Z'],
    colorHex: '#3b82f6',
    description: 'Letras avançadas D, F, G, H, J, K, P, Q, R, T, X, Y, Z',
  },
  '5': {
    letters: [],
    colorHex: '#a855f7',
    description: 'Modo livre: treine qualquer sinal e veja a predição em tempo real.',
  },
};

function getRandomLetter(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function LevelScreen({ level }: Props) {
  const data = LEVEL_DATA[level] || LEVEL_DATA['1'];
  const letters = data.letters;
  const isFreeMode = level === '5';
  const [current, setCurrent] = useState<string>('');
  const [predicao, setPredicao] = useState<string>('Aguardando detecção...');
  const [status, setStatus] = useState<string>('Faça o sinal para ver a predição.');
  const bufferPredicoes = useRef<string[]>([]);
  const ultimaChamada = useRef<number>(0);
  const TAMANHO_BUFFER = 5;

  const next = () => setCurrent(getRandomLetter(letters));

  const handleHandsResults = async (results: any) => {
    // Se não detectou mãos, resetar buffer e status
    if (!results.multiHandLandmarks || results.multiHandLandmarks.length === 0) {
      bufferPredicoes.current = [];
      setPredicao('Aguardando detecção...');
      setStatus('Nenhuma mão detectada.');
      return;
    }

    const now = Date.now();
    if (now - ultimaChamada.current < 250) {
      return;
    }
    ultimaChamada.current = now;

    const landmarks = results.multiHandLandmarks[0].flatMap((landmark: any) => [
      landmark.x,
      landmark.y,
      landmark.z,
    ]);

    try {
      const response = await preverLibras(landmarks);
      if (response.predicao) {
        bufferPredicoes.current.push(response.predicao);
        if (bufferPredicoes.current.length > TAMANHO_BUFFER) {
          bufferPredicoes.current.shift();
        }

        const contagem: Record<string, number> = {};
        bufferPredicoes.current.forEach((p) => {
          contagem[p] = (contagem[p] || 0) + 1;
        });

        const predicaoEstavel = Object.entries(contagem).sort((a, b) => b[1] - a[1])[0]?.[0];
        if (predicaoEstavel) {
          // Normalizar predição: extrair primeira letra A-Z (caso o backend retorne frases/ruído)
          const apenasLetras = (predicaoEstavel || '').toUpperCase().replace(/[^A-Z]/g, '');
          const letraRecebida = apenasLetras ? apenasLetras[0] : '';
          setPredicao(letraRecebida || predicaoEstavel);

          // Comportamento para modo livre (mostrar predição) e para níveis com letra alvo (verificar)
          if (isFreeMode) {
            setStatus('Predição recebida do backend.');
          } else {
            // Comparar de forma case-insensitive
            const esperado = (current || '').toUpperCase();
            const recebido = letraRecebida;
            if (esperado && recebido && recebido === esperado) {
              setStatus('Correto!');
              // limpar buffer e avançar para próxima letra após pequena pausa
              bufferPredicoes.current = [];
              setTimeout(() => {
                setCurrent(getRandomLetter(letters));
                setPredicao('Aguardando detecção...');
                setStatus('Próxima letra.');
              }, 900);
            } else {
              setStatus('Tente novamente.');
            }
          }
        }
      } else if (response.erro) {
        setStatus(response.erro);
      }
    } catch (error) {
      console.error('Erro ao chamar a API de predição:', error);
      setStatus('Erro ao comunicar com o backend.');
    }
  };

  // Set a random current letter on client mount and whenever the level changes.
  // Compute data inside the effect to avoid stale closures.
  useEffect(() => {
    const currentData = LEVEL_DATA[level] || LEVEL_DATA['1'];
    setCurrent(getRandomLetter(currentData.letters));
  }, [level]);

  return (
    <div className="flex h-screen flex-row-reverse">
      <div className="w-1/2 bg-black flex items-center justify-center">
        <HandTracker onResults={handleHandsResults} />
      </div>
      <div
        className={`w-1/2 text-white p-8 flex flex-col items-center justify-center space-y-6`}
        style={{ backgroundColor: data.colorHex }}
      >
        <div className="text-xl opacity-90">Nível {level}</div>
        <div className="text-sm opacity-90">{data.description}</div>

        {isFreeMode ? (
          <>
            <div className="text-9xl font-extrabold drop-shadow-lg">{predicao}</div>
            <div className="text-sm opacity-90">{status}</div>
          </>
        ) : (
          <>
            <div className="text-9xl font-extrabold drop-shadow-lg">{current}</div>

            <div className="flex gap-4">
              <button onClick={next} className="px-4 py-2 bg-black/30 rounded-md">Próxima letra</button>
              <button onClick={() => setCurrent(getRandomLetter(letters))} className="px-4 py-2 bg-black/30 rounded-md">Aleatória</button>
            </div>

            <div className="text-sm opacity-90">Letras do nível: {letters.join(', ')}</div>
          </>
        )}
      </div>
    </div>
  );
}
