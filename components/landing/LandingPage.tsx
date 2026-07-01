import GeometricBackground from './GeometricBackground'
import HeroSection from './HeroSection'

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <GeometricBackground />
      <div className="relative z-10">
        <HeroSection />
      </div>
    </div>
  );
}
