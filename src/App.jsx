import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles, Lightbulb, AlignJustify, Clock, FlaskConical, Users, Home,
  GraduationCap, Building, Heart, Music, Hand, Mail, Phone,
  Film, List, X, PlayCircle
} from "lucide-react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// All styles are defined inline within this <style> tag for self-containment.
const GlobalStyles = () => (
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

      body {
        background-color: var(--page-bg-color);
      }

      h1, h2, h3, h4, h5, h6 { 
        font-family: 'Fraunces', serif; 
        color: var(--heading-color); 
      }
      p, li { 
        font-family: 'Nobile', sans-serif; 
        color: var(--body-color); 
        line-height: var(--body-line-height); 
      }

      .custom-shadow {
        box-shadow: 6px 6px 0px var(--secondary-accent);
      }
      
      /* CSS for the Present Mode fade transition */
      .fade-enter {
        opacity: 0;
      }
      .fade-enter-active {
        opacity: 1;
        transition: opacity 500ms ease-in-out;
      }
      .fade-exit {
        opacity: 1;
      }
      .fade-exit-active {
        opacity: 0;
        transition: opacity 500ms ease-in-out;
      }
    `}
  </style>
);

// --- Reusable Components ---

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl overflow-hidden custom-shadow p-6 mb-8 md:mb-12 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const Button = ({ children, className = "", ...props }) => (
  <button
    className={`bg-[#438951] text-white px-6 py-3 rounded-lg text-xl font-bold hover:bg-[#3B7243] transition-colors duration-200 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Testimonial = ({ quote, author }) => (
  <div 
    className="relative p-6 mt-12 mb-4 border-t-8 border-t-[#438951] bg-[#FAFFFA] rounded-xl"
    style={{ borderColor: 'var(--primary-accent)' }}
  >
    <div className="absolute -top-4 left-6 w-12 h-12 bg-[#438951] rounded-full flex items-center justify-center text-white text-2xl font-bold">
      <span className="leading-none" style={{ fontFamily: 'sans-serif' }}>&ldquo;</span>
    </div>
    <p className="mt-4 italic text-lg text-gray-700">{quote}</p>
    <p className="mt-4 text-right font-bold text-gray-900">— {author}</p>
  </div>
);

// --- Sidebar Component ---

const Sidebar = ({
  slides,
  activeIndex,
  onSelect,
  onClose,
  mode,
  setMode
}) => {
  const [width, setWidth] = useState(240); // adjustable width in px
  const sidebarRef = useRef(null);
  const dragHandleRef = useRef(null);

  const startResize = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = width;

    const onMouseMove = (eMove) => {
      const newWidth = Math.min(
        320,
        Math.max(120, startWidth + eMove.clientX - startX)
      );
      setWidth(newWidth);
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      ref={sidebarRef}
      className="relative flex flex-col h-full bg-[#CCDBCF] transition-all duration-300 ease-in-out"
      style={{ width: `${width}px` }}
    >
      {/* Top Controls */}
      <div className="flex items-center justify-between p-4">
        {/* Mode Toggle */}
        <div className="flex items-center space-x-2 bg-white rounded-lg p-1">
          {/* Film Strip Mode Button */}
          <button
            className={`p-2 rounded-lg transition-colors duration-200 ${
              mode === "film"
                ? "bg-[#EBF3FE]"
                : "bg-transparent hover:bg-gray-200"
            }`}
            onClick={() => setMode("film")}
          >
            <Film
              className={`w-5 h-5 transition-colors duration-200 ${
                mode === "film"
                  ? "stroke-[#223F6A]"
                  : "stroke-gray-500 hover:stroke-[#223F6A]"
              }`}
            />
          </button>
          {/* List Mode Button */}
          <button
            className={`p-2 rounded-lg transition-colors duration-200 ${
              mode === "list"
                ? "bg-[#EBF3FE]"
                : "bg-transparent hover:bg-gray-200"
            }`}
            onClick={() => setMode("list")}
          >
            <List
              className={`w-5 h-5 transition-colors duration-200 ${
                mode === "list"
                  ? "stroke-[#223F6A]"
                  : "stroke-gray-500 hover:stroke-[#223F6A]"
              }`}
            />
          </button>
        </div>

        {/* Close Button */}
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-200 transition-colors duration-200">
          <X className="w-5 h-5 stroke-gray-500 hover:stroke-gray-800" />
        </button>
      </div>

      {/* Slide List */}
      <div className="flex-1 overflow-y-auto p-4">
        {slides.map((slide, index) => {
          const isSelected = index === activeIndex;
          const isListMode = mode === "list";

          return (
            <div
              key={index}
              onClick={() => onSelect(index)}
              className={`
                flex items-center cursor-pointer mb-2 rounded-lg transition-colors duration-200 p-2
                ${isListMode ? "hover:bg-gray-100" : ""}
                ${isSelected
                  ? "text-[#6BA8F4] bg-[rgba(107,168,244,0.3)]"
                  : "text-[#3B4540] bg-transparent"
                }
              `}
            >
              {/* Number Column (List Mode Only) */}
              {isListMode && (
                <div
                  className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full mr-2
                    ${isSelected ? "bg-[#EBF3FE]" : "bg-gray-200"}
                  `}
                >
                  <span className="font-bold text-sm">{index + 1}</span>
                </div>
              )}

              {/* Content Column */}
              <div className="flex items-center flex-1">
                {mode === "film" ? (
                  <div className="relative">
                    <img
                      src={slide.thumbnail}
                      alt={`Thumbnail of slide ${index + 1}`}
                      className={`w-full h-auto object-cover rounded-md border-2 transition-colors duration-200 
                        ${isSelected ? "border-[#6BA8F4]" : "border-transparent"}
                      `}
                    />
                  </div>
                ) : (
                  <>
                    {slide.icon && (
                      <slide.icon
                        className={`w-5 h-5 mr-2 transition-colors duration-200 ${
                          isSelected
                            ? "stroke-[#6BA8F4] fill-none"
                            : "stroke-[#3B4540]"
                        }`}
                      />
                    )}
                    <span className={`flex-1 ${isListMode ? "truncate" : ""}`}>{slide.title}</span>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Width Adjust Handle */}
      <div
        ref={dragHandleRef}
        className="absolute top-0 right-0 h-full w-2 cursor-col-resize bg-transparent"
        onMouseDown={startResize}
        onTouchStart={startResize}
      />
    </div>
  );
};


// --- The Main App Component ---

export default function App() {
  // State for the sidebar, presentation mode, and active card
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [sidebarMode, setSidebarMode] = useState("list");

  // Data for the slides/cards
  const slides = [
    { title: "Card 1 Title", icon: Home, thumbnail: "https://placehold.co/100x60/4A644E/FAFFFA?text=1" },
    { title: "Card 2 Title", icon: Sparkles, thumbnail: "https://placehold.co/100x60/4A644E/FAFFFA?text=2" },
    { title: "Card 3 Title", icon: Lightbulb, thumbnail: "https://placehold.co/100x60/4A644E/FAFFFA?text=3" },
    { title: "Card 4 Title", icon: FlaskConical, thumbnail: "https://placehold.co/100x60/4A644E/FAFFFA?text=4" },
    { title: "Card 5 Title", icon: Users, thumbnail: "https://placehold.co/100x60/4A644E/FAFFFA?text=5" },
    { title: "Card 6 Title", icon: GraduationCap, thumbnail: "https://placehold.co/100x60/4A644E/FAFFFA?text=6" },
    { title: "Card 7 Title", icon: Building, thumbnail: "https://placehold.co/100x60/4A644E/FAFFFA?text=7" },
    { title: "Card 8 Title", icon: Heart, thumbnail: "https://placehold.co/100x60/4A644E/FAFFFA?text=8" },
    { title: "Card 9 Title", icon: Music, thumbnail: "https://placehold.co/100x60/4A644E/FAFFFA?text=9" },
    { title: "Card 10 Title", icon: Hand, thumbnail: "https://placehold.co/100x60/4A644E/FAFFFA?text=10" },
    { title: "Card 11 Title", icon: Mail, thumbnail: "https://placehold.co/100x60/4A644E/FAFFFA?text=11" },
    { title: "Block 12 Title", icon: Phone, thumbnail: "https://placehold.co/100x60/4A644E/FAFFFA?text=12" },
  ];

  // Function to toggle the sidebar
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  
  // Function to toggle presentation mode
  const togglePresentMode = () => setIsPresentationMode(!isPresentationMode);

  // Function to handle card selection from the sidebar
  const handleSelectCard = (index) => {
    setActiveIndex(index);
    if (!isPresentationMode && window.innerWidth < 768) {
      setIsSidebarOpen(false); // Close sidebar on mobile after selection
    }
    document.getElementById(`card-${index}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    // Scroll to the active card on initial load or index change
    document.getElementById(`card-${activeIndex}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [activeIndex]);

  return (
    <>
      <GlobalStyles />
      <div className="min-h-screen flex bg-[var(--page-bg-color)]">
        {/* Sidebar */}
        {isSidebarOpen && (
          <Sidebar
            slides={slides}
            activeIndex={activeIndex}
            onSelect={handleSelectCard}
            onClose={toggleSidebar}
            mode={sidebarMode}
            setMode={setSidebarMode}
          />
        )}

        {/* Main Content Area */}
        <main className={`flex-1 p-4 transition-all duration-300 ${isSidebarOpen ? 'ml-0 md:ml-4' : ''}`}>
          {/* Top Bar with Sidebar and Present Mode buttons */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg bg-white custom-shadow hover:bg-gray-100 transition-colors duration-200 md:hidden"
            >
              <AlignJustify className="w-6 h-6 stroke-gray-600" />
            </button>
            <h1 className="text-3xl md:text-4xl font-bold flex-1 text-center md:text-left">
              My Awesome Project
            </h1>
            <button
              onClick={togglePresentMode}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg custom-shadow transition-colors duration-200
                ${isPresentationMode ? 'bg-[#438951] text-white' : 'bg-white text-gray-800 hover:bg-gray-100'}
              `}
            >
              <PlayCircle className="w-5 h-5" />
              <span>Present</span>
            </button>
          </div>

          {/* Cards Section */}
          <TransitionGroup>
            {isPresentationMode ? (
              <CSSTransition
                key={activeIndex}
                timeout={500}
                classNames="fade"
              >
                {/* Present Mode: Show only the active card */}
                <div id={`card-${activeIndex}`} className="max-w-4xl mx-auto">
                  <h2 className="text-2xl font-bold mb-4">{slides[activeIndex].title}</h2>
                  <Card key={activeIndex}>
                    <p className="text-lg">Content for {slides[activeIndex].title}.</p>
                    <img
                      src={slides[activeIndex].thumbnail}
                      alt={`Thumbnail of slide ${activeIndex + 1}`}
                      className="w-full h-auto rounded-lg mt-4"
                    />
                  </Card>
                </div>
              </CSSTransition>
            ) : (
              // Normal View: Show all cards
              <div className="space-y-8 md:space-y-12">
                {/* Card 1 */}
                <Card id="card-0">
                  <h2 className="text-2xl font-bold mb-4">Card 1: Project Overview</h2>
                  <div className="md:flex md:items-center">
                    <img 
                      src="https://placehold.co/400x300/4A644E/FAFFFA?text=Card_1.png" 
                      alt="Placeholder for Card 1" 
                      className="rounded-lg md:w-1/2 md:mr-6 w-full mb-4 md:mb-0" 
                    />
                    <p className="text-lg">This is the introductory card. It provides a brief overview of the project, setting the stage for the rest of the content. It highlights the main goals and features to be discussed. The layout uses a responsive two-column design on larger screens, with the image and text side-by-side.</p>
                  </div>
                </Card>

                {/* Card 2 */}
                <Card id="card-1">
                  <h2 className="text-2xl font-bold mb-4">Card 2: Our Vision</h2>
                  <div className="md:flex md:items-center md:flex-row-reverse">
                    <img 
                      src="https://placehold.co/400x300/4A644E/FAFFFA?text=Card_2.png" 
                      alt="Placeholder for Card 2" 
                      className="rounded-lg md:w-1/2 md:ml-6 w-full mb-4 md:mb-0" 
                    />
                    <p className="text-lg">This card details the vision behind the project. It describes the core philosophy and the long-term goals. The layout is an alternate two-column design, with the image on the right side for visual variety and to keep the user engaged.</p>
                  </div>
                </Card>

                {/* Card 3 */}
                <Card id="card-2">
                  <h2 className="text-2xl font-bold mb-4">Card 3: Testimonial</h2>
                  <div className="flex flex-col">
                    <p className="text-lg">A testimonial from a satisfied user or client is a great way to build credibility. This card is dedicated to showcasing such a quote.</p>
                    <Testimonial
                      quote="This product has fundamentally changed how we approach our daily tasks. The design is intuitive and the results are exceptional."
                      author="Jane Doe, CEO"
                    />
                  </div>
                </Card>

                {/* Card 4 */}
                <Card id="card-3">
                  <h2 className="text-2xl font-bold mb-4">Card 4: Our Process</h2>
                  <div className="md:grid md:grid-cols-2 md:gap-8">
                    <div className="flex flex-col">
                      <p className="text-lg mb-4">This section illustrates our project's workflow using a visual diagram. The diagram helps to simplify a complex process into a clear, easy-to-understand format. This layout highlights the importance of the visual element in communication.</p>
                      <img 
                        src="https://placehold.co/400x300/4A644E/FAFFFA?text=Card_4a.png" 
                        alt="Placeholder for Card 4a" 
                        className="rounded-lg w-full mb-4 md:mb-0" 
                      />
                    </div>
                    {/* Placeholder for SVG diagram based on instructions */}
                    <div className="bg-[#DEEEE1] p-6 rounded-lg flex items-center justify-center">
                      <div className="relative w-full h-full">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="40" stroke="#438951" strokeWidth="2" fill="none" />
                          <path d="M 50 10 L 70 40 L 30 40 Z" fill="#4A644E" />
                          <text x="50" y="55" textAnchor="middle" fontSize="10" fill="#3B4540">Diagram</text>
                        </svg>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Card 5 */}
                <Card id="card-4">
                  <h2 className="text-2xl font-bold mb-4">Card 5: Team Members</h2>
                  <div className="md:flex md:items-center">
                    <img 
                      src="https://placehold.co/400x300/4A644E/FAFFFA?text=Card_5.png" 
                      alt="Placeholder for Card 5" 
                      className="rounded-lg md:w-1/2 md:mr-6 w-full mb-4 md:mb-0" 
                    />
                    <p className="text-lg">Meet the amazing people behind the project. This card introduces the team members, highlighting their roles and contributions. The human element is crucial for building trust and a connection with the audience. Another two-column layout is used here.</p>
                  </div>
                </Card>
                
                {/* Card 6 */}
                <Card id="card-5">
                  <h2 className="text-2xl font-bold mb-4">Card 6: Key Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
                    <p>Feature 1: A brief description of the first key feature. It's a single paragraph explaining what it is and its benefits to the user.</p>
                    <p>Feature 2: A brief description of the second key feature. This paragraph also explains its function and how it adds value to the product or service.</p>
                    <p>Feature 3: A brief description of the third key feature. The purpose of this text is to provide a concise summary of the functionality.</p>
                    <p>Feature 4: A brief description of the fourth key feature. This final paragraph summarizes the last key feature and its impact.</p>
                  </div>
                </Card>

                {/* Card 7 */}
                <Card id="card-6">
                  <h2 className="text-2xl font-bold mb-4">Card 7: The Journey So Far</h2>
                  <div className="md:flex md:items-center md:flex-row-reverse">
                    <img 
                      src="https://placehold.co/400x300/4A644E/FAFFFA?text=Card_7.png" 
                      alt="Placeholder for Card 7" 
                      className="rounded-lg md:w-1/2 md:ml-6 w-full mb-4 md:mb-0" 
                    />
                    <p className="text-lg">A timeline of our journey, from the initial idea to the current stage. This card tells a story and shows the project's evolution over time. It uses the alternate two-column layout to vary the visual flow.</p>
                  </div>
                </Card>

                {/* Card 8 */}
                <Card id="card-7">
                  <h2 className="text-2xl font-bold mb-4">Card 8: System Architecture</h2>
                  <div className="md:grid md:grid-cols-2 md:gap-8">
                    <div className="flex flex-col">
                      <p className="text-lg mb-4">This diagram visually represents the system's architecture, making a technical topic accessible. It shows how different components interact to create the final product. The layout places a description alongside the visual element.</p>
                    </div>
                    <div className="bg-[#DEEEE1] p-6 rounded-lg flex items-center justify-center">
                      <div className="relative w-full h-full">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <rect x="10" y="10" width="30" height="30" fill="#438951" />
                          <rect x="60" y="10" width="30" height="30" fill="#4A644E" />
                          <rect x="35" y="60" width="30" height="30" fill="#3B4540" />
                          <line x1="25" y1="40" x2="50" y2="60" stroke="#405449" strokeWidth="2" />
                          <line x1="75" y1="40" x2="50" y2="60" stroke="#405449" strokeWidth="2" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Card 9 */}
                <Card id="card-8">
                  <h2 className="text-2xl font-bold mb-4">Card 9: Community</h2>
                  <div className="md:flex md:items-center">
                    <img 
                      src="https://placehold.co/400x300/4A644E/FAFFFA?text=Card_9.png" 
                      alt="Placeholder for Card 9" 
                      className="rounded-lg md:w-1/2 md:mr-6 w-full mb-4 md:mb-0" 
                    />
                    <p className="text-lg">We are building a vibrant community. This card shows images and highlights the community's role in the project. The layout with the image on the left and text on the right is used again to maintain a consistent style.</p>
                  </div>
                </Card>

                {/* Card 10 */}
                <Card id="card-9">
                  <h2 className="text-2xl font-bold mb-4">Card 10: Pricing & Plans</h2>
                  <div className="md:flex md:items-center md:flex-row-reverse">
                    <img 
                      src="https://placehold.co/400x300/4A644E/FAFFFA?text=Card_10.png" 
                      alt="Placeholder for Card 10" 
                      className="rounded-lg md:w-1/2 md:ml-6 w-full mb-4 md:mb-0" 
                    />
                    <p className="text-lg">Details about our pricing models and different plans. This card is important for converting visitors into users. The alternate layout is used here to keep the flow engaging.</p>
                  </div>
                </Card>
                
                {/* Card 11 */}
                <Card id="card-10">
                  <h2 className="text-2xl font-bold mb-4">Card 11: Call to Action</h2>
                  <div className="md:flex md:items-center">
                    <img 
                      src="https://placehold.co/400x300/4A644E/FAFFFA?text=Card_11.png" 
                      alt="Placeholder for Card 11" 
                      className="rounded-lg md:w-1/2 md:mr-6 w-full mb-4 md:mb-0" 
                    />
                    <div className="flex flex-col">
                      <p className="text-lg mb-4">This is the final card, designed to prompt the user to take action. It could be to sign up, contact us, or learn more. A prominent button is used to guide the user's next step.</p>
                      <Button>Get Started</Button>
                    </div>
                  </div>
                </Card>

                {/* Block 12 */}
                <Card id="card-11" className="bg-[#4A644E] text-white">
                  <h2 className="text-2xl font-bold mb-4 text-white">Block 12: Contact Information</h2>
                  <div className="md:flex md:items-center">
                    <img 
                      src="https://placehold.co/400x300/3B4540/FAFFFA?text=Block_12.png" 
                      alt="Placeholder for Block 12" 
                      className="rounded-lg md:w-1/2 md:mr-6 w-full mb-4 md:mb-0" 
                    />
                    <p className="text-lg text-gray-200">
                      You can reach out to us via phone or email. Our team is always ready to answer your questions and help you get started. We look forward to hearing from you!
                    </p>
                  </div>
                </Card>
              </div>
            )}
          </TransitionGroup>
        </main>
      </div>
    </>
  );
}

