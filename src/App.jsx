import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles, Lightbulb, AlignJustify, Clock, FlaskConical, Users, Home,
  GraduationCap, Building, Heart, Music, Hand, Mail, Phone,
  Film, List, X, Play, LogOut, User
} from 'lucide-react';

// Le composant App complet, inclus tous les styles et la logique
export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [presentMode, setPresentMode] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [readSlides, setReadSlides] = useState([]);

  // Largeurs de la barre latérale et padding du contenu
  const WIDTH_1_INCH = 96;
  const WIDTH_2_INCH = 192;
  const PADDING_INCH_HALF = 48;
  const CLOSED_SIDEBAR_PADDING = 100;
  const [sidebarWidth, setSidebarWidth] = useState(WIDTH_1_INCH);

  // Références pour les cartes et le contenu principal
  const cardRefs = useRef([]);
  const mainContentRef = useRef(null);
  const presentationContainerRef = useRef(null);

  // Gestion de la visibilité du menu en mode Présentation
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isBottomBarVisible, setIsBottomBarVisible] = useState(false);

  // Effet pour faire défiler vers la carte active
  useEffect(() => {
    if (cardRefs.current[activeIndex]) {
      cardRefs.current[activeIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [activeIndex]);

  // Effet pour gérer le padding du contenu principal
  useEffect(() => {
    if (mainContentRef.current) {
      let newPaddingLeft = CLOSED_SIDEBAR_PADDING;
      if (sidebarOpen) {
        newPaddingLeft = sidebarWidth + PADDING_INCH_HALF;
      }
      mainContentRef.current.style.paddingLeft = `${newPaddingLeft}px`;
    }
  }, [sidebarOpen, sidebarWidth]);

  // Effet pour le mode Présentation
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

  // Effet : Met à jour les diapositives "lues"
  useEffect(() => {
    if (activeIndex !== null && !readSlides.includes(activeIndex)) {
      setReadSlides(prev => [...prev, activeIndex]);
    }
  }, [activeIndex]);

  // Fonction pour basculer la largeur de la barre latérale
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

  // Tableau de données pour les diapositives.
  // Les chemins d'accès aux images sont maintenant des chaînes de caractères directes.
  const slides = [
    {
      title: "Card 1 Title",
      icon: Home,
      thumbnail: './assets/images/Card_1.png',
      alt: "Enfant et adulte assis dans un espace d’apprentissage lumineux et coloré, inspiré de la pédagogie Montessori"
    },
    {
      title: "Card 2 Title",
      icon: Sparkles,
      thumbnail: './assets/images/Card_2.png',
      alt: "Éducatrice bienveillante avec enfants dans un cadre d’éducation alternative"
    },
    {
      title: "Card 3 Title",
      icon: Lightbulb,
      thumbnail: null,
      alt: "Placeholder"
    },
    {
      title: "Card 3a Title",
      icon: Lightbulb,
      thumbnail: null,
      alt: "Placeholder"
    },
    {
      title: "Card 4 Title",
      icon: AlignJustify,
      thumbnail: './assets/images/Card_4.png',
      alt: "Une infographie verte avec cinq cercles reliés par des flèches. Chaque cercle contient une icône et un texte en dessous. Les étiquettes sont, de gauche à droite : « Approche adaptée », « Personnalisation », « Respect du rythme », « Espace d'expérimentation » et « Inclusion des parents »."
    },
    {
      title: "Card 4a Title",
      icon: AlignJustify,
      thumbnail: './assets/images/Card_4a.png',
      alt: "Enseignante attentionnée avec enfants d’origines diverses dans une classe lumineuse et sécurisante"
    },
    {
      title: "Card 5 Title",
      icon: Clock,
      thumbnail: './assets/images/Card_5.png',
      alt: "Consultante éducative accompagnant parents et enfant dans un cadre bienveillant"
    },
    {
      title: "Card 6 Title",
      icon: FlaskConical,
      thumbnail: null,
      alt: "Placeholder"
    },
    {
      title: "Card 7 Title",
      icon: Users,
      thumbnail: './assets/images/Card_7.png',
      alt: "Matériel éducatif avec supports visuels, outils sensoriels et cartes adaptées aux besoins spécifiques"
    },
    {
      title: "Card 8 Title",
      icon: GraduationCap,
      thumbnail: './assets/images/Card_8.svg',
      alt: "Schéma en fleur à cinq pétales avec symboles : horloge, puzzle, main, cœur et toque de diplômé"
    },
    {
      title: "Card 9 Title",
      icon: Building,
      thumbnail: './assets/images/Card_9.png',
      alt: "Parents et enfant souriant dans un environnement éducatif bienveillant"
    },
    {
      title: "Card 10 Title",
      icon: Heart,
      thumbnail: './assets/images/Card_10.png',
      alt: "Espace de consultation chaleureux avec supports éducatifs et éléments naturels"
    },
    {
      title: "Card 11 Title",
      icon: Music,
      thumbnail: './assets/images/Card_11.png',
      alt: "Couverture colorée d’un e-book éducatif pour enfants à besoins particuliers"
    },
    {
      title: "Block 12 Title",
      icon: Hand,
      thumbnail: './assets/images/Block_12.png',
      alt: "Avant de faire dodo — version trilingue illustrée pour enfants"
    },
  ];

  // Données pour les témoignages
  const testimonials = [
      { quote: "Testimonial 1.", author: "Author 1" },
      { quote: "Testimonial 2.", author: "Author 2" },
  ];

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

  const PresentationBottomBar = ({ slides, activeIndex, onSelect, isVisible, readSlides }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleHover = (index, event) => {
      setHoveredIndex(index);
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
  
  // Note: La logique pour séparer les cartes "normales" des "larges" était la bonne approche.
  // La logique ci-dessous a été ajustée pour mieux gérer les cartes sans image.
  const normalAndWideSlides = slides.filter(slide => !['Testimonial 1.', 'Testimonial 2.'].includes(slide.title));

  return (
    <div
      className={`relative min-h-screen font-nobile transition-opacity duration-500 ease-in-out ${presentMode ? 'bg-white' : 'bg-[#DEEEE1]'}`}
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700&family=Nobile:wght@400;700&display=swap');
          h1, h2, h3, h4, h5, h6 { font-family: 'Fraunces', serif; color: #3B4540; }
          p, li { font-family: 'Nobile', sans-serif; color: #405449; line-height: 1.6; }
          .custom-shadow { box-shadow: 6px 6px 0px #4A644E; }
          .drag-handle-pill { box-shadow: 1px 1px 2px rgba(0,0,0,0.2); }
          .sidebar-container::-webkit-scrollbar { width: 4px; }
          .sidebar-container::-webkit-scrollbar-track { background-color: #F5F8F7; }
          .sidebar-container::-webkit-scrollbar-thumb { background-color: #B9BCBA; border-radius: 4px; }
        `}
      </style>

      {presentMode ? (
        <div ref={presentationContainerRef} className="relative h-screen w-screen flex flex-col justify-center items-center overflow-hidden">
          <Header presentMode={presentMode} setPresentMode={handlePresentClick} isMenuVisible={isMenuVisible} />
          <div className="flex-grow flex items-center w-full h-full p-8">
            {['Card 11 Title', 'Block 12 Title'].includes(slides[activeIndex].title) ? (
                <div className="w-full flex flex-col justify-center items-center text-center">
                    <h2 className="text-4xl font-bold">{slides[activeIndex].title}</h2>
                    <p className="mt-4">
                        Ceci est le corps du texte pour {slides[activeIndex].title}. La mise en page est maintenant responsive et en plein écran.
                    </p>
                    {slides[activeIndex].thumbnail && (
                        <img
                            src={slides[activeIndex].thumbnail}
                            alt={slides[activeIndex].alt}
                            className="mt-4 max-h-80 object-contain"
                        />
                    )}
                </div>
            ) : (
                <div
                    className="bg-white p-6 custom-shadow rounded-2xl w-full mx-auto"
                    style={{ minHeight: "250px", maxWidth: "900px" }}
                >
                    <div className="flex-1 flex flex-col justify-center items-center text-center">
                        <h2 className="text-4xl font-bold">{slides[activeIndex].title}</h2>
                        <p className="mt-4">
                            Ceci est le corps du texte pour {slides[activeIndex].title}. La mise en page est maintenant responsive.
                        </p>
                        {slides[activeIndex].thumbnail && (
                            <img
                                src={slides[activeIndex].thumbnail}
                                alt={slides[activeIndex].alt}
                                className="mt-4 max-h-80 object-contain"
                            />
                        )}
                    </div>
                </div>
            )}
          </div>
          <PresentationBottomBar slides={slides} activeIndex={activeIndex} onSelect={setActiveIndex} isVisible={isBottomBarVisible} readSlides={readSlides} />
        </div>
      ) : (
        <>
          <Header presentMode={presentMode} setPresentMode={handlePresentClick} isMenuVisible={true} />
          <div className="h-12"></div>
          
          <div ref={mainContentRef} className={`relative pt-0 transition-all duration-300 space-y-12`}>
            {/* Rendu des cartes et bannières */}
            {slides.map((slide, index) => {
              const isWideSection = ['Card 11 Title', 'Block 12 Title'].includes(slide.title);
              const hasThumbnail = !!slide.thumbnail;
              
              const cardContent = (
                <div className={`flex flex-col md:flex-row gap-6 ${!hasThumbnail ? 'items-center text-center' : ''}`}>
                  {(index % 2 === 0 || !hasThumbnail) && hasThumbnail && (
                      <div className="flex-1">
                          <img
                              src={slide.thumbnail}
                              alt={slide.alt}
                              className="w-full h-auto object-cover rounded-2xl"
                          />
                      </div>
                  )}
                  <div className="flex-1 flex flex-col justify-center">
                      <h2 className="text-3xl font-bold">{slide.title}</h2>
                      <p className="mt-2">
                          Ceci est le corps du texte pour {slide.title}. La mise en page est maintenant responsive.
                      </p>
                  </div>
                  {(index % 2 !== 0 && hasThumbnail) && (
                      <div className="flex-1">
                          <img
                              src={slide.thumbnail}
                              alt={slide.alt}
                              className="w-full h-auto object-cover rounded-2xl"
                          />
                      </div>
                  )}
                </div>
              );

              if (isWideSection) {
                return (
                  <div
                      key={index}
                      ref={el => cardRefs.current[index] = el}
                      className="bg-white overflow-hidden py-12 px-8 md:px-16"
                  >
                      {cardContent}
                  </div>
                );
              } else {
                return (
                  <div
                      key={index}
                      ref={el => cardRefs.current[index] = el}
                      className="mx-auto max-w-3xl"
                  >
                      <div className="bg-white p-6 custom-shadow rounded-2xl overflow-hidden" style={{ minHeight: "250px" }}>
                          {cardContent}
                      </div>
                  </div>
                );
              }
            })}
            
            {/* Rendu des témoignages */}
            <div className="mx-auto max-w-3xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 px-8 md:px-12">
                {testimonials.map((testimonial, index) => (
                    <div
                      key={slides.length + index}
                      ref={el => cardRefs.current[slides.length + index] = el}
                    >
                      <div className="border-t-8 border-[#438951] p-4 my-8 relative custom-shadow">
                          <p className="text-lg font-nobile italic">"{testimonial.quote}"</p>
                          <p className="text-right mt-2 font-fraunces font-bold">- {testimonial.author}</p>
                      </div>
                    </div>
                ))}
              </div>
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
                className="p-2 rounded-lg bg-white"
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

// Composant de la barre latérale (inchangé)
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
                  className={`flex items-center cursor-pointer hover:bg-gray-100 rounded-lg text-xs ${
                    isSelected ? "text-[#6BA8F4] bg-[rgba(107,168,244,0.3)]" : "text-[#3B4540]"
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
