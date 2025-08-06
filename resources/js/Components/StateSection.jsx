import '../../css/StateSection.css';

export default function StatsSection({ stats }) {
  return (
    <section className="stats-section">
      <div className="stat">
        <h3>{stats.companies}</h3>
        <p>Entreprises partenaires</p>
      </div>
      <div className="stat">
        <h3>{stats.offers}</h3>
        <p>Offres de stage disponibles</p>
      </div>
      <div className="stat">
        <h3>{stats.sectors}</h3>
        <p>Secteurs variés</p>
      </div>
    </section>
  );
}


