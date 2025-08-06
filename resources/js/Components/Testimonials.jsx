import '../../css/Testimonials.css';
import avatar1 from '../assets/avatar.jpg'; 
import avatar2 from '../assets/avatar.jpg';
import avatar3 from '../assets/avatar.jpg';
import avatar4 from '../assets/avatar.jpg';
import avatar5 from '../assets/avatar.jpg';
import avatar6 from '../assets/avatar.jpg';

const testimonials = [
  { name: "Jean-Pierre Dubois", text: "Grâce à ce stage, j'ai décroché mon premier emploi.", img: avatar1 },
  { name: "Sophie Martin", text: "Une plateforme incroyable pour trouver des opportunités.", img: avatar2 },
  { name: "Luc Tremblay", text: "J'ai acquis des compétences essentielles pour ma carrière.", img: avatar3 },
  { name: "Chloé Bernard", text: "Le site est facile à utiliser et très bien organisé.", img: avatar4 },
  { name: "Antoine Roy", text: "Je recommande vivement cette plateforme à tous les étudiants.", img: avatar5 },
  { name: "Isabelle Gagnon", text: "Un service exceptionnel qui m’a aidé à trouver le stage parfait.", img: avatar6 },
];

export default function Testimonials() {
  return (
    <section className="testimonials">
      <h2>Témoignages</h2>
      <div className="testimonials-grid">
        {testimonials.map((t, index) => (
          <div key={index} className="testimonial-card">
            <p>{t.text}</p>
            <img src={t.img} alt={t.name} />
            <strong>{t.name}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
