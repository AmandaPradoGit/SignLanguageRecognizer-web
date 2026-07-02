import GeometricBackground from "@/components/landing/GeometricBackground";
import LevelsContainer from "@/components/levels/conteiner";

export default function LevelsPage() {
  return (
    <main className="relative min-h-screen">
      <GeometricBackground/>
      <div className="relative z-10 pt-12 px-4">
        <h1 className="text-5xl font-bold text-white text-center drop-shadow-lg mb-4">
          Níveis
        </h1>
        <p className="text-center text-gray-200 text-lg mb-12 drop-shadow-md max-w-2xl mx-auto">
          Bem-vindo à página de níveis do Sign Language Recognizer. Escolha seu nível e comece a aprender!
        </p>
        <LevelsContainer />
      </div>
    </main>
  );
}
