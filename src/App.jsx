import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles, Lightbulb, AlignJustify, Clock, FlaskConical, Users, Home,
  GraduationCap, Building, Heart, Music, Hand, Mail, Phone,
  Film, List, X, Play, LogOut, User
} from 'lucide-react';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [presentMode, setPresentMode] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [readSlides, setReadSlides] = useState([]);

  // Sidebar widths and content padding
  const WIDTH_1_INCH = 96;
  const WIDTH_2_INCH = 192;
  const PADDING_INCH_HALF = 48;
  const CLOSED_SIDEBAR_PADDING = 100;
  const [sidebarWidth, setSidebarWidth] = useState(WIDTH_1_INCH);

  // Refs for cards and main content
  const cardRefs = useRef([]);
  const mainContentRef = useRef(null);
  const presentationContainerRef = useRef(null);

  // Menu visibility in presentation mode
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isBottomBarVisible, setIsBottomBarVisible] = useState(false);

  // Effect to scroll to active card
  useEffect(() => {
    if (cardRefs.current[activeIndex]) {
      cardRefs.current[activeIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [activeIndex]);

  // Effect to manage main content padding
  useEffect(() => {
    if (mainContentRef.current) {
      let newPaddingLeft = CLOSED_SIDEBAR_PADDING;
      if (sidebarOpen) {
        newPaddingLeft = sidebarWidth + PADDING_INCH_HALF;
      }
      mainContentRef.current.style.paddingLeft = `${newPaddingLeft}px`;
    }
  }, [sidebarOpen, sidebarWidth]);

  // Presentation mode effects
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (presentMode && event.key === 'Escape') {
        setPresentMode(false);
      }
    };

    const handleMouseMove = (event) => {
      if (presentMode) {
        setIsMenuVisible(event.clientY < 100);
        setIsBottomBarVisible(window.innerHeight - event.clientY < 100);
      } else {
        setIsMenuVisible(false);
        setIsBottomBarVisible(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [presentMode]);

  // Update read slides
  useEffect(() => {
    if (activeIndex !== null && !readSlides.includes(activeIndex)) {
      setReadSlides(prev => [...prev, activeIndex]);
    }
  }, [activeIndex]);

  // Toggle sidebar width
  const toggleResize = () => {
    setSidebarWidth(prevWidth => prevWidth === WIDTH_1_INCH ? WIDTH_2_INCH : WIDTH_1_INCH);
  };

  const handlePresentClick = () => {
    setPresentMode(prev => !prev);
    if (!presentMode) {
      setReadSlides([]);
      setActiveIndex(0);
    }
  };

  // Reusable components
  const Card = ({ children, className = "", style = {} }) => (
    <div className={`bg-white ${className}`} style={style}>
      {children}
    </div>
  );

  const CardContent = ({ children, className = "p-4" }) => (
    <div className={className}>
      {children}
    </div>
  );

  const Button = ({ children, className = "", style = {}, onClick, ...props }) => (
    <button 
      className={`bg-green-700 text-white px-6 py-3 rounded-lg text-xl hover:bg-green-800 transition-colors ${className}`} 
      style={style}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );

  const Testimonial = ({ quote, author }) => (
    <div className="relative border-t-8 border-l-2 border-r-2 border-b-2 border-gray-300 p-6 mt-8 bg-white" 
         style={{ borderTopColor: '#438951' }}>
      <div className="absolute -top-4 left-4 w-8 h-8 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center transform">
        <div className="grid grid-cols-2 gap-0 text-xs font-fraunces font-bold text-gray-600">
          <span style={{ lineHeight: '0.8', textAlign: 'left' }}>66</span>
          <span style={{ lineHeight: '0.8', textAlign: 'right' }}>99</span>
        </div>
      </div>
      <blockquote className="text-lg italic font-nobile" style={{ color: '#405449' }}>
        "{quote}"
      </blockquote>
      <cite className="block text-right mt-4 font-fraunces font-bold" style={{ color: '#3B4540' }}>
        – {author}
      </cite>
    </div>
  );

  // Data arrays
  const slides = [
    {
      title: "La 3ème Voie Éducative",
      thumbnail: '/assets/images/Card_1.png',
      alt: "Enfant et adulte assis dans un espace d'apprentissage lumineux et coloré"
    },
    {
      title: "Qui suis-je?",
      thumbnail: '/assets/images/Card_2.png',
      alt: "Éducatrice bienveillante avec enfants dans un cadre d'éducation alternative"
    },
    {
      title: "Le choix impossible des parents",
      thumbnail: null,
      alt: "Trois options éducatives"
    },
    {
      title: "La 3e Voie",
      thumbnail: null,
      alt: "Alternative éducative"
    },
    {
      title: "Les principes de la 3ème voie",
      thumbnail: '/assets/images/Card_4.svg',
      alt: "Cinq principes interconnectés"
    },
    {
      title: "Un apprentissage serein et personnalisé",
      thumbnail: '/assets/images/Card_4a.png',
      alt: "Environnement d'apprentissage calme"
    },
    {
      title: "Mon rôle aujourd'hui",
      thumbnail: '/assets/images/Card_5.png',
      alt: "Consultante en psychoéducation"
    },
    {
      title: "Qui j'accompagne",
      thumbnail: null,
      alt: "Différents groupes accompagnés"
    },
    {
      title: "Mes services",
      thumbnail: '/assets/images/Card_7.png',
      alt: "Services proposés"
    },
    {
      title: "Les 5 piliers de la 3ème voie éducative",
      thumbnail: '/assets/images/Card_8.svg',
      alt: "Schéma des cinq piliers"
    },
    {
      title: "Témoignages",
      thumbnail: '/assets/images/Card_9.png',
      alt: "Témoignages de parents"
    },
    {
      title: "Me contacter",
      thumbnail: '/assets/images/Card_10.png',
      alt: "Informations de contact"
    },
    {
      title: "Ressources gratuites",
      thumbnail: '/assets/images/Card_11.png',
      alt: "E-book gratuit"
    },
    {
      title: "Capsules pédagogiques",
      thumbnail: '/assets/images/Block_12.png',
      alt: "Ressources pédagogiques trilingues"
    }
  ];

  const testimonials = [
    { quote: "Marie a su regarder notre fils avec humanité et exigence. Elle l'a protégé, mais elle l'a aussi porté.", author: "Maman de Ryan, 5 ans" },
    { quote: "Une écoute rare, des idées concrètes, et surtout un espoir réaliste. Merci.", author: "Papa d'une enfant hypersensible" }
  ];

  const circlesData = [
    { icon: <Clock className="w-6 h-6" />, label: "Approche adaptée" },
    { icon: <FlaskConical className="w-6 h-6" />, label: "Personnalisation" },
    { icon: <Hand className="w-6 h-6" />, label: "Respect du rythme" },
    { icon: <Lightbulb className="w-6 h-6" />, label: "Espace d'expérimentation" },
    { icon: <Users className="w-6 h-6" />, label: "Inclusion des parents" }
  ];

  const whoIAccompany = [
    { icon: <Heart className="w-8 h-8" />, title: "Parents d'enfants atypiques", text: "TSA, HPI, hypersensibles et autres profils nécessitant une approche personnalisée." },
    { icon: <Home className="w-8 h-8" />, title: "Familles en IEF", text: "Instruction en famille en quête de structure ou de soutien pédagogique." },
    { icon: <GraduationCap className="w-8 h-8" />, title: "Professionnels de l'enfance", text: "Éducateurs et enseignants qui souhaitent sortir du cadre traditionnel." },
    { icon: <Building className="w-8 h-8" />, title: "Structures éducatives", text: "Écoles, associations et IME souhaitant enrichir leurs pratiques." }
  ];

  const services = [
    {
      title: "Coaching parental",
      items: [
        "Séances individuelles (visio ou présentiel)",
        "Compréhension des besoins de l'enfant",
        "Soutien émotionnel et stratégie éducative"
      ]
    },
    {
      title: "Capsules pédagogiques",
      items: [
        "Mini-formations vidéos/audio",
        "Documents pédagogiques ludiques",
        "Ressources personnalisées"
      ]
    },
    {
      title: "Écriture & recherche",
      items: [
        "Articles et outils pédagogiques",
        "Conférences et formations",
        "Ressources sur l'éducation inclusive"
      ]
    }
  ];

  const pillars = [
    { title: "Rythme singulier", desc: "Respect du tempo personnel de chaque enfant" },
    { title: "Adaptation pédagogique", desc: "Apprentissage accessible et vivant par le jeu et les sens" },
    { title: "Communication émotionnelle", desc: "Reconnaître et accueillir les émotions avant de corriger" },
    { title: "Environnement sensoriel", desc: "Espace doux, cohérent et rythmé pour aider à la concentration" },
    { title: "Implication des parents", desc: "Les parents comme premiers éducateurs, actifs et impliqués" }
  ];

  // Header component
  const Header = ({ presentMode, setPresentMode, isMenuVisible }) => {
    return (
      <div className={`fixed top-0 left-0 right-0 h-[56px] bg-white z-[60] flex items-center px-8 shadow-sm transition-transform duration-300 ${presentMode ? (isMenuVisible ? 'translate-y-0' : '-translate-y-full') : ''}`}>
        <h1 className="text-2xl font-bold font-fraunces text-[#3B4540]">La 3ème Voie</h1>
        <nav className="ml-auto flex items-center gap-4">
          <button
            className="flex items-center gap-1 px-4 py-2 rounded-lg bg-[#0B2E79] hover:bg-[#1A4590] transition-colors duration-200"
            onClick={() => setPresentMode(!presentMode)}
          >
            {presentMode ? (
              <LogOut className="w-5 h-5 stroke-white" />
            ) : (
              <Play className="w-5 h-5 fill-white" />
            )}
            <span className="font-nobile text-white">
              {presentMode ? "Exit" : "Present"}
            </span>
          </button>
          <div className="bg-white rounded-full p-2 border-2 border-transparent hover:border-[#6BA8F4] transition-colors duration-200 cursor-pointer">
            <User className="w-6 h-6 stroke-[#3B4540]" />
          </div>
        </nav>
      </div>
    );
  };

  // Presentation bottom bar
  const PresentationBottomBar = ({ slides, activeIndex, onSelect, isVisible, readSlides }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
      <div className={`fixed bottom-0 left-0 right-0 h-10 bg-transparent z-[70] flex items-center justify-center gap-1 transition-transform duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
        {slides.map((slide, index) => {
          let backgroundColor = '#D4E6FD';
          if (activeIndex === index) {
            backgroundColor = '#69B9FC';
          } else if (readSlides.includes(index)) {
            backgroundColor = '#70BCFB';
          }
          
          return (
            <div
              key={index}
              onClick={() => onSelect(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="h-4 w-10 cursor-pointer transition-colors duration-200"
              style={{ backgroundColor }}
            >
              {hoveredIndex === index && slide.thumbnail && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-[calc(100%+10px)] p-2 bg-white rounded-md shadow-lg pointer-events-none"
                  style={{ transform: `translateX(-50%) translateY(-10px)`}}
                >
                  <img src={slide.thumbnail} alt={slide.alt} className="w-32 h-auto" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // Render card content based on index
  const renderCardContent = (index) => {
    switch (index) {
      case 0: // Card 1 - Header/Hero
        return (
<div className="two-col equal overflow-hidden rounded-sides">
  <div className="col media">
    <img
      src="/assets/images/Card_1.png"
      alt="Enfant et adulte dans un espace d'apprentissage Montessori"
      className="rounded-left-only"
    />
  </div>
  <div className="col p-8 flex flex-col justify-center" style={{ backgroundColor: '#FAFFFA' }}>
    <h1 className="font-fraunces font-bold mb-4" style={{ color: '#3B4540', fontSize: '45px' }}>
      La 3ème Voie Éducative
    </h1>
    <p className="font-nobile text-lg" style={{ color: '#405449', fontSize: '18px' }}>
      Une approche humaine, vivante et libre pour les enfants atypiques et leurs familles.
    </p>
  </div>
</div>
        );

      case 1: // Card 2 - Qui suis-je?
        return (
<div className="two-col equal overflow-hidden rounded-sides" style={{ backgroundColor: '#FAFFFA' }}>
  <div className="col p-8 flex flex-col justify-center">
    <h2 className="text-3xl font-fraunces font-bold mb-4" style={{ color: '#3B4540' }}>
      Qui suis-je?
    </h2>
    <p className="text-lg font-nobile leading-relaxed" style={{ color: '#405449' }}>
      Je m'appelle Marie. Je suis enseignante, éducatrice, protectrice de parcours singuliers.
      Depuis des années, j'accompagne des enfants entre 3 et 6 ans - des enfants joyeux,
      silencieux, agités, oubliés, étiquetés... Des enfants qui ne rentrent pas dans le moule qu'on leur impose.
    </p>
  </div>
  <div className="col media">
    <img
      src="/assets/images/Card_2.png"
      alt="Éducatrice bienveillante avec enfants"
      className="rounded-right-only"
    />
  </div>
</div>
        );

      case 2: // Card 3 - Le choix impossible des parents
        return (
          <div className="p-8" style={{ backgroundColor: '#FAFFFA' }}>
            <h2 className="text-3xl font-fraunces font-bold mb-8 text-center" style={{ color: '#3B4540' }}>
              Le choix impossible des parents
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "École classique", text: "Souvent rigide et peu adaptée aux besoins spécifiques des enfants atypiques." },
                { title: "Structures spécialisées", text: "Orientation vers des institutions, parfois jusqu'à la fin de vie." },
                { title: "La 3ème voie", text: "Un espace à créer, plus humain, plus souple, plus libre et respectueux du rythme de chaque enfant." }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border-2" style={{ borderColor: '#4A644E' }}>
                  <h3 className="text-xl font-fraunces font-bold mb-4" style={{ color: '#3B4540' }}>
                    {item.title}
                  </h3>
                  <p className="font-nobile" style={{ color: '#405449' }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case 3: // Card 3a - La 3e Voie
        return (
          <div className="p-8" style={{ backgroundColor: '#438951' }}>
            <h2 className="text-3xl font-fraunces font-bold mb-8 text-white text-left">
              La 3e Voie
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Entre deux extrêmes", text: "Une alternative entre l'école classique rigide et l'exclusion vers des structures spécialisées." },
                { title: "Personnalisée", text: "Adaptée au rythme unique de chaque enfant, respectueuse de ses besoins spécifiques." },
                { title: "Inclusive", text: "Les parents sont pleinement intégrés dans le processus éducatif de leur enfant." }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl">
                  <h3 className="text-xl font-fraunces font-bold mb-4" style={{ color: '#3B4540' }}>
                    {item.title}
                  </h3>
                  <p className="font-nobile" style={{ color: '#405449' }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case 4: // Card 4 - Les principes de la 3ème voie
        return (
          <div className="p-8" style={{ backgroundColor: '#FAFFFA' }}>
            <h2 className="text-3xl font-fraunces font-bold mb-8 text-left" style={{ color: '#3B4540' }}>
              Les principes de la 3ème voie
            </h2>
            <div className="flex justify-center mb-8">
              <img 
                src="/assets/images/Card_4.svg" 
                alt="Cinq principes interconnectés"
                className="max-w-full h-auto"
              />
            </div>
            <div className="flex flex-wrap justify-center items-center gap-4 -ml-8">
              {circlesData.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-white mb-2" 
                       style={{ backgroundColor: '#438951' }}>
                    {item.icon}
                  </div>
                  <span className="text-sm font-nobile text-center" style={{ color: '#405449' }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-center text-lg font-nobile mt-8 italic" style={{ color: '#405449' }}>
              Un espace où la différence est une richesse, pas un défaut.
            </p>
          </div>
        );

      case 5: // Card 4a - Un apprentissage serein
        return (
          <div className="flex flex-col md:flex-row gap-8 p-8" style={{ backgroundColor: '#FAFFFA' }}>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-fraunces font-bold mb-4 text-left" style={{ color: '#3B4540' }}>
                Un apprentissage serein et personnalisé
              </h2>
              <p className="text-lg font-nobile leading-relaxed" style={{ color: '#405449' }}>
                Créer un environnement calme et stimulant est au cœur de notre démarche. Nous offrons 
                un espace où chaque enfant peut explorer, s'exprimer et apprendre à son propre rythme, 
                soutenu par une approche bienveillante et un accompagnement individualisé.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="h-64 rounded-2xl flex items-center justify-center text-xl font-nobile" 
                   style={{ backgroundColor: '#DEEEE1', color: '#405449' }}>
                Apprentissage Serein
              </div>
            </div>
          </div>
        );

      case 6: // Card 5 - Mon rôle aujourd'hui
        return (
<div className="two-col equal overflow-hidden rounded-sides" style={{ backgroundColor: '#FAFFFA' }}>
  <div className="col p-8 flex flex-col justify-center">
    <h2 className="text-3xl font-fraunces font-bold mb-4" style={{ color: '#3B4540' }}>
      Qui suis-je?
    </h2>
    <p className="text-lg font-nobile leading-relaxed" style={{ color: '#405449' }}>
      Je m'appelle Marie. Je suis enseignante, éducatrice, protectrice de parcours singuliers.
      Depuis des années, j'accompagne des enfants entre 3 et 6 ans - des enfants joyeux,
      silencieux, agités, oubliés, étiquetés... Des enfants qui ne rentrent pas dans le moule qu'on leur impose.
    </p>
  </div>
  <div className="col media">
    <img
      src="/assets/images/Card_2.png"
      alt="Éducatrice bienveillante avec enfants"
      className="rounded-right-only"
    />
  </div>
</div>
        );

      case 7: // Card 6 - Qui j'accompagne
        return (
          <div className="p-8" style={{ backgroundColor: '#FAFFFA' }}>
            <h2 className="text-3xl font-fraunces font-bold mb-8 text-left" style={{ color: '#3B4540' }}>
              Qui j'accompagne
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {whoIAccompany.map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl">
                  <div className="flex items-center mb-4">
                    <div style={{ color: '#438951' }}>
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-fraunces font-bold ml-3" style={{ color: '#3B4540' }}>
                      {item.title}
                    </h3>
                  </div>
                  <p className="font-nobile" style={{ color: '#405449' }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case 8: // Card 7 - Mes services
        return (
          <div className="flex flex-col-reverse md:flex-row gap-8 p-8" style={{ backgroundColor: '#FAFFFA' }}>
            <div className="md:w-2/3">
              <h2 className="text-3xl font-fraunces font-bold mb-8 text-left" style={{ color: '#3B4540' }}>
                Mes services
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {services.map((service, idx) => (
                  <div key={idx}>
                    <h3 className="text-xl font-fraunces font-bold mb-4" style={{ color: '#3B4540' }}>
                      {service.title}
                    </h3>
                    <ul className="space-y-2">
                      {service.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="font-nobile" style={{ color: '#405449' }}>
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:w-1/3">
              <img 
                src="/assets/images/Card_7.png" 
                alt="Services proposés"
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>
          </div>
        );

      case 9: // Card 8 - Les 5 piliers
        return (
          <div className="p-8" style={{ backgroundColor: '#FAFFFA' }}>
            <h2 className="text-3xl font-fraunces font-bold mb-8 text-left" style={{ color: '#3B4540' }}>
              Les 5 piliers de la 3ème voie éducative
            </h2>
            <div className="flex justify-center mb-8">
              <img 
                src="/assets/images/Card_8.svg" 
                alt="Schéma des cinq piliers"
                className="max-w-full h-auto"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pillars.map((pillar, idx) => (
                <div key={idx} className="text-center">
                  <h3 className="text-lg font-fraunces font-bold mb-2" style={{ color: '#3B4540' }}>
                    {pillar.title}
                  </h3>
                  <p className="text-sm font-nobile" style={{ color: '#405449' }}>
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case 10: // Card 9 - Témoignages
        return (
          <div className="flex flex-col md:flex-row gap-8 p-8" style={{ backgroundColor: '#FAFFFA' }}>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-fraunces font-bold mb-8 text-left" style={{ color: '#3B4540' }}>
                Témoignages
              </h2>
              <div className="space-y-6">
                {testimonials.map((testimonial, idx) => (
                  <Testimonial key={idx} quote={testimonial.quote} author={testimonial.author} />
                ))}
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/assets/images/Card_9.png" 
                alt="Témoignages de parents"
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>
          </div>
        );

      case 11: // Card 10 - Me contacter
        return (
          <div className="flex flex-col md:flex-row gap-8 p-8" style={{ backgroundColor: '#FAFFFA' }}>
            <div className="md:w-1/2">
              <img 
                src="/assets/images/Card_10.png" 
                alt="Informations de contact"
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-fraunces font-bold mb-8 text-left" style={{ color: '#3B4540' }}>
                Me contacter
              </h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl">
                  <div className="flex items-center mb-2">
                    <Mail className="w-5 h-5 mr-3" style={{ color: '#438951' }} />
                    <span className="font-nobile" style={{ color: '#405449' }}>marie@educ3voie.fr</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-3" style={{ color: '#438951' }} />
                    <span className="font-nobile" style={{ color: '#405449' }}>06 XX XX XX XX</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl">
                  <p className="font-nobile" style={{ color: '#405449' }}>
                    <strong>Disponibilité:</strong> À distance ou en région [Votre ville]
                  </p>
                </div>
                <p className="text-lg font-nobile text-center" style={{ color: '#405449' }}>
                  Construisons ensemble cette 3ème voie éducative, plus humaine, plus souple, plus libre.
                </p>
              </div>
            </div>
          </div>
        );

      case 12: // Card 11 - Ressources gratuites
        return (
          <div className="flex flex-col md:flex-row gap-8 p-8" style={{ backgroundColor: '#FAFFFA' }}>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-fraunces font-bold mb-8 text-left" style={{ color: '#3B4540' }}>
                Ressources gratuites
              </h2>
              <div className="bg-white p-6 rounded-2xl">
                <h3 className="text-xl font-fraunces font-bold mb-4" style={{ color: '#3B4540' }}>
                  E-book offert
                </h3>
                <p className="font-nobile mb-6" style={{ color: '#405449' }}>
                  "Les 5 piliers de la 3e voie éducative" - Guide pour parents d'enfants différents.
                </p>
                <Button className="w-full">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Télécharger
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/assets/images/Card_11.png" 
                alt="E-book gratuit"
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>
          </div>
        );

      case 13: // Block 12 - Banner
        return (
          <div 
            className="relative h-96 flex items-center justify-center"
            style={{
              backgroundImage: "url('/assets/images/Block_12.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div 
              className="absolute inset-0"
              style={{ 
                backgroundColor: 'rgba(59, 69, 64, 0.7)',
                backdropFilter: 'blur(1px)'
              }}
            ></div>
            <div className="relative z-10 text-center text-white p-8">
              <h2 className="text-4xl font-fraunces font-bold mb-6">
                Capsules pédagogiques
              </h2>
              <p className="text-xl font-nobile mb-8 max-w-2xl">
                Fiches trilingues (français, anglais, espagnol) pour routines quotidiennes, 
                gestion des émotions et apprentissages ludiques.
              </p>
              <Button className="bg-white text-green-700 hover:bg-gray-100">
                Découvrir les capsules
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className={`relative min-h-screen font-nobile transition-opacity duration-500 ease-in-out ${presentMode ? 'bg-white' : 'bg-[#DEEEE1]'}`}
    >
<style>
{`
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700&family=Nobile:wght@400;700&display=swap');

  :root {
    --primary-accent: #438951;
    --secondary-accent: #4A644E;
    --heading-color: #3B4540;
    --body-color: #405449;
    --card-bg-color: #FAFFFA;
    --page-bg-color: #DEEEE1;
    --body-line-height: 1.6;
  }

  .font-fraunces { font-family: 'Fraunces', serif !important; }
  .font-nobile { font-family: 'Nobile', sans-serif !important; }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Fraunces', serif !important;
    color: var(--heading-color);
  }
  body, p, li, span {
    font-family: 'Nobile', sans-serif !important;
    color: var(--body-color);
    line-height: var(--body-line-height);
  }

  /* Keep your custom shadow */
  .custom-shadow { box-shadow: 6px 6px 0px var(--secondary-accent); }

  /* Scrollbar styles (keep) */
  .sidebar-container::-webkit-scrollbar { width: 4px; }
  .sidebar-container::-webkit-scrollbar-track { background-color: #F5F8F7; }
  .sidebar-container::-webkit-scrollbar-thumb { background-color: #B9BCBA; border-radius: 4px; }

  /* New: Sidebar selected item visuals (text, smoky bg, SVG stroke only) */
  .sidebar-item.selected {
    color: #6BA8F4 !important;
    background: rgba(107,168,244,0.18) !important; /* smoky lighter blue */
  }
  .sidebar-item.selected svg {
    stroke: #6BA8F4 !important;
    fill: transparent !important; /* object only, no background */
  }

  /* New: Shared two-column layout helpers for aligned image/text */
  .two-col { display: flex; flex-direction: column; }
  @media (min-width: 768px) {
    .two-col { flex-direction: row; align-items: stretch; }
    .two-col .col { flex: 1 1 50%; }
    .two-col.equal { min-height: 380px; } /* adjust height to your taste */
  }
  .media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* Rounded rules that don’t create visual seams on mobile vs desktop */
  .rounded-sides {
    border-radius: 16px;
  }
  @media (min-width: 768px) {
    .rounded-left-only {
      border-top-left-radius: 16px;
      border-bottom-left-radius: 16px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    .rounded-right-only {
      border-top-right-radius: 16px;
      border-bottom-right-radius: 16px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
`}
</style>

      {presentMode ? (
        <div ref={presentationContainerRef} className="relative h-screen w-screen flex flex-col justify-center items-center overflow-hidden">
          <Header presentMode={presentMode} setPresentMode={handlePresentClick} isMenuVisible={isMenuVisible} />
          <div className="flex-grow flex items-center w-full h-full p-8">
            <div className="w-full max-w-6xl mx-auto">
              {renderCardContent(activeIndex)}
            </div>
          </div>
          <PresentationBottomBar slides={slides} activeIndex={activeIndex} onSelect={setActiveIndex} isVisible={isBottomBarVisible} readSlides={readSlides} />
        </div>
      ) : (
        <>
          <Header presentMode={presentMode} setPresentMode={handlePresentClick} isMenuVisible={true} />
          <div className="h-16"></div>
          
          <div ref={mainContentRef} className={`relative pt-8 transition-all duration-300 space-y-12 pb-16`}>
            {slides.map((slide, index) => {
              const isWideSection = index === 13; // Block 12 banner
              
              if (isWideSection) {
                return (
                  <div
                    key={index}
                    ref={el => cardRefs.current[index] = el}
                    className="w-full"
                  >
                    {renderCardContent(index)}
                  </div>
                );
              } else {
                return (
                  <div
                    key={index}
                    ref={el => cardRefs.current[index] = el}
                    className="mx-auto max-w-6xl px-4"
                  >
                    <div className="bg-white custom-shadow rounded-2xl overflow-hidden">
                      {renderCardContent(index)}
                    </div>
                  </div>
                );
              }
            })}
            
            {/* Final Call-to-Action Button */}
            <div className="text-center">
              <Button className="bg-[#438951] hover:bg-[#4A644E]">
                <Sparkles className="w-5 h-5 mr-2" />
                Découvrir la 3ème Voie
              </Button>
            </div>
          </div>

          {sidebarOpen && (
            <div className="fixed top-[56px] bottom-0 left-[2mm] z-[50] flex items-center">
              <Sidebar
                slides={slides}
                activeIndex={activeIndex}
                onSelect={setActiveIndex}
                onClose={() => setSidebarOpen(false)}
                width={sidebarWidth}
                toggleResize={toggleResize}
              />
            </div>
          )}

          {!sidebarOpen && (
            <div className="fixed top-[56px] bottom-0 left-[2mm] z-[55] flex items-center">
              <button
                className="p-2 rounded-lg bg-white border-2 border-[#D7E7FD] hover:bg-[#EBF3FE] transition-colors"
                onClick={() => setSidebarOpen(true)}
              >
                <Film className="w-6 h-6 stroke-[#223F6A]" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Sidebar component
function Sidebar({ slides, activeIndex, onSelect, onClose, width, toggleResize }) {
  const [mode, setMode] = useState("list");

  const listItemHeight = 16 + 2 * 4 + 2;
  const listModeHeight = (16 + 2 * 4 + 2) * 11 + 4;
  const filmStripHeight = (38 + 4 + 14 + 2) * 7 + 4;
  const thumbnailHeight = 38;

  const totalListHeight = slides.length * (listItemHeight) + 4;
  const clampedListHeight = Math.min(totalListHeight, listModeHeight);
  const slidesWithThumbnails = slides.filter(s => s.thumbnail);
  const totalFilmStripHeight = slidesWithThumbnails.length * (thumbnailHeight + 4 + 14 + 2) + 4;
  const clampedFilmStripHeight = Math.min(totalFilmStripHeight, filmStripHeight);

  return (
    <div
      className="relative flex flex-col transition-all duration-300 rounded-xl max-h-[85vh] shadow-md select-none"
      style={{ 
        width: `${width}px`,
        backgroundColor: '#CCDBCF'
      }}
    >
      <div
        className="absolute top-1/2 right-0 w-4 h-1/2 -translate-y-1/2 cursor-ew-resize flex flex-col items-center justify-center gap-1"
        onMouseDown={toggleResize}
      >
        <div className="h-4 w-[2px] bg-white rounded-full drag-handle-pill"></div>
        <div className="h-4 w-[2px] bg-white rounded-full drag-handle-pill"></div>
      </div>

      <div className="flex items-center justify-between p-2">
        <div className="flex items-center space-x-1 p-1 bg-white rounded-full">
          <button
            className={`p-1 rounded-full ${mode === "film" ? "bg-[#EBF3FE] hover:bg-[#6BA8F4]" : "bg-transparent"}`}
            onClick={() => setMode("film")}
          >
            <Film className={`w-3 h-3 ${mode === "film" ? "stroke-[#3B4540]" : "stroke-gray-500"}`} />
          </button>
          <button
            className={`p-1 rounded-full ${mode === "list" ? "bg-[#EBF3FE] hover:bg-[#6BA8F4]" : "bg-transparent"}`}
            onClick={() => setMode("list")}
          >
            <List className={`w-3 h-3 ${mode === "list" ? "stroke-[#3B4540]" : "stroke-gray-500"}`} />
          </button>
        </div>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
          <X className="w-5 h-5 stroke-[#3B4540]" />
        </button>
      </div>

      <div
        className={`sidebar-container overflow-y-scroll`}
        style={mode === "list" ? { height: `${clampedListHeight}px` } : { height: `${clampedFilmStripHeight}px` }}
      >
      {mode === "list" ? ( ... ) : ( ... )}
  <div className="px-1 pt-[2px] pb-1 grid grid-cols-1 gap-[2px]">
    {slides.map((slide, index) => {
      const isSelected = index === activeIndex;
      return (
        <div
          key={index}
          onClick={() => onSelect(index)}
          className={`sidebar-item flex items-center cursor-pointer rounded-lg text-xs hover:bg-gray-100 ${
            isSelected ? "selected" : ""
          }`}
        >
          <div
            className="w-6 flex-shrink-0 flex items-center justify-center p-1"
            style={{ backgroundColor: "#DFDFE0" }}
          >
            {index + 1}
          </div>
          <div
            className="flex-1 p-1 truncate"
            style={{ backgroundColor: "#F5F5F6" }}
          >
            <span className="truncate">{slide.title}</span>
          </div>
        </div>
      );
    })}
  </div>
) : (
  <div className="p-1 flex flex-col gap-[2px]">
    {slidesWithThumbnails.map((slide, index) => {
      const originalIndex = slides.findIndex(s => s === slide);
      const isSelected = originalIndex === activeIndex;
      return (
        <div
          key={index}
          onClick={() => onSelect(originalIndex)}
          className={`cursor-pointer p-1 rounded-lg relative border-2 ${
            isSelected ? "border-[#6BA8F4]" : "border-transparent"
          }`}
        >
          <img
            src={slide.thumbnail}
            alt={slide.alt}
            className="w-full h-auto object-cover"
            style={{ height: `${thumbnailHeight}px`, objectFit: 'cover' }}
          />
          <div className="absolute top-1 left-1 bg-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
            {originalIndex + 1}
          </div>
          <div className="text-center text-xs mt-1 truncate">{slide.title}</div>
        </div>
      );
    })}
  </div>
  </div>

)}
