// App.jsx — Lines 1–200 (Part 1)

import React, { useRef, useEffect } from "react";
import {
  Sparkles,
  Lightbulb,
  AlignJustify,
  Clock,
  FlaskConical,
  Users,
  Home,
  GraduationCap,
  Building,
  Heart,
  Music,
  Hand,
  Mail,
  Phone,
} from "lucide-react";

import Card_1 from "./assets/Card_1.png";
import Card_2 from "./assets/Card_2.png";
import Card_4 from "./assets/Card_4.svg";
import Card_4a from "./assets/Card_4a.png";
import Card_5 from "./assets/Card_5.png";
import Card_7 from "./assets/Card_7.png";
import Card_8 from "./assets/Card_8.svg";
import Card_9 from "./assets/Card_9.png";
import Card_10 from "./assets/Card_10.png";
import Card_11 from "./assets/Card_11.png";
import Block_12 from "./assets/Block_12.png";

function Card({ children, className = "", style = {} }) {
  return (
    <div className={`bg-white rounded-lg ${className}`} style={style}>
      {children}
    </div>
  );
}

function CardContent({ children, className = "" }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

function Button({ children, onClick, className = "", style = {} }) {
  return (
    <button
      onClick={onClick}
      className={`bg-green-700 text-white px-6 py-3 rounded-lg text-xl hover:bg-green-800 transition-colors ${className}`}
      style={style}
    >
      {children}
    </button>
  );
}

function PuzzleDiagramIcon() {
  return (
    <svg
      className="text-[#438951]"
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      viewBox="0 0 200 200"
      fill="none"
    >
      <g stroke="currentColor" strokeWidth="10">
        <path d="M10 10h80v80H10z" />
        <path d="M110 10h80v80h-80z" />
        <path d="M10 110h80v80H10z" />
        <g transform="translate(10, 10)">
          <path d="M100 100h80v80h-80z" />
        </g>
      </g>
    </svg>
  );
}

function CircleIcon({ icon: Icon }) {
  return (
    <div
      className="w-36 h-36 rounded-full flex items-center justify-center"
      style={{
        border: "6px solid #438951",
        backgroundColor: "#FAFFFA",
      }}
    >
      <Icon size={40} color="#438951" />
    </div>
  );
}

function Testimonial({ quote, author }) {
  return (
    <blockquote className="relative border-t-[8px] border-[#438951] border-r border-b border-l border-gray-200 bg-white p-6 rounded-lg shadow-md">
      <div className="absolute -top-6 left-4 w-12 h-12 bg-white border border-[#438951] rounded-full flex items-center justify-center font-fraunces text-xl">
        <table className="text-[#438951] font-fraunces text-center leading-tight">
          <tbody>
            <tr><td>66</td></tr>
            <tr><td>99</td></tr>
          </tbody>
        </table>
      </div>
      <p className="text-lg italic text-[#405449] mb-2">{quote}</p>
      <footer className="text-sm font-bold text-[#438951]">{author}</footer>
    </blockquote>
  );
}

const circlesData = [
  { icon: Lightbulb, text: "Approche adaptée" },
  { icon: AlignJustify, text: "Personna-\nlisation" },
  { icon: Clock, text: "Respect du rythme" },
  { icon: FlaskConical, text: "Espace\nd'expéri-\nmentation" },
  { icon: Users, text: "Inclusion des parents" },
];
// App.jsx — Lines 96–200 (Part 2)

// Continuing Helper Components and Cards

// Cards 3 and 3a
<>
  // App.jsx — Lines 96–200 (Part 2)
  // Continuing Helper Components and Cards
  // Cards 3 and 3a
  <section id="impossible-choice-section" className="w-full mb-10">
    <Card className="p-6 custom-shadow w-full min-h-[200px]" style={{ backgroundColor: '#FAFFFA' }}>
      <CardContent>
        <h2 className="text-4xl font-extrabold mb-8 text-left">Le choix impossible des parents</h2>
        <div className="flex flex-col md:flex-row items-stretch gap-6">
          <Card className="rounded-2xl p-4 flex-1 min-h-[120px]" style={{ backgroundColor: '#FAFFFA', border: '1px solid #D1D5DB' }}>
            <CardContent>
              <h3 className="text-xl font-extrabold mb-2">École classique</h3>
              <p>Souvent rigide et peu adaptée aux besoins spécifiques des enfants atypiques.</p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl p-4 flex-1 min-h-[120px]" style={{ backgroundColor: '#FAFFFA', border: '1px solid #D1D5DB' }}>
            <CardContent>
              <h3 className="text-xl font-extrabold mb-2">Structures spécialisées</h3>
              <p>Orientation vers des institutions, parfois jusqu'à la fin de vie.</p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl p-4 flex-1 min-h-[120px]" style={{ backgroundColor: '#FAFFFA', border: '1px solid #D1D5DB' }}>
            <CardContent>
              <h3 className="text-xl font-extrabold mb-2">La 3ème voie</h3>
              <p>Un espace à créer, plus humain, plus souple, plus libre et respectueux du rythme de chaque enfant.</p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  </section><>
    <section id="third-way-principles" className="w-full mb-10 p-6 md:p-10 rounded-2xl custom-shadow" style={{ backgroundColor: '#438951' }}>
      <h2 className="text-4xl font-extrabold mb-8 text-white">La 3e Voie</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <div className="p-6 rounded-2xl min-h-[150px]" style={{ backgroundColor: '#559E60', border: '1px solid #ffffff' }}>
          <h3 className="text-xl font-extrabold mb-2 text-white">Entre deux extrêmes</h3>
          <p className="text-white">Une alternative entre l'école classique rigide et l'exclusion vers des structures spécialisées.</p>
        </div>
        <div className="p-6 rounded-2xl min-h-[150px]" style={{ backgroundColor: '#559E60', border: '1px solid #ffffff' }}>
          <h3 className="text-xl font-extrabold mb-2 text-white">Personnalisée</h3>
          <p className="text-white">Adaptée au rythme unique de chaque enfant, respectueuse de ses besoins spécifiques.</p>
        </div>
        <div className="p-6 rounded-2xl min-h-[150px]" style={{ backgroundColor: '#559E60', border: '1px solid #ffffff' }}>
          <h3 className="text-xl font-extrabold mb-2 text-white">Inclusive</h3>
          <p className="text-white">Les parents sont pleinement intégrés dans le processus éducatif de leur enfant.</p>
        </div>
      </div>
    </section>
  </>
  // Cards 4, 4a, 5 (Principles)
  <section id="principles-diagram" className="w-full mb-10">
    <Card className="rounded-2xl p-6 custom-shadow w-full flex flex-col" style={{ backgroundColor: '#FAFFFA' }}>
      <h2 className="text-4xl font-extrabold mb-8 text-left">Les principes de la 3ème voie</h2>

      <div className="flex justify-center items-center my-8 md:my-0">
        <img
          src={Card_4}
          alt="Infographie verte avec cinq cercles reliés par des flèches. Chaque cercle contient une icône et un texte."
          className="block w-full h-auto max-w-full max-h-full"
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/C1EBE2/3B4540?text=Diagramme+des+principes"; } } />
      </div>

      <p className="mt-8 text-left text-lg" style={{ color: '#405449' }}>
        Un espace où la différence est une richesse, pas un défaut.
      </p>
    </Card>
  </section>
  // Cards 5, 6, 7 (Learning Approach)
  <section id="learning-approach" className="w-full mb-10">
    <Card className="p-6 custom-shadow w-full" style={{ backgroundColor: '#FAFFFA' }}>
      <CardContent className="flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2">
          <h2 className="text-4xl font-extrabold mb-8 text-left">Un apprentissage serein et épanouissant</h2>
          <div className="grid grid-cols-1 gap-8">
            <div>
              <h3 className="text-2xl font-extrabold mb-4">Rythme de l'enfant</h3>
              <p className="mb-4">
                Chaque enfant est unique. L'approche respecte son rythme naturel d'apprentissage, sans pression ni comparaison.
              </p>
              <h3 className="text-2xl font-extrabold mb-4">Pédagogie active</h3>
              <p>
                L'enfant est acteur de ses découvertes. Les activités sont conçues pour stimuler sa curiosité et son autonomie.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-extrabold mb-4">Environnement bienveillant</h3>
              <p className="mb-4">
                Un cadre sécurisant et stimulant où l'enfant se sent libre d'explorer, d'expérimenter et de s'exprimer.
              </p>
              <h3 className="text-2xl font-extrabold mb-4">Développement global</h3>
              <p>
                L'accent est mis sur toutes les facettes du développement : cognitive, émotionnelle, sociale et physique.
              </p>
            </div>
          </div>
        </div>
        <div className="md:w-1/2">
          <img
            src={Card_7}
            alt="Matériel éducatif avec supports visuels, outils sensoriels et cartes adaptées aux besoins spécifiques"
            title="Matériel éducatif avec supports visuels, outils sensoriels et cartes adaptées aux besoins spécifiques"
            className="block w-full h-auto max-w-full max-h-full rounded-lg"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/C1EBE2/3B4540?text=Learning+Materials"; } } />
        </div>
      </CardContent>
    </Card>
  </section><section id="my-role-section" className="w-full mb-10">
    <Card className="p-6 custom-shadow w-full" style={{ backgroundColor: '#FAFFFA' }}>
      <CardContent className="flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2">
          <img
            src={Card_5}
            alt="Consultante éducative accompagnant parents et enfant dans un cadre bienveillant"
            title="Consultante éducative accompagnant parents et enfant dans un cadre bienveillant"
            className="block w-full h-auto max-w-full max-h-full rounded-lg"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/C1EBE2/3B4540?text=Mon+Role"; } } />
        </div>
        <div className="md:w-1/2 text-left">
          <h2 className="text-4xl font-extrabold mb-8">Mon rôle : Accompagner, Soutenir, Guider</h2>
          <p className="mb-4">
            En tant qu'éducatrice spécialisée dans la 3ème voie, mon rôle est de créer un environnement où votre enfant peut s'épanouir pleinement.
          </p>
          <p className="mb-4">
            Je suis là pour observer, comprendre et adapter les outils pédagogiques aux besoins uniques de chaque enfant.
          </p>
          <p>
            Mon objectif est de révéler le potentiel de votre enfant et de vous donner les clés pour l'accompagner au quotidien.
          </p>
        </div>
      </CardContent>
    </Card>
  </section><section id="who-i-accompany" className="w-full mb-10">
    <Card className="p-6 custom-shadow w-full min-h-[200px]" style={{ backgroundColor: '#FAFFFA' }}>
      <CardContent>
        <h2 className="text-4xl font-extrabold mb-8 text-left">Qui j'accompagne?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-extrabold mb-4">Enfants atypiques</h3>
            <ul className="list-disc list-inside mb-4">
              <li>Hypersensibles</li>
              <li>Précoces</li>
              <li>TDHA</li>
              <li>Dys- (dyslexie, dyspraxie, etc.)</li>
              <li>Avec des troubles du spectre autistique (TSA)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-extrabold mb-4">Parents en quête de sens</h3>
            <p className="mb-4">
              Qui cherchent une alternative à l'école classique pour leurs enfants.
            </p>
            <p>
              Qui veulent comprendre et soutenir le développement unique de leur enfant.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  </section>
  // Cards 8, 9, 10, 11 (Services and Pillars)
  <section id="my-services-section" className="w-full mb-10">
    <Card className="p-6 custom-shadow w-full" style={{ backgroundColor: '#FAFFFA' }}>
      <CardContent>
        <h2 className="text-4xl font-extrabold mb-8 text-left">Mes services</h2>
        <div className="flex justify-center items-center mb-8">
          <img
            src={Card_8}
            alt="Schéma en fleur à cinq pétales avec symboles : horloge, puzzle, main, cœur et toque de diplômé"
            title="Schéma en fleur à cinq pétales avec symboles : horloge, puzzle, main, cœur et toque de diplômé"
            className="block w-full h-auto max-w-full max-h-full rounded-lg"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/C1EBE2/3B4540?text=Services+Illustration"; } } />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center text-center">
            <GraduationCap size={48} color="#438951" className="mb-4" />
            <h3 className="text-2xl font-extrabold mb-2">Accompagnement individuel</h3>
            <p>
              Séances personnalisées pour votre enfant, adaptées à ses besoins spécifiques et à son rythme.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Users size={48} color="#438951" className="mb-4" />
            <h3 className="text-2xl font-extrabold mb-2">Ateliers Parents-Enfants</h3>
            <p>
              Des moments privilégiés pour renforcer les liens et apprendre ensemble des outils concrets.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Building size={48} color="#438951" className="mb-4" />
            <h3 className="text-2xl font-extrabold mb-2">Formations pour professionnels</h3>
            <p>
              Des modules pour les éducateurs et enseignants souhaitant intégrer la 3ème voie dans leur pratique.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Sparkles size={48} color="#438951" className="mb-4" />
            <h3 className="text-2xl font-extrabold mb-2">Conseil et orientation</h3>
            <p>
              Aide à trouver les ressources adaptées et à naviguer dans le système éducatif.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  </section><section id="five-pillars-section" className="w-full mb-10">
    <Card className="p-6 custom-shadow w-full" style={{ backgroundColor: '#FAFFFA' }}>
      <CardContent className="flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2">
          <h2 className="text-4xl font-extrabold mb-8 text-left">Les 5 piliers de la 3ème voie</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl font-bold text-[#438951]">1.</span>
              <div>
                <h3 className="text-xl font-extrabold mb-1">Individualisation</h3>
                <p className="text-sm">Un parcours unique pour chaque enfant.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl font-bold text-[#438951]">2.</span>
              <div>
                <h3 className="text-xl font-extrabold mb-1">Co-construction</h3>
                <p className="text-sm">Parents et éducateurs travaillent main dans la main.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl font-bold text-[#438951]">3.</span>
              <div>
                <h3 className="text-xl font-extrabold mb-1">Bienveillance</h3>
                <p className="text-sm">Un environnement sécurisant et respectueux.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl font-bold text-[#438951]">4.</span>
              <div>
                <h3 className="text-xl font-extrabold mb-1">Autonomie</h3>
                <p className="text-sm">Développer la capacité de l'enfant à apprendre par lui-même.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl font-bold text-[#438951]">5.</span>
              <div>
                <h3 className="text-xl font-extrabold mb-1">Connexion à la nature</h3>
                <p className="text-sm">Apprendre en contact avec l'environnement.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/2">
          <img
            src={Card_9}
            alt="Parents et enfant souriant dans un environnement éducatif bienveillant"
            title="Parents et enfant souriant dans un environnement éducatif bienveillant"
            className="block w-full h-auto max-w-full max-h-full rounded-lg"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/C1EBE2/3B4540?text=5+Piliers"; } } />
        </div>
      </CardContent>
    </Card>
  </section><section id="testimonials-section" className="w-full mb-10">
    <Card className="p-6 custom-shadow w-full min-h-[200px]" style={{ backgroundColor: '#FAFFFA' }}>
      <CardContent>
        <h2 className="text-4xl font-extrabold mb-8 text-left">Ce qu'ils disent de la 3ème voie</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Testimonial
            quote="Grâce à Marie, notre fils a retrouvé le plaisir d'apprendre. Son approche personnalisée a fait toute la différence."
            author="— Sarah et Marc, parents de Léo" />
          <Testimonial
            quote="Je n'aurais jamais cru qu'une telle alternative existait. La 3ème voie a changé notre vie de famille."
            author="— Émilie, maman de Chloé" />
          <Testimonial
            quote="Marie a su voir le potentiel de notre fille là où l'école ne voyait que des difficultés. Un immense merci !"
            author="— David, papa de Mia" />
          <Testimonial
            quote="Une bouffée d'air frais pour l'éducation. Les ateliers sont incroyablement enrichissants pour les enfants et les parents."
            author="— Sophie, maman de Tom" />
        </div>
      </CardContent>
    </Card>
  </section>
  // App.jsx — Lines 401–500 (Part 5)
  // Card 10 - Contact Section
  <section id="contact-section" className="w-full mb-10">
    <Card className="p-6 custom-shadow w-full min-h-[200px]" style={{ backgroundColor: '#FAFFFA' }}>
      <CardContent className="flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2">
          <h2 className="text-4xl font-extrabold mb-8 text-left">Contactez-moi</h2>
          <p className="mb-6">
            Prêt(e) à explorer la 3ème voie pour votre enfant? N'hésitez pas à me contacter.
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Mail size={24} color="#438951" />
              <a href="mailto:contact@la3emevoie.com" className="text-[#405449] hover:text-[#438951] transition-colors">contact@la3emevoie.com</a>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={24} color="#438951" />
              <a href="tel:+33612345678" className="text-[#405449] hover:text-[#438951] transition-colors">+33 6 12 34 56 78</a>
            </div>
            <div className="flex items-center gap-3">
              <Home size={24} color="#438951" />
              <p className="text-[#405449]">123 Rue de l'Éducation, 75001 Paris, France</p>
            </div>
          </div>
          <Button className="mt-8" onClick={() => alert('Formulaire de contact à venir!')}>
            Envoyer un message
          </Button>
        </div>
        <div className="md:w-1/2">
          <img
            src={Card_10}
            alt="Espace de consultation chaleureux avec supports éducatifs et éléments naturels"
            title="Espace de consultation chaleureux avec supports éducatifs et éléments naturels"
            className="block w-full h-auto max-w-full max-h-full rounded-lg"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/C1EBE2/3B4540?text=Contact+Image"; } } />
        </div>
      </CardContent>
    </Card>
  </section></>

{/* Card 11 - Free Resources Section */}
<section id="free-resources-section" className="w-full mb-10">
  <Card className="p-6 custom-shadow w-full min-h-[200px]" style={{ backgroundColor: '#FAFFFA' }}>
    <CardContent>
      <h2 className="text-4xl font-extrabold mb-8 text-left">Ressources gratuites</h2>
      <p className="mb-6">
        Découvrez des guides, articles et outils pour vous accompagner dans la 3ème voie éducative.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 rounded-lg border border-gray-200 min-h-[180px]">
          <h3 className="text-xl font-extrabold mb-2">Guide "Comprendre l'enfant atypique"</h3>
          <p className="text-sm mb-3">
            Un guide complet pour décrypter les particularités de votre enfant.
          </p>
          <img
            src={Card_11}
            alt="Couverture colorée d’un e-book éducatif pour enfants à besoins particuliers"
            title="Couverture colorée d’un e-book éducatif pour enfants à besoins particuliers"
            className="block w-full h-auto max-w-full max-h-full rounded-lg my-4"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/300x200/C1EBE2/3B4540?text=E-book+Cover"; }}
          />
          <Button className="px-4 py-2 text-sm" onClick={() => alert('Téléchargement du guide !')}>
            Télécharger
          </Button>
        </div>
        <div className="p-4 rounded-lg border border-gray-200 min-h-[180px]">
  <h3 className="text-xl font-extrabold mb-2">Webinaire "Les clés de l'épanouissement"</h3>
  <p className="text-sm mb-3">
    Inscrivez-vous à notre prochain webinaire gratuit.
  </p>
  <img
  src={Block_12}
  alt="Avant de faire dodo — version trilingue illustrée pour enfants"
  title="Avant de faire"
    className="block w-full h-auto max-w-full max-h-full rounded-lg my-4"
    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/300x200/C1EBE2/3B4540?text=Webinaire+Cover"; }}
  />
  <Button className="px-4 py-2 text-sm" onClick={() => alert('Inscription au webinaire !')}>
    S'inscrire
  </Button>
</div>
      </div>
    </CardContent>
  </Card>
</section>

{/* Card 12 - Capsules Banner */}
<section id="capsules-banner" className="w-full mb-10">
  <Card className="p-6 custom-shadow w-full text-center min-h-[150px]" style={{ backgroundColor: '#C1EBE2' }}>
    <CardContent>
      <h2 className="text-4xl font-extrabold mb-4" style={{ color: '#3B4540' }}>Découvrez nos capsules éducatives !</h2>
      <p className="text-lg mb-6" style={{ color: '#405449' }}>
        Des mini-formations pour approfondir des sujets spécifiques.
      </p>
      <Button onClick={() => alert('Accès aux capsules !')}>
        Explorer les capsules
      </Button>
    </CardContent>
  </Card>
</section>
// App.jsx — Lines 544–600 (Part 6)

<>
  {/* Card 11: Ressources Gratuites Section */}
  <section id="free-resources-section" className="w-full mb-10">
    <Card className="p-6 custom-shadow w-full min-h-[200px]" style={{ backgroundColor: '#FAFFFA' }}>
      <CardContent>
        <h2 className="text-4xl font-extrabold mb-8 text-left">Ressources gratuites</h2>
        <p className="mb-6">
          Découvrez des guides, articles et outils pour vous accompagner dans la 3ème voie éducative.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-lg border border-gray-200 min-h-[180px]">
            <h3 className="text-xl font-extrabold mb-2">Guide "Comprendre l'enfant atypique"</h3>
            <p className="text-sm mb-3">
              Un guide complet pour décrypter les particularités de votre enfant.
            </p>
            <img
              src={Card_11}
              alt="Couverture colorée d’un e-book éducatif pour enfants à besoins particuliers"
              title="Couverture colorée d’un e-book éducatif pour enfants à besoins particuliers"
              className="block w-full h-auto max-w-full max-h-full rounded-lg my-4"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/300x200/C1EBE2/3B4540?text=E-book+Cover"; }}
            />
            <Button className="px-4 py-2 text-sm" onClick={() => alert('Téléchargement du guide !')}>
              Télécharger
            </Button>
          </div>
          <div className="p-4 rounded-lg border border-gray-200 min-h-[180px]">
  <h3 className="text-xl font-extrabold mb-2">Webinaire "Les clés de l'épanouissement"</h3>
  <p className="text-sm mb-3">
    Inscrivez-vous à notre prochain webinaire gratuit.
  </p>
  <img
    src={Block_12}
    alt="Avant de faire dodo — version trilingue illustrée pour enfants"
    title="Avant de faire dodo — version trilingue illustrée pour enfants"
    className="block w-full h-auto max-w-full max-h-full rounded-lg my-4"
    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/300x200/C1EBE2/3B4540?text=Webinaire+Cover"; }}
  />
  <Button className="px-4 py-2 text-sm" onClick={() => alert('Inscription au webinaire !')}>
    S'inscrire
  </Button>
</div>
        </div>
      </CardContent>
    </Card>
  </section>

  {/* Card 12 - Capsules Banner */}
  <section id="capsules-banner" className="w-full mb-10">
    <Card className="p-6 custom-shadow w-full text-center min-h-[150px]" style={{ backgroundColor: '#C1EBE2' }}>
      <CardContent>
        <h2 className="text-4xl font-extrabold mb-4" style={{ color: '#3B4540' }}>Découvrez nos capsules éducatives !</h2>
        <p className="text-lg mb-6" style={{ color: '#405449' }}>
          Des mini-formations pour approfondir des sujets spécifiques.
        </p>
        <Button onClick={() => alert('Accès aux capsules !')}>
          Explorer les capsules
        </Button>
      </CardContent>
    </Card>
  </section>
</>