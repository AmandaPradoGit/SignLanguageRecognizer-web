export default function GeometricBackground() {
  return (
    <div className="fixed inset-0 bg-black overflow-hidden z-0">
      <div className="absolute top-10 left-10 w-20 h-20 bg-pink-400 transform rotate-45 opacity-80"></div>
      <div className="absolute top-20 right-20 w-16 h-16 bg-yellow-400 rounded-full opacity-80"></div>
      <div className="absolute top-40 left-1/3 w-12 h-12 bg-blue-500 opacity-80"></div>
      <div className="absolute top-60 right-1/4 w-24 h-24 bg-orange-400 transform rotate-12 opacity-80"></div>
      <div className="absolute bottom-20 left-20 w-18 h-18 bg-purple-400 rounded-full opacity-80"></div>
      <div className="absolute bottom-40 right-10 w-20 h-20 bg-green-400 transform -rotate-12 opacity-80"></div>
      <div className="absolute top-1/4 left-1/2 text-pink-500 text-2xl">✦</div>
      <div className="absolute top-1/2 right-1/4 text-blue-500 text-xl">✦</div>
      <div className="absolute bottom-1/4 left-1/4 text-yellow-500 text-xl">✦</div>
      <div className="absolute bottom-1/3 right-1/3 text-orange-500 text-2xl">✦</div>
    </div>
  );
}
