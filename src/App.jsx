import React, { useState, useRef, useEffect, useCallback } from "react";
import { Sparkles, Users, Home, GraduationCap, Building, Mail, Phone, X, Book, Youtube, ArrowRight } from "lucide-react";

// Import local images based on the updated inventory
import Card_1 from './assets/images/Card_1.png';
import Card_2 from './assets/images/Card_2.png';
// Card 3: No image provided, will use placeholder
// Card 3a: No image provided, will use placeholder
import Card_4_SVG from './assets/images/Card_4.svg';
import Card_4a_PNG from './assets/images/Card_4a.png';
import Card_5 from './assets/images/Card_5.png';
// Card 6: No image provided, will use placeholder
import Card_7 from './assets/images/Card_7.png';
import Card_8_SVG from './assets/images/Card_8.svg';
import Card_9 from './assets/images/Card_9.png';
import Card_10 from './assets/images/Card_10.png';
import Card_11 from './assets/images/Card_11.png';
import Block_12 from './assets/images/Block_12.png';

// The main App component that renders the entire landing page.
export default function App() {
  // State for the sidebar view type and the currently active section.
  const [viewType, setViewType] = useState('listStrip');
  const [activeSection, setActiveSection] = useState('');
  // State to control sidebar animation visibility (for initial button appearance)
  const [sidebarVisible, setSidebarVisible] = useState(false);
  // State to control sidebar expansion (button to full sidebar)
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  // State to control the width of the expanded sidebar (in pixels)
  const [sidebarWidth, setSidebarWidth] = useState(128); // Default expanded width (w-32)
  // State to track if the sidebar is currently being dragged
  const [isDragging, setIsDragging] = useState(false);
  // Ref to store the initial mouse X position when dragging starts
  const initialMouseX = useRef(0);
  // Ref to store the initial sidebar width when dragging starts
  const initialSidebarWidth = useRef(0);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Handle contact form input changes
  const handleContactChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    });
  };

  // Handle contact form submission
  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert(`Merci, ${contactForm.name}! Votre message a été envoyé.`);
    // Here you would typically send the form data to a server
    console.log(contactForm);
    setContactForm({ name: '', email: '', message: '' });
  };

  // --- Sidebar & Intersection Observer Setup ---
  // Define the sections to be tracked by the sidebar.
  const sections = [
    { id: 'hero-section', title: 'La 3ème Voie Éducative', thumbnail: Card_1 },
    { id: 'about-me-section', title: 'Qui suis-je?', thumbnail: Card_2 },
    { id: 'impossible-choice-section', title: 'Le choix impossible', thumbnail: 'https://placehold.co/80x50/FAFFFA/405449?text=Choix' },
    { id: 'third-way-principles', title: 'La 3e Voie', thumbnail: 'https://placehold.co/80x50/438951/FFFFFF?text=Voie' },
    { id: 'inclusive-education-section', title: 'Éducation Inclusive', thumbnail: Card_4a_PNG },
    { id: 'principles-diagram', title: 'Principes', thumbnail: Card_4_SVG },
    { id: 'learning-approach', title: 'Apprentissage', thumbnail: Card_7 },
    { id: 'my-role-section', title: 'Mon rôle', thumbnail: Card_5 },
    { id: 'who-i-accompany', title: 'Qui j\'accompagne', thumbnail: Card_7 },
    { id: 'my-services-section', title: 'Mes services', thumbnail: Card_8_SVG },
    { id: 'five-pillars-section', title: 'Les 5 piliers', thumbnail: Card_9 },
    { id: 'testimonials-section', title: 'Témoignages', thumbnail: Card_10 },
    { id: 'contact-section', title: 'Contact', thumbnail: Card_11 }, // Using Card_11 for contact thumbnail
    { id: 'free-resources-section', title: 'Ressources', thumbnail: Block_12 },
    { id: 'capsules-banner', title: 'Capsules', thumbnail: 'https://placehold.co/80x50/C1EBE2/3B4540?text=Capsules' },
  ];

  // Create a ref for each section to be observed.
  const sectionRefs = useRef({});
  sections.forEach(section => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    sectionRefs.current[section.id] = useRef(null);
  });

  // Effect for initial sidebar button animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setSidebarVisible(true);
    }, 100); // Small delay to ensure CSS transition applies
    return () => clearTimeout(timer);
  }, []);

  // useEffect hook to set up the Intersection Observer.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5, // Trigger when 50% of the element is visible.
      }
    );

    Object.values(sectionRefs.current).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs.current).forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [sectionRefs]);

  // Function to smoothly scroll to a section in the main content.
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Effect to scroll the sidebar itself when a new section becomes active
  useEffect(() => {
    if (isSidebarExpanded && activeSection) {
      const sidebarItemElement = document.querySelector(`#sidebar-item-${activeSection}`);
      if (sidebarItemElement) {
        sidebarItemElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [activeSection, isSidebarExpanded]);

  // --- Sidebar Resizing Logic ---
  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    const dx = e.clientX - initialMouseX.current;
    let newWidth = initialSidebarWidth.current + dx;

    // Constrain the sidebar width
    const minWidth = 96; // Corresponds to w-24 (1.5 inches)
    const maxWidth = 256; // Corresponds to w-64 (4 inches)
    newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));

    setSidebarWidth(newWidth);
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    // Remove global event listeners
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    initialMouseX.current = e.clientX;
    initialSidebarWidth.current = sidebarWidth;
    // Add global event listeners for mousemove and mouseup
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }, [sidebarWidth, handleMouseMove, handleMouseUp]);

  // --- Custom UI components ---
  const Card = ({ children, className = "", style = {} }) => (
    <div className={`bg-white rounded-2xl ${className}`} style={style}>
      {children}
    </div>
  );

  const CardContent = ({ children, className = "" }) => (
    <div className={`p-4 ${className}`}>{children}</div>
  );

  const Button = ({ children, className = "", style = {}, onClick }) => (
    <button className={`bg-green-700 text-white px-6 py-3 rounded-lg text-xl font-extrabold transition-transform transform hover:scale-105 ${className}`} style={style} onClick={onClick}>
      {children}
    </button>
  );

  const Testimonial = ({ quote, attribution }) => (
    <div
      className="relative p-6 rounded-lg mb-8 min-h-[150px]"
      style={{
        backgroundColor: '#FAFFFA',
        borderTop: '8px solid #438951',
        borderLeft: '1px solid #D6E0D6',
        borderRight: '1px solid #D6E0D6',
        borderBottom: '1px solid #D6E0D6'
      }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#438951' }}>
        <span className="absolute left-2 top-2 text-3xl font-fraunces text-white leading-none">“</span>
        <span className="absolute right-2 bottom-2 text-3xl font-fraunces text-white leading-none">”</span>
      </div>
      <div className="mt-8">
        <p className="italic text-lg text-gray-700 mt-4 mb-4">{`"${quote}"`}</p>
        <p className="text-left text-sm text-gray-500 font-extrabold">{attribution}</p>
      </div>
    </div>
  );

  const ServiceCard = ({ icon, title, description, className = '' }) => (
    <div className={`flex flex-col items-center text-center p-6 rounded-2xl min-h-[200px] ${className}`} style={{ backgroundColor: '#FAFFFA', border: '1px solid #D1D5DB' }}>
      <div className="bg-[#DEEEE1] p-3 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-extrabold mb-2" style={{ color: '#3B4540' }}>{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );

  // Film Strip SVG Icon component (black and white)
  const FilmStripIcon = ({ color = '#3B4540' }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 3H6C4.89543 3 4 3.89543 4 5V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V5C20 3.89543 19.1046 3 18 3Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 3V21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 3V21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 8H20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 16H20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="6" cy="6" r="1" fill={color}/>
      <circle cx="6" cy="10" r="1" fill={color}/>
      <circle cx="6" cy="14" r="1" fill={color}/>
      <circle cx="6" cy="18" r="1" fill={color}/>
      <circle cx="18" cy="6" r="1" fill={color}/>
      <circle cx="18" cy="10" r="1" fill={color}/>
      <circle cx="18" cy="14" r="1" fill={color}/>
      <circle cx="18" cy="18" r="1" fill={color}/>
    </svg>
  );

  // List SVG Icon component (black and white)
  const ListIcon = ({ color = '#3B4540' }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 6H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 12H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 18H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 6H3.01" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 12H3.01" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 18H3.01" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <div className="relative min-h-screen p-6 md:p-12" style={{
      backgroundColor: '#DEEEE1',
      fontFamily: '"Nobile", sans-serif'
    }}>
      {/* --- Floating Sidebar --- */}
      <div
        className={`fixed top-1/2 left-4 transform -translate-y-1/2 z-50 transition-all duration-500 ease-out ${sidebarVisible ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ width: isSidebarExpanded ? `${sidebarWidth}px` : '48px', height: isSidebarExpanded ? 'auto' : '96px' }}
      >
        {!isSidebarExpanded ? (
          <button
            onClick={() => setIsSidebarExpanded(true)}
            className="w-full h-full bg-[#EBF3FE] rounded-lg shadow-lg flex items-center justify-center p-2 cursor-pointer hover:bg-[#6BA8F4] transition-colors duration-300"
            style={{ borderRadius: '0.5rem' }}
          >
            <FilmStripIcon color="#3B4540" />
          </button>
        ) : (
          <div className="relative flex flex-col items-center gap-2 p-2 bg-white rounded-xl shadow-lg border border-gray-200 h-full overflow-hidden">
            {/* Drag Handle */}
            <div
              className="absolute right-0 top-0 h-full w-2 cursor-ew-resize z-50"
              onMouseDown={handleMouseDown}
            ></div>

            {/* Top row for toggle switch and close button */}
            <div className="flex justify-between items-center w-full">
              {/* Toggle Switch for view type with SVG icons */}
              <div className="flex bg-gray-200 rounded-full p-0.5">
                <button
                  onClick={() => setViewType('filmStrip')}
                  className={`flex items-center justify-center p-1.5 rounded-full transition-colors duration-300 ${viewType === 'filmStrip' ? 'bg-[#6BA8F4]' : 'hover:bg-gray-300'}`}
                >
                  <FilmStripIcon color={viewType === 'filmStrip' ? 'white' : '#3B4540'} />
                </button>
                <button
                  onClick={() => setViewType('listStrip')}
                  className={`flex items-center justify-center p-1.5 rounded-full transition-colors duration-300 ${viewType === 'listStrip' ? 'bg-[#6BA8F4]' : 'hover:bg-gray-300'}`}
                >
                  <ListIcon color={viewType === 'listStrip' ? 'white' : '#3B4540'} />
                </button>
              </div>
              {/* Close Sidebar Button */}
              <button
                onClick={() => setIsSidebarExpanded(false)}
                className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
              >
                <X size={18} color="#3B4540" />
              </button>
            </div>

            <div className="w-full h-px bg-gray-300 my-1"></div>
              
            {/* Sidebar Content (Thumbnails or List) */}
            <div className="flex flex-col items-center gap-1 w-full flex-grow overflow-y-auto" style={{ maxHeight: 'calc(100vh - 120px)' }}>
              {sections
                .map((section, index) => (
                <div
                  key={section.id}
                  id={`sidebar-item-${section.id}`}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full cursor-pointer transition-all duration-300 rounded-lg p-1
                    ${activeSection === section.id
                      ? 'bg-[rgba(107,168,244,0.3)] text-[#6BA8F4] transform scale-105 border-2 border-blue-600'
                      : 'hover:bg-gray-100'
                    }`}
                  style={viewType === 'filmStrip' ? { height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' } : {}}
                >
                  {viewType === 'filmStrip' ? (
                    <div className="relative w-full h-full">
                      <img src={section.thumbnail} alt={section.title} className="block w-full h-full object-cover rounded-md max-w-full max-h-full" />
                      <div className="absolute top-1 left-1 bg-black bg-opacity-50 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {index + 1}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center w-full overflow-hidden">
                      <span className={`text-xs font-bold mr-2 flex-shrink-0 ${activeSection === section.id ? 'text-[#6BA8F4]' : 'text-gray-500'}`}>
                        {index + 1}.
                      </span>
                      <p className={`text-xs text-left truncate whitespace-nowrap transition-colors duration-300 ${activeSection === section.id ? 'font-bold text-[#6BA8F4]' : 'text-gray-700'}`}>
                        {section.title}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* --- Main Content --- */}
      <div className="max-w-4xl mx-auto" style={{ marginLeft: isSidebarExpanded ? `${sidebarWidth + 20}px` : 'auto' }}>

        {/* Card 1 - The main header/hero section. */}
        <section id="hero-section" ref={sectionRefs.current['hero-section']} className="bg-white rounded-2xl p-0 mb-10 flex flex-col md:flex-row items-stretch custom-shadow mx-auto min-h-[350px] w-full">
          <div className="overflow-hidden rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none md:w-[35%]">
            <img
              src={Card_1}
              alt="Enfant et adulte assis dans un espace d’apprentissage lumineux et coloré, inspiré de la pédagogie Montessori"
              title="Enfant et adulte assis dans un espace d’apprentissage lumineux et coloré, inspiré de la pédagogie Montessori"
              className="block w-full h-full object-cover max-w-full max-h-full"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x600/C1EBE2/3B4540?text=La+3eme+Voie+Educative"; }}
            />
          </div>
          <div className="p-6 md:p-10 flex flex-col justify-center text-left md:w-[65%]">
            <h1 className="text-4xl font-extrabold mb-6" style={{ color: '#3B4540' }}>La 3ème Voie Éducative</h1>
            <p className="text-lg" style={{ color: '#405449' }}>
              Une approche humaine, vivante et libre pour les enfants atypiques et leurs familles.
            </p>
          </div>
        </section>

        {/* Card 2 - "Qui suis-je?" - Two-column layout. */}
        <section id="about-me-section" ref={sectionRefs.current['about-me-section']} className="w-full mb-10">
          <Card className="p-0 custom-shadow w-full min-h-[400px]" style={{ backgroundColor: '#FAFFFA' }}>
            <CardContent className="flex flex-col md:flex-row items-stretch p-0 h-full">
              <div className="md:w-[65%] p-6 flex flex-col justify-center text-left">
                <h2 className="text-4xl font-extrabold mb-8">Qui suis-je?</h2>
                <p className="mb-4">
                  Je m'appelle Marie. Je suis enseignante, éducatrice, protectrice de parcours singuliers.
                </p>
                <p>
                  Depuis des années, j'accompagne des enfants entre 3 et 6 ans — des enfants joyeux, silencieux, agités, oubliés, étiquetés... Des enfants qui ne rentrent pas dans le moule qu'on leur impose.
                </p>
              </div>
              <div className="md:w-[35%] h-full overflow-hidden rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none">
                <img
                  src={Card_2}
                  alt="Éducatrice bienveillante avec enfants dans un cadre d’éducation alternative"
                  title="Éducatrice bienveillante avec enfants dans un cadre d’éducation alternative"
                  className="block w-full h-full object-cover max-w-full max-h-full"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x600/DDEFE3/559E60?text=Kids+and+Teacher"; }}
                />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Card 3 - "Le choix impossible des parents" - Three-column card. */}
        <section id="impossible-choice-section" ref={sectionRefs.current['impossible-choice-section']} className="w-full mb-10">
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
        </section>

        {/* Card 3a: La 3e Voie - A new card based on the user-provided image */}
        <section id="third-way-principles" ref={sectionRefs.current['third-way-principles']} className="w-full mb-10 p-6 md:p-10 rounded-2xl custom-shadow" style={{ backgroundColor: '#438951' }}>
          <h2 className="text-4xl font-extrabold mb-8 text-white">La 3e Voie</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            <div className="p-6 rounded-2xl min-h-[150px]" style={{ backgroundColor: '#559E60', border: '1px solid #ffffff' }}>
              <h3 className="text-xl font-extrabold mb-2 text-white">Entre deux extrêmes</h3>
              <p className="text-white">
                Une alternative entre l'école classique rigide et l'exclusion vers des structures spécialisées.
              </p>
            </div>
            <div className="p-6 rounded-2xl min-h-[150px]" style={{ backgroundColor: '#559E60', border: '1px solid #ffffff' }}>
              <h3 className="text-xl font-extrabold mb-2 text-white">Personnalisée</h3>
              <p className="text-white">
                Adaptée au rythme unique de chaque enfant, respectueuse de ses besoins spécifiques.
              </p>
            </div>
            <div className="p-6 rounded-2xl min-h-[150px]" style={{ backgroundColor: '#559E60', border: '1px solid #ffffff' }}>
              <h3 className="text-xl font-extrabold mb-2 text-white">Inclusive</h3>
              <p className="text-white">
                Les parents sont pleinement intégrés dans le processus éducatif de leur enfant.
              </p>
            </div>
          </div>
        </section>

        {/* New Section for Card_4a_PNG: Inclusive Education */}
        <section id="inclusive-education-section" ref={sectionRefs.current['inclusive-education-section']} className="w-full mb-10">
          <Card className="p-6 custom-shadow w-full" style={{ backgroundColor: '#FAFFFA' }}>
            <CardContent className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <img
                  src={Card_4a_PNG}
                  alt="Enseignante attentionnée avec enfants d’origines diverses dans une classe lumineuse et sécurisante"
                  title="Enseignante attentionnée avec enfants d’origines diverses dans une classe lumineuse et sécurisante"
                  className="block w-full h-auto max-w-full max-h-full rounded-lg"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/C1EBE2/3B4540?text=Education+Inclusive"; }}
                />
              </div>
              <div className="md:w-1/2 text-left">
                <h2 className="text-4xl font-extrabold mb-8">Une éducation vraiment inclusive</h2>
                <p className="mb-4">
                  Nous croyons que chaque enfant a sa place et mérite une éducation qui respecte sa singularité. Nos méthodes sont conçues pour créer un environnement où la diversité est célébrée.
                </p>
                <p>
                  L'inclusion n'est pas seulement une philosophie, c'est la pierre angulaire de notre approche, garantissant que tous les enfants se sentent valorisés et soutenus.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Card 4 - The principles of the 3rd way with an image placeholder. */}
        <section id="principles-diagram" ref={sectionRefs.current['principles-diagram']} className="w-full mb-10">
          <Card className="rounded-2xl p-6 custom-shadow w-full flex flex-col" style={{ backgroundColor: '#FAFFFA' }}>
            <h2 className="text-4xl font-extrabold mb-8 text-left">Les principes de la 3ème voie</h2>

            {/* Image for Card 4 (now SVG) */}
            <div className="flex justify-center items-center my-8 md:my-0">
              <img
                src={Card_4_SVG}
                alt="Une infographie verte avec cinq cercles reliés par des flèches. Chaque cercle contient une icône et un texte en dessous. Les étiquettes sont, de gauche à droite : « Approche adaptée », « Personnalisation », « Respect du rythme », « Espace d’expérimentation » et « Inclusion des parents »."
                title="Une infographie verte avec cinq cercles reliés par des flèches. Chaque cercle contient une icône et un texte en dessous. Les étiquettes sont, de gauche à droite : « Approche adaptée », « Personnalisation », « Respect du rythme », « Espace d’expérimentation » et « Inclusion des parents »."
                className="block w-full h-auto max-w-full max-h-full"
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/C1EBE2/3B4540?text=Diagramme+des+principes"; }}
              />
            </div>

            {/* Body text at the bottom */}
            <p className="mt-8 text-left text-lg" style={{ color: '#405449' }}>
              Un espace où la singularité de chaque enfant est célébrée et soutenue.
            </p>
          </Card>
        </section>

        {/* Card 5 - Learning Approach */}
        <section id="learning-approach" ref={sectionRefs.current['learning-approach']} className="w-full mb-10">
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
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/C1EBE2/3B4540?text=Learning+Materials"; }}
                />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Card 6 - My Role Section */}
        <section id="my-role-section" ref={sectionRefs.current['my-role-section']} className="w-full mb-10">
          <Card className="p-6 custom-shadow w-full" style={{ backgroundColor: '#FAFFFA' }}>
            <CardContent className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <img
                  src={Card_5}
                  alt="Consultante éducative accompagnant parents et enfant dans un cadre bienveillant"
                  title="Consultante éducative accompagnant parents et enfant dans un cadre bienveillant"
                  className="block w-full h-auto max-w-full max-h-full rounded-lg"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/C1EBE2/3B4540?text=Mon+Role"; }}
                />
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
                  Mon objective est de révéler le potentiel de votre enfant et de vous donner les clés pour l'accompagner au quotidien.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Card 7 - Who I Accompany */}
        <section id="who-i-accompany" ref={sectionRefs.current['who-i-accompany']} className="w-full mb-10">
          <Card className="p-6 custom-shadow w-full min-h-[200px]" style={{ backgroundColor: '#FAFFFA' }}>
            <CardContent>
              <h2 className="text-4xl font-extrabold mb-8 text-left">Qui j'accompagne?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-extrabold mb-4">Enfants atypiques</h3>
                  <ul className="list-disc list-inside mb-4">
                    <li>Hypersensibles</li>
                    <li>Précoces</li>
                    <li>TDAH</li>
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

        {/* Card 8 - My Services Section */}
        <section id="my-services-section" ref={sectionRefs.current['my-services-section']} className="w-full mb-10">
          <Card className="p-6 custom-shadow w-full" style={{ backgroundColor: '#FAFFFA' }}>
            <h2 className="text-4xl font-extrabold mb-8 text-left">Mes services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              <ServiceCard
                icon={<Building size={32} color="#438951" />}
                title="Ateliers pédagogiques"
                description="Des activités conçues pour stimuler la curiosité et l'autonomie de votre enfant."
              />
              <ServiceCard
                icon={<Users size={32} color="#438951" />}
                title="Accompagnement parental"
                description="Un soutien personnalisé pour vous aider à comprendre et à accompagner votre enfant."
              />
              <ServiceCard
                icon={<GraduationCap size={32} color="#438951" />}
                title="Consultations individuelles"
                description="Un bilan approfondi des besoins de votre enfant et des solutions sur mesure."
              />
              <ServiceCard
                icon={<Building size={32} color="#438951" />}
                title="Groupes de parole"
                description="Un espace d'échange pour les parents pour partager leurs expériences."
              />
              <ServiceCard
                icon={<Users size={32} color="#438951" />}
                title="Accompagnement à domicile"
                description="Un soutien pour l'enfant dans son environnement familial."
              />
              <ServiceCard
                icon={<GraduationCap size={32} color="#438951" />}
                title="Formation pour professionnels"
                description="Des formations pour les éducateurs et enseignants souhaitant adopter cette approche."
              />
            </div>
            <div className="flex justify-center mt-8">
              <Button onClick={() => scrollToSection('contact-section')}>
                Découvrir mes services <ArrowRight size={24} className="inline-block ml-2" />
              </Button>
            </div>
          </Card>
        </section>

        {/* Card 9 - Five Pillars Section */}
        <section id="five-pillars-section" ref={sectionRefs.current['five-pillars-section']} className="w-full mb-10">
          <Card className="p-6 custom-shadow w-full" style={{ backgroundColor: '#FAFFFA' }}>
            <CardContent className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <img
                  src={Card_9}
                  alt="Schéma visuel des cinq piliers : Respect, Bienveillance, Autonomie, Créativité et Coopération."
                  title="Schéma visuel des cinq piliers : Respect, Bienveillance, Autonomie, Créativité et Coopération."
                  className="block w-full h-auto max-w-full max-h-full rounded-lg"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/C1EBE2/3B4540?text=Les+5+piliers"; }}
                />
              </div>
              <div className="md:w-1/2 text-left">
                <h2 className="text-4xl font-extrabold mb-8">Les 5 piliers de notre philosophie</h2>
                <ul className="list-disc list-inside space-y-4 text-lg">
                  <li><span className="font-bold">Le respect du rythme de l’enfant :</span> Un apprentissage sans pression, à son propre rythme.</li>
                  <li><span className="font-bold">La bienveillance inconditionnelle :</span> Un cadre sécurisant pour s'épanouir.</li>
                  <li><span className="font-bold">Le développement de l'autonomie :</span> L'enfant est acteur de ses découvertes.</li>
                  <li><span className="font-bold">La créativité et l'expérimentation :</span> Un espace pour explorer, tester et créer.</li>
                  <li><span className="font-bold">La coopération et l’entraide :</span> L'apprentissage en groupe et le partage.</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Card 10 - Testimonials Section */}
        <section id="testimonials-section" ref={sectionRefs.current['testimonials-section']} className="w-full mb-10">
          <Card className="p-6 custom-shadow w-full" style={{ backgroundColor: '#FAFFFA' }}>
            <h2 className="text-4xl font-extrabold mb-8 text-center md:text-left">Ce que les parents en disent</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Testimonial
                quote="Marie a su voir la lumière de notre fils. Grâce à elle, il a trouvé sa place et son élan d'apprendre."
                attribution="— Elodie, maman d’un enfant précoce"
              />
              <Testimonial
                quote="J'ai retrouvé confiance en mon rôle de parent. L'accompagnement de Marie est une bouffée d'oxygène."
                attribution="— Thomas, papa d’une enfant hypersensible"
              />
              <Testimonial
                quote="L'approche de la 3ème voie a complètement transformé notre quotidien. Moins de stress, plus de bonheur."
                attribution="— Cécile, maman d’un enfant TDAH"
              />
              <Testimonial
                quote="Un soutien précieux et sur mesure. Mon enfant a fait des progrès incroyables, sans se sentir jugé."
                attribution="— Sophie, maman d’un enfant avec un TSA"
              />
            </div>
            <div className="flex justify-center mt-8">
              <Button onClick={() => scrollToSection('contact-section')}>
                Contactez-moi <ArrowRight size={24} className="inline-block ml-2" />
              </Button>
            </div>
          </Card>
        </section>

        {/* Card 11 - Contact Section */}
        <section id="contact-section" ref={sectionRefs.current['contact-section']} className="w-full mb-10">
          <Card className="p-6 custom-shadow w-full" style={{ backgroundColor: '#438951' }}>
            <CardContent className="flex flex-col md:flex-row items-stretch p-0 h-full text-white">
              <div className="md:w-1/2 p-6 flex flex-col justify-center text-left">
                <h2 className="text-4xl font-extrabold mb-8">Discutons de l'avenir de votre enfant</h2>
                <p className="text-lg mb-4">
                  Vous avez des questions ou souhaitez en savoir plus sur l'accompagnement ?
                </p>
                <p className="text-lg">
                  Laissez-moi un message, et je vous répondrai dans les plus brefs délais.
                </p>
              </div>
              <div className="md:w-1/2 p-6 md:p-10 bg-[#559E60] rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none">
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="relative">
                    <label htmlFor="name" className="text-sm font-bold text-white mb-2 block">Nom</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactChange}
                      className="w-full p-3 rounded-lg text-gray-800 bg-white border-none focus:ring-2 focus:ring-green-400"
                      required
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="email" className="text-sm font-bold text-white mb-2 block">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleContactChange}
                      className="w-full p-3 rounded-lg text-gray-800 bg-white border-none focus:ring-2 focus:ring-green-400"
                      required
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="message" className="text-sm font-bold text-white mb-2 block">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={contactForm.message}
                      onChange={handleContactChange}
                      className="w-full p-3 rounded-lg text-gray-800 bg-white border-none focus:ring-2 focus:ring-green-400"
                      required
                    ></textarea>
                  </div>
                  <Button type="submit" className="w-full bg-[#EBF3FE] text-[#438951] hover:bg-white transition-colors duration-300">
                    Envoyer <Mail size={20} className="inline-block ml-2" />
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Card 12 - Free Resources Section */}
        <section id="free-resources-section" ref={sectionRefs.current['free-resources-section']} className="w-full mb-10">
          <Card className="p-6 custom-shadow w-full" style={{ backgroundColor: '#FAFFFA' }}>
            <CardContent className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <h2 className="text-4xl font-extrabold mb-8 text-left">Ressources gratuites pour vous</h2>
                <p className="text-lg mb-4">
                  Découvrez des outils, des guides et des activités pour accompagner votre enfant au quotidien.
                </p>
                <div className="flex flex-col md:flex-row gap-4 mt-6">
                  <Button className="bg-[#438951] hover:bg-[#559E60]">
                    <Book size={20} className="inline-block mr-2" /> E-book gratuit
                  </Button>
                  <Button className="bg-gray-700 hover:bg-gray-800">
                    <Youtube size={20} className="inline-block mr-2" /> Chaîne Youtube
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2">
                <img
                  src={Block_12}
                  alt="Pile de livres sur la parentalité et l'éducation alternative avec un cahier et un stylo"
                  title="Pile de livres sur la parentalité et l'éducation alternative avec un cahier et un stylo"
                  className="block w-full h-auto max-w-full max-h-full rounded-lg"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/C1EBE2/3B4540?text=Ressources"; }}
                />
              </div>
            </CardContent>
          </Card>
        </section>
        
        {/* Card 13 - Capsules Banner */}
        <section id="capsules-banner" ref={sectionRefs.current['capsules-banner']} className="w-full mb-10 p-6 rounded-2xl custom-shadow text-center" style={{ backgroundColor: '#C1EBE2' }}>
          <h2 className="text-3xl font-extrabold mb-4" style={{ color: '#3B4540' }}>
            Découvrez nos capsules vidéo
          </h2>
          <p className="text-lg mb-6" style={{ color: '#405449' }}>
            Des vidéos courtes et inspirantes pour vous aider à comprendre la 3ème voie éducative.
          </p>
          <Button className="bg-[#EBF3FE] text-[#438951] hover:bg-white" onClick={() => window.location.href = 'https://www.youtube.com/'}>
            Voir les capsules <Youtube size={24} className="inline-block ml-2" />
          </Button>
        </section>

        {/* Footer */}
        <footer className="w-full p-6 text-center text-sm text-gray-500 mt-10">
          <p>© 2025 La 3ème Voie Éducative. Tous droits réservés.</p>
        </footer>

      </div>
    </div>
  );
}