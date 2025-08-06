import '../../css/Hero.css';
import { Button } from 'primereact/button';

export default function Hero() {
  return (
    <section className="hero-container">
      <video className="hero-video" autoPlay loop muted playsInline>
        <source src="/video/hero.mp4" type="video/mp4" />
        Votre navigateur ne supporte pas la vidéo HTML5.
      </video>
      <div className="hero-overlay">
        <h1 className="hero-title">Stages</h1>
        <p className="hero-subtitle">Votre avenir commence ici avec StageConnect.</p>
      </div>
    </section>
  );
}
