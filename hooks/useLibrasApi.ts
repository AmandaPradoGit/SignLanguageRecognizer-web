import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export interface PreverLibrasResponse {
  predicao?: string;
  erro?: string;
}

export const preverLibras = async (landmarks: number[]): Promise<PreverLibrasResponse> => {
  if (!Array.isArray(landmarks) || landmarks.length !== 63) {
    throw new Error('O array de landmarks deve conter 63 valores.');
  }

  const response = await axios.post<PreverLibrasResponse>(
    `${API_BASE_URL}/prever`,
    { landmarks },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
};
