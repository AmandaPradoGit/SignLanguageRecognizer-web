'use client';

import React, { useEffect, useRef } from 'react';

interface HandTrackerProps {
  onResults?: (results: any) => void;
}

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement | null;
    if (existing) {
      if (existing.dataset.loaded === 'true') {
        resolve();
        return;
      }

      const onLoad = () => {
        existing.removeEventListener('load', onLoad);
        existing.removeEventListener('error', onError);
        resolve();
      };
      const onError = () => {
        existing.removeEventListener('load', onLoad);
        existing.removeEventListener('error', onError);
        reject(new Error(`Falha ao carregar script ${src}`));
      };

      existing.addEventListener('load', onLoad);
      existing.addEventListener('error', onError);
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => {
      script.dataset.loaded = 'true';
      resolve();
    };
    script.onerror = () => reject(new Error(`Falha ao carregar script ${src}`));
    document.body.appendChild(script);
  });
}

export default function HandTracker({ onResults }: HandTrackerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !videoRef.current || !canvasRef.current) return;

    let cameraInstance: any;
    let handsInstance: any;

    const init = async () => {
      await loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js');
      await loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js');
      await loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js');

      const Hands = (window as any).Hands;
      const Camera = (window as any).Camera;
      const drawConnectors = (window as any).drawConnectors;
      const drawLandmarks = (window as any).drawLandmarks;

      if (!Hands || !Camera || !drawConnectors || !drawLandmarks) {
        console.error('MediaPipe não foi carregado corretamente.');
        return;
      }

      const videoElement = videoRef.current!;
      const canvasElement = canvasRef.current!;
      const canvasCtx = canvasElement.getContext('2d');
      if (!canvasCtx) return;

      handsInstance = new Hands({
        locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      });

      handsInstance.setOptions({
        selfieMode: true,
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.65,
        minTrackingConfidence: 0.65,
      });

      handsInstance.onResults((results: any) => {
        canvasElement.width = videoElement.videoWidth;
        canvasElement.height = videoElement.videoHeight;

        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

        if (results.multiHandLandmarks) {
          // Conexões de mão do MediaPipe
          const HAND_CONNECTIONS = [
            [0, 1], [1, 2], [2, 3], [3, 4],
            [0, 5], [5, 6], [6, 7], [7, 8],
            [5, 9], [9, 10], [10, 11], [11, 12],
            [9, 13], [13, 14], [14, 15], [15, 16],
            [13, 17], [0, 17], [17, 18], [18, 19], [19, 20],
          ];

          for (const landmarks of results.multiHandLandmarks) {
            // Desenhar linhas azuis entre os pontos
            canvasCtx.strokeStyle = '#3b82f6';
            canvasCtx.lineWidth = 2;
            for (const [start, end] of HAND_CONNECTIONS) {
              const startLandmark = landmarks[start];
              const endLandmark = landmarks[end];
              if (startLandmark && endLandmark) {
                const x1 = startLandmark.x * canvasElement.width;
                const y1 = startLandmark.y * canvasElement.height;
                const x2 = endLandmark.x * canvasElement.width;
                const y2 = endLandmark.y * canvasElement.height;
                canvasCtx.beginPath();
                canvasCtx.moveTo(x1, y1);
                canvasCtx.lineTo(x2, y2);
                canvasCtx.stroke();
              }
            }

            // Desenhar pontos roxos
            canvasCtx.fillStyle = '#a855f7';
            canvasCtx.strokeStyle = '#a855f7';
            for (const landmark of landmarks) {
              const x = landmark.x * canvasElement.width;
              const y = landmark.y * canvasElement.height;
              canvasCtx.beginPath();
              canvasCtx.arc(x, y, 3, 0, Math.PI * 2);
              canvasCtx.fill();
            }
          }
        }

        canvasCtx.restore();
        onResults?.(results);
      });

      cameraInstance = new Camera(videoElement, {
        onFrame: async () => {
          await handsInstance.send({ image: videoElement });
        },
        width: 640,
        height: 480,
      });

      cameraInstance.start();
    };

    init().catch((error) => console.error('Erro inicializando MediaPipe:', error));

    return () => {
      cameraInstance?.stop?.();
      handsInstance?.close?.();
    };
  }, [onResults]);

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden bg-black">
      <video ref={videoRef} className="hidden" playsInline muted />
      <canvas ref={canvasRef} className="w-full h-full object-cover" />
    </div>
  );
}
