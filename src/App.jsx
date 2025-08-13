import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles, Lightbulb, AlignJustify, Clock, FlaskConical, Users, Home,
  GraduationCap, Building, Heart, Music, Hand, Mail, Phone,
  Film, List, X, Play, LogOut, User
} from 'lucide-react';

// === DÉBUT DU COMPOSANT ===
export default function App() {
  // --- ÉTATS DU COMPOSANT ---
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [presentMode, setPresentMode] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [readSlides, setReadSlides] = useState([]);
  const [sidebarWidth, setSidebarWidth] = useState(192);

  // --- RÉFÉRENCES ---
  const cardRefs = useRef([]);
  const mainContentRef = useRef(null);
  const presentationContainerRef = useRef(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isBottomBarVisible, setIsBottomBarVisible] = useState(false);

  // --- DONNÉES DE L'APPLICATION ---
  const slides = [
    {
      title: "La 3ème Voie Éducative",
      icon: Home,
      thumbnail: '/assets/images/Card_1.png',
      alt: "Une mère et son enfant jouant",
      content: "Une approche humaine, vivante et libre pour les enfants atypiques et leurs familles."
    },
    {
      title: "Card 2 Title",
      icon: Sparkles,
      thumbnail: '/assets/images/Card_2.png',
      alt: "Éducatrice bienveillante avec enfants dans un cadre d’éducation alternative",
      content: "Ceci est le corps du texte pour Card 2 Title. La mise en page est maintenant responsive."
    },
    {
      title: "Card 3 Title",
      icon: Lightbulb,
      thumbnail: '/assets/images/Card_3.png',
      alt: "Placeholder",
      content: "Ceci est le corps du texte pour Card 3 Title. La mise en page est maintenant responsive."
    },
    {
      title: "Card 3a Title",
      icon: Lightbulb,
      thumbnail: '/assets/images/Card_3a.png',
      alt: "Placeholder",
      content: "Ceci est le corps du texte pour Card 3a Title. La mise en page est maintenant responsive."
    },
    {
      title: "Card 4 Title",
      icon: AlignJustify,
      thumbnail: '/assets/images/Card_4.png',
      alt: "Une infographie verte avec cinq cercles reliés par des flèches. Chaque cercle contient une icône et un texte en dessous. Les étiquettes sont, de gauche à droite : « Approche adaptée », « Personnalisation », « Respect du rythme », « Espace d'expérimentation » et « Inclusion des parents ».",
      content: "Ceci est le corps du texte pour Card 4 Title. La mise en page est maintenant responsive."
    },
    {
      title: "Card 4a Title",
      icon: AlignJustify,
      thumbnail: '/assets/images/Card_4a.png',
      alt: "Enseignante attentionnée avec enfants d’origines diverses dans une classe lumineuse et sécurisante",
      content: "Ceci est le corps du texte pour Card 4a Title. La mise en page est maintenant responsive."
    },
    {
      title: "Card 5 Title",
      icon: Clock,
      thumbnail: '/assets/images/Card_5.png',
      alt: "Consultante éducative accompagnant parents et enfant dans un cadre bienveillant",
      content: "Ceci est le corps du texte pour Card 5 Title. La mise en page est maintenant responsive."
    },
    {
      title: "Card 6 Title",
      icon: FlaskConical,
      thumbnail: '/assets/images/Card_6.png',
      alt: "Placeholder",
      content: "Ceci est le corps du texte pour Card 6 Title. La mise en page est maintenant responsive."
    },
    {
      title: "Mes services",
      icon: Users,
      thumbnail: '/assets/images/Card_7.png',
      alt: "Matériel éducatif avec supports visuels, outils sensoriels et cartes adaptées aux besoins spécifiques",
      content: "Une proposition complète de services pour accompagner les familles."
    },
    {
      title: "Les 5 piliers de la 3ème voie éducative",
      icon: GraduationCap,
      thumbnail: '/assets/images/Card_8.svg',
      alt: "Schéma en fleur à cinq pétales avec symboles : horloge, puzzle, main, cœur et toque de diplômé",
      content: "Ceci est le corps du texte pour Card 8 Title. La mise en page est maintenant responsive."
    },
    {
      title: "Témoignages",
      icon: Building,
      thumbnail: '/assets/images/Card_9.png',
      alt: "Parents et enfant souriant dans un environnement éducatif bienveillant",
      content: "Ceci est le corps du texte pour Card 9 Title. La mise en page est maintenant responsive."
    },
    {
      title: "Me contacter",
      icon: Heart,
      thumbnail: '/assets/images/Card_10.png',
      alt: "Espace de consultation chaleureux avec supports éducatifs et éléments naturels",
      content: "Ceci est le corps du texte pour Card 10 Title. La mise en page est maintenant responsive."
    },
    {
      title: "Ressources gratuites",
      icon: Music,
      thumbnail: '/assets/images/Card_11.png',
      alt: "Couverture colorée d’un e-book éducatif pour enfants à besoins particuliers",
      content: "Ceci est le corps du texte pour Card 11 Title. La mise en page est maintenant responsive."
    },
    {
      title: "La méthode en 3D",
      icon: Hand,
      thumbnail: '/assets/images/Block_12.png',
      alt: "Avant de faire dodo — version trilingue illustrée pour enfants",
      content: "Fiches trilingues (français, anglais, espagnol) pour routines quotidiennes, gestion des émotions et apprentissages ludiques."
    },
  ];

  const testimonials = [
    { quote: "Testimonial 1.", author: "Author 1" },
    { quote: "Testimonial 2.", author: "Author 2" },
  ];

  const services = [
    { title: "Service A", items: ["item 1", "item 2", "item 3"] },
    { title: "Service B", items: ["item 1", "item 2", "item 3"] },
    { title: "Service C", items: ["item 1", "item 2", "item 3"] },
  ];

  // --- LOGIQUE DU COMPOSANT ---
  const WIDTH_1_INCH = 96;
  const WIDTH_2_INCH = 192;
  const PADDING_INCH_HALF = 48;
  const CLOSED_SIDEBAR_PADDING = 100;

  useEffect(() => {
    if (cardRefs.current[activeIndex]) {
      cardRefs.current[activeIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [activeIndex]);

  useEffect(() => {
    if (mainContentRef.current) {
      const newPaddingLeft = sidebarOpen ? sidebarWidth + PADDING_INCH_HALF : CLOSED_SIDEBAR_PADDING;
      mainContentRef.current.style.paddingLeft = `${newPaddingLeft}px`;
    }
  }, [sidebarOpen, sidebarWidth]);

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

  useEffect(() => {
    if (activeIndex !== null && !readSlides.includes(activeIndex)) {
      setReadSlides(prev => [...prev, activeIndex]);
    }
  }, [activeIndex]);

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

  const getImageSrc = (slide, index) => {
    if (slide.thumbnail && slide.thumbnail.endsWith('.svg')) {
      return slide.thumbnail;
    } else if (slide.thumbnail && slide.thumbnail.endsWith('.png')) {
      return slide.thumbnail;
    }
    return 'https://placehold.co/600x400';
  };

  const renderCardContent = (index) => {
    switch (index) {
      case 0: // Card 1 - La 3ème Voie Éducative
        return (
          <div className="two-col equal">
            <div className="col media">
              <img src={getImageSrc(slides[index], index)} alt={slides[index].alt} className="rounded-left-only" />
            </div>
            <div className="col content p-8 flex flex-col justify-center rounded-right-only" style={{ backgroundColor: '#FAFFFA' }}>
              <h2 className="text-3xl font-bold mb-4">{slides[index].title}</h2>
              <p>{slides[index].content}</p>
            </div>
          </div>
        );
      case 1: // Card 2 - L'approche
        return (
          <div className="two-col equal">
            <div className="col content p-8 flex flex-col justify-center rounded-left-only" style={{ backgroundColor: '#FAFFFA' }}>
              <h2 className="text-3xl font-bold mb-4">{slides[index].title}</h2>
              <p>{slides[index].content}</p>
            </div>
            <div className="col media">
              <img src={getImageSrc(slides[index], index)} alt={slides[index].alt} className="rounded-right-only" />
            </div>
          </div>
        );
      case 2: // Card 3 - Pour qui?
        return (
          <div className="p-8 two-col equal rounded-sides" style={{ backgroundColor: '#FAFFFA' }}>
            <div className="col flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-4 text-center">{slides[index].title}</h2>
              <p className="text-center">{slides[index].content}</p>
            </div>
            <div className="col flex items-center justify-center">
              <img
                src={getImageSrc(slides[index], index)}
                alt={slides[index].alt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        );
      case 3: // Card 3a - Les parents aussi
        return (
          <div className="p-8 two-col equal rounded-sides" style={{ backgroundColor: '#FAFFFA' }}>
            <div className="col flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-4 text-center">{slides[index].title}</h2>
              <p className="text-center">{slides[index].content}</p>
            </div>
            <div className="col flex items-center justify-center">
              <img
                src={getImageSrc(slides[index], index)}
                alt={slides[index].alt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        );
      case 4: // Card 4 - Nos valeurs
        return (
          <div className="p-8 two-col equal rounded-sides" style={{ backgroundColor: '#FAFFFA' }}>
            <div className="col flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-4 text-center">{slides[index].title}</h2>
              <p className="text-center">{slides[index].content}</p>
            </div>
            <div className="col flex items-center justify-center">
              <img
                src={getImageSrc(slides[index], index)}
                alt={slides[index].alt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        );
      case 5: // Card 4a - La bienveillance
        return (
          <div className="two-col equal">
            <div className="col media">
              <img src={getImageSrc(slides[index], index)} alt={slides[index].alt} className="rounded-left-only" />
            </div>
            <div className="col content p-8 flex flex-col justify-center rounded-right-only" style={{ backgroundColor: '#FAFFFA' }}>
              <h2 className="text-3xl font-bold mb-4">{slides[index].title}</h2>
              <p>{slides[index].content}</p>
            </div>
          </div>
        );
      case 6: // Card 5 - Le parcours
        return (
          <div className="p-8 two-col equal rounded-sides" style={{ backgroundColor: '#FAFFFA' }}>
            <div className="col flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-4 text-center">{slides[index].title}</h2>
              <p className="text-center">{slides[index].content}</p>
            </div>
            <div className="col flex items-center justify-center">
              <img
                src={getImageSrc(slides[index], index)}
                alt={slides[index].alt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        );
      case 7: // Card 6 - Mon histoire
        return (
          <div className="two-col equal">
            <div className="col content p-8 flex flex-col justify-center rounded-left-only" style={{ backgroundColor: '#FAFFFA' }}>
              <h2 className="text-3xl font-bold mb-4">{slides[index].title}</h2>
              <p>{slides[index].content}</p>
            </div>
            <div className="col media">
              <img src={getImageSrc(slides[index], index)} alt={slides[index].alt} className="rounded-right-only" />
            </div>
          </div>
        );
      case 8: // Card 7 - Mes services
        return (
          <div className="p-8 rounded-sides" style={{ backgroundColor: '#FAFFFA' }}>
            <div className="flex flex-col-reverse md:flex-row min-h-[400px]">
              <div className="w-full md:w-2/3 p-4 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-8 text-left" style={{ color: '#3B4540' }}>Mes services</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {services.map((service, idx) => (
                    <div key={idx}>
                      <h3 className="text-xl font-bold mb-4" style={{ color: '#3B4540' }}>{service.title}</h3>
                      <ul className="space-y-2">
                        {service.items.map((item, itemIdx) => (
                          <li key={itemIdx} style={{ color: '#405449' }}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-1/3 flex items-center justify-center p-4">
                <img
                  src={getImageSrc(slides[index], index)}
                  alt={slides[index].alt}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        );

      case 9: // Card 8 - Les 5 piliers de la 3ème voie éducative
        return (
          <div className="p-8 rounded-sides" style={{ backgroundColor: '#FAFFFA' }}>
            <div className="flex flex-col min-h-[400px]">
              <h2 className="text-3xl font-bold mb-8 text-left" style={{ color: '#3B4540' }}>
                Les 5 piliers de la 3ème voie éducative
              </h2>

              <div className="flex justify-center mb-8">
                <img
                  src={getImageSrc(slides[index], index)}
                  alt={slides[index]?.alt || '[Your alt text for Card 8]'}
                  className="max-w-md w-full h-auto object-contain"
                />
              </div>

              {/* Your card-specific content goes here */}
              <p className="text-center text-lg mt-8 italic" style={{ color: '#405449' }}>
                {slides[index].content}
              </p>
            </div>
          </div>
        );

      case 10: // Card 9 - Témoignages
        return (
          <div className="p-8 rounded-sides" style={{ backgroundColor: '#FAFFFA' }}>
            <div className="flex flex-col md:flex-row min-h-[400px]">
              <div className="w-full md:w-1/2 p-4 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-8 text-left" style={{ color: '#3B4540' }}>Témoignages</h2>
                <div className="space-y-6">
                  {testimonials.map((t, idx) => (
                    <div key={idx} className="relative border-t-8 border-[#438951] p-6 mt-2 bg-white custom-shadow">
                      <blockquote className="text-lg italic" style={{ color: '#405449' }}>"{t.quote}"</blockquote>
                      <cite className="block text-right mt-4 font-bold" style={{ color: '#3B4540' }}>– {t.author}</cite>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-1/2 flex items-center justify-center p-4">
                <img src={getImageSrc(slides[index], index)} alt={slides[index].alt} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        );

      case 11: // Card 10 - Me contacter
        return (
          <div className="p-8 rounded-sides" style={{ backgroundColor: '#FAFFFA' }}>
            <div className="flex flex-col md:flex-row min-h-[400px]">
              <div className="w-full md:w-1/2 flex items-center justify-center p-4 order-2 md:order-1">
                <img src={getImageSrc(slides[index], index)} alt={slides[index].alt} className="w-full h-full object-cover" />
              </div>
              <div className="w-full md:w-1/2 p-4 order-1 md:order-2 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-8 text-left" style={{ color: '#3B4540' }}>Me contacter</h2>
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-2xl custom-shadow">
                    <div className="flex items-center mb-2">
                      <Mail className="w-5 h-5 mr-3" style={{ color: '#438951' }} />
                      <span style={{ color: '#405449' }}>marie@educ3voie.fr</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 mr-3" style={{ color: '#438951' }} />
                      <span style={{ color: '#405449' }}>06 XX XX XX XX</span>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl custom-shadow">
                    <p style={{ color: '#405449' }}>
                      <strong>Disponibilité:</strong> À distance ou en région [Votre ville]
                    </p>
                  </div>
                  <p className="text-lg text-center" style={{ color: '#405449' }}>
                    Construisons ensemble cette 3ème voie éducative, plus humaine, plus souple, plus libre.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case 12: // Card 11 - Ressources gratuites
        return (
          <div className="p-8 rounded-sides" style={{ backgroundColor: '#FAFFFA' }}>
            <div className="flex flex-col md:flex-row min-h-[400px]">
              <div className="w-full md:w-1/2 p-4 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-8 text-left" style={{ color: '#3B4540' }}>Ressources gratuites</h2>
                <div className="bg-white p-6 rounded-2xl custom-shadow">
                  <h3 className="text-xl font-bold mb-4" style={{ color: '#3B4540' }}>E-book offert</h3>
                  <p className="mb-6" style={{ color: '#405449' }}>
                    "Les 5 piliers de la 3e voie éducative" — Guide pour parents d'enfants différents.
                  </p>
                  <button className="bg-green-700 text-white px-6 py-3 rounded-lg text-xl hover:bg-green-800 transition-colors w-full">
                    <div className="flex items-center justify-center">
                      <Sparkles className="w-5 h-5 mr-2" />
                      Télécharger
                    </div>
                  </button>
                </div>
              </div>
              <div className="w-full md:w-1/2 flex items-center justify-center p-4">
                <img src={getImageSrc(slides[index], index)} alt={slides[index].alt} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        );

      case 13: // Block 12 - Banner
        return (
          <div
            className="relative h-96 flex items-center justify-center"
            style={{
              backgroundImage: `url('${getImageSrc(slides[index], index)}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div
              className="absolute inset-0"
              style={{ backgroundColor: 'rgba(59, 69, 64, 0.7)', backdropFilter: 'blur(1px)' }}
            ></div>

            <div className="relative z-10 text-center text-white p-8">
              <h2 className="text-4xl font-bold mb-6">{slides[index].title}</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                {slides[index].content}
              </p>
              <button className="bg-white text-green-700 hover:bg-gray-100 px-6 py-3 rounded-lg text-xl transition-colors">
                Découvrir les capsules
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // --- COMPOSANT HEADER (inchangé) ---
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

  // --- COMPOSANT PRESENTATIONBOTTOMBAR (inchangé) ---
  const PresentationBottomBar = ({ slides, activeIndex, onSelect, isVisible, readSlides }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });

    const handleHover = (index, event) => {
      setHoveredIndex(index);
      setPreviewPosition({ x: event.clientX, y: event.clientY });
    };

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
              onMouseEnter={(e) => handleHover(index, e)}
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

  // --- COMPOSANT SIDEBAR (inchangé) ---
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
        className="relative flex flex-col bg-[#F5F8F7] transition-all duration-300 rounded-xl max-h-[85vh] shadow-md select-none"
        style={{ width: `${width}px` }}
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
              className={`p-1 rounded-full ${mode === "film" ? "bg-[#EBF3FE]" : "bg-transparent"}`}
              onClick={() => setMode("film")}
            >
              <Film className={`w-3 h-3 ${mode === "film" ? "stroke-[#223F6A]" : "stroke-gray-500"}`} />
            </button>
            <button
              className={`p-1 rounded-full ${mode === "list" ? "bg-[#EBF3FE]" : "bg-transparent"}`}
              onClick={() => setMode("list")}
            >
              <List className={`w-3 h-3 ${mode === "list" ? "stroke-[#223F6A]" : "stroke-gray-500"}`} />
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
          {mode === "list" ? (
            <div className="px-1 pt-[2px] pb-1 grid grid-cols-1 gap-[2px]">
              {slides.map((slide, index) => {
                const isSelected = index === activeIndex;

                return (
                  <div
                    key={index}
                    onClick={() => onSelect(index)}
                    className={`flex items-center cursor-pointer hover:bg-gray-100 rounded-lg text-xs sidebar-item ${
                      isSelected ? "selected" : "text-[#3B4540]"
                    }`}
                  >
                    <div className="w-6 flex-shrink-0 flex items-center justify-center p-1" style={{ backgroundColor: "#DFDFE0" }}>
                      {index + 1}
                    </div>
                    <div className="flex-1 p-1 truncate" style={{ backgroundColor: "#F5F5F6" }}>
                      <span className="truncate">{slide.title}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-1 flex flex-col gap-[2px]">
              {slidesWithThumbnails.map((slide, index) => {
                const isSelected = index === activeIndex;
                return (
                  <div
                    key={index}
                    onClick={() => onSelect(index)}
                    className={`cursor-pointer hover:bg-gray-100 p-1 rounded-lg relative ${
                      isSelected ? "border-2 border-[#6BA8F4]" : "border-2 border-transparent"
                    }`}
                  >
                    <img
                      src={slide.thumbnail}
                      alt={slide.alt}
                      className="w-full h-auto object-cover"
                      style={{ height: `${thumbnailHeight}px`, objectFit: 'cover' }}
                    />
                    <div className="absolute top-1 left-1 bg-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                      {index + 1}
                    </div>
                    <div className="text-center text-xs mt-1 truncate">{slide.title}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- RENVOI DU COMPOSANT PRINCIPAL ---
  return (
    <div className={`relative min-h-screen transition-opacity duration-500 ease-in-out ${presentMode ? 'bg-white' : 'bg-[#DEEEE1]'}`}>
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

          .custom-shadow { box-shadow: 6px 6px 0px var(--secondary-accent); }

          .sidebar-container::-webkit-scrollbar { width: 4px; }
          .sidebar-container::-webkit-scrollbar-track { background-color: #F5F8F7; }
          .sidebar-container::-webkit-scrollbar-thumb { background-color: #B9BCBA; border-radius: 4px; }

          .sidebar-item.selected {
            color: #6BA8F4 !important;
            background: rgba(107,168,244,0.18) !important;
          }
          .sidebar-item.selected svg { stroke: #6BA8F4 !important; fill: transparent !important; }

          .two-col { display: flex; flex-direction: column; }
          @media (min-width: 768px) {
            .two-col { flex-direction: row; align-items: stretch; }
            .two-col .col { flex: 1 1 50%; }
            .two-col.equal { min-height: 380px; }
          }
          .media img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }

          .rounded-sides { border-radius: 16px; }
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
              border-bottom-left: 0;
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
          <PresentationBottomBar
            slides={slides}
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
            isVisible={isBottomBarVisible}
            readSlides={readSlides}
          />
        </div>
      ) : (
        <>
          <Header presentMode={presentMode} setPresentMode={handlePresentClick} isMenuVisible={true} />
          <div className="h-16"></div>

          <div ref={mainContentRef} className="relative pt-8 transition-all duration-300 space-y-12 pb-16">
            {slides.map((slide, index) => {
              const isWideSection = index === 13;
              if (isWideSection) {
                return (
                  <div key={index} ref={(el) => (cardRefs.current[index] = el)} className="w-full">
                    {renderCardContent(index)}
                  </div>
                );
              }
              return (
                <div key={index} ref={(el) => (cardRefs.current[index] = el)} className="mx-auto max-w-6xl px-4">
                  <div className="bg-white custom-shadow rounded-2xl overflow-hidden">
                    {renderCardContent(index)}
                  </div>
                </div>
              );
            })}

            <div className="text-center">
              <button className="bg-[#438951] hover:bg-[#4A644E] text-white px-6 py-3 rounded-lg text-xl transition-colors">
                <div className="flex items-center justify-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Découvrir la 3ème Voie
                </div>
              </button>
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
