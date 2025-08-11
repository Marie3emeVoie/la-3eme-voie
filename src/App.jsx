import React, { useState } from "react";
// Les imports d'images locaux ont été supprimés pour éviter les erreurs de compilation.
// Nous allons utiliser des URLs de placeholders pour le rendu.
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
  Menu,
  X,
  Volume2,
} from "lucide-react";

// Images de substitution pour que l'application soit fonctionnelle
const placeholderImages = {
  Card_1: "https://placehold.co/400x250/FFC107/FFFFFF?text=Card+1",
  Card_2: "https://placehold.co/400x250/FF5722/FFFFFF?text=Card+2",
  Card_3: "https://placehold.co/400x250/E91E63/FFFFFF?text=Card+3",
  Card_4: "https://placehold.co/400x250/9C27B0/FFFFFF?text=Card+4",
  Card_4a: "https://placehold.co/400x250/9C27B0/FFFFFF?text=Card+4a",
  Card_5: "https://placehold.co/400x250/673AB7/FFFFFF?text=Card+5",
  Card_6: "https://placehold.co/400x250/3F51B5/FFFFFF?text=Card+6",
  Card_7: "https://placehold.co/400x250/2196F3/FFFFFF?text=Card+7",
  Card_8: "https://placehold.co/400x250/03A9F4/FFFFFF?text=Card+8",
  Card_9: "https://placehold.co/400x250/00BCD4/FFFFFF?text=Card+9",
  Card_10: "https://placehold.co/400x250/009688/FFFFFF?text=Card+10",
  Card_11: "https://placehold.co/400x250/4CAF50/FFFFFF?text=Card+11",
  Block_12: "https://placehold.co/800x300/8BC34A/FFFFFF?text=Block+12",
};

// Composants utilitaires de Claude
function Card({ children, className = "", style = {} }) {
  return (
    <div
      className={`bg-white rounded-lg p-4 custom-shadow ${className}`}
      style={{
        ...style,
      }}
    >
      {children}
    </div>
  );
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

function Sidebar({ isOpen, onClose }) {
  const navItems = [
    { href: "#impossible-choice-section", text: "Le choix impossible" },
    { href: "#third-way-principles", text: "Les principes de la 3e voie" },
    { href: "#my-role-section", text: "Mon rôle" },
    { href: "#who-i-accompany", text: "Qui j'accompagne" },
    { href: "#my-services-section", text: "Mes services" },
    { href: "#testimonials-section", text: "Témoignages" },
    { href: "#contact-section", text: "Contact" },
    { href: "#ai-learning-ideas", text: "Idées d'apprentissage ✨" },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen w-64 bg-[#FAFFFA] border-r border-[#4A644E] p-6 overflow-y-auto z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:static lg:h-auto lg:w-64`}
    >
      <div className="flex justify-end lg:hidden">
        <button onClick={onClose} className="p-2 text-[#405449]">
          <X size={24} />
        </button>
      </div>
      <nav>
        <ul className="space-y-4">
          {navItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                className="block py-2 text-[#405449] hover:text-[#438951] transition-colors font-nobile"
                onClick={onClose}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

function CircleIcon({ icon: Icon, text }) {
  return (
    <div className="flex flex-col items-center text-center p-2">
      <div
        className="w-24 h-24 sm:w-36 sm:h-36 rounded-full flex items-center justify-center mb-2 custom-shadow"
        style={{
          border: "6px solid #438951",
          backgroundColor: "#FAFFFA",
        }}
      >
        <Icon size={40} color="#438951" />
      </div>
      <p className="font-nobile text-sm sm:text-base whitespace-pre-line">{text}</p>
    </div>
  );
}

function Testimonial({ quote, author }) {
  return (
    <blockquote className="relative p-6 rounded-lg custom-shadow bg-white font-nobile text-sm sm:text-base">
      <p className="text-lg italic text-[#405449] mb-4">{quote}</p>
      <footer className="text-sm font-bold text-[#438951] font-fraunces">- {author}</footer>
    </blockquote>
  );
}

// Composant principal de l'application
export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTtsLoading, setIsTtsLoading] = useState(false);
  const [learningIdea, setLearningIdea] = useState("");
  const [isGeneratingIdea, setIsGeneratingIdea] = useState(false);

  const circlesData = [
    { icon: Lightbulb, text: "Approche adaptée" },
    { icon: AlignJustify, text: "Personnalisation" },
    { icon: Clock, text: "Respect du rythme" },
    { icon: FlaskConical, text: "Espace d'expérimentation" },
    { icon: Users, text: "Inclusion des parents" },
  ];
  
  // Helper function to write a string to a DataView
  const writeString = (view, offset, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  // Helper function to convert base64 PCM data to a WAV Blob
  const pcmToWav = (pcm16, sampleRate) => {
    // Corrected function to create a valid WAV blob.
    const dataLength = pcm16.length * 2;
    const buffer = new ArrayBuffer(44 + dataLength);
    const view = new DataView(buffer);

    // RIFF identifier
    writeString(view, 0, 'RIFF');
    // RIFF chunk length
    view.setUint32(4, 36 + dataLength, true);
    // WAVE type
    writeString(view, 8, 'WAVE');
    // fmt chunk
    writeString(view, 12, 'fmt ');
    // fmt chunk length
    view.setUint32(16, 16, true);
    // Audio format 1=PCM
    view.setUint16(20, 1, true);
    // Number of channels
    view.setUint16(22, 1, true);
    // Sample rate
    view.setUint32(24, sampleRate, true);
    // Byte rate
    view.setUint32(28, sampleRate * 2, true);
    // Block align
    view.setUint16(32, 2, true);
    // Bits per sample
    view.setUint16(34, 16, true);
    // data chunk
    writeString(view, 36, 'data');
    // data chunk length
    view.setUint32(40, dataLength, true);

    // Copy PCM data using a more reliable typed array method
    const pcm16View = new Int16Array(buffer, 44);
    pcm16View.set(pcm16);

    return new Blob([buffer], { type: 'audio/wav' });
  };

  const base64ToArrayBuffer = (base64) => {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  };

  // Fonction pour générer et lire l'audio via l'API Gemini
  const playAudio = async (text, voiceName = "Kore") => {
    setIsTtsLoading(true);
    try {
      const payload = {
          contents: [{
              parts: [{ text: text }]
          }],
          generationConfig: {
              responseModalities: ["AUDIO"],
              speechConfig: {
                  voiceConfig: {
                      prebuiltVoiceConfig: { voiceName: voiceName }
                  }
              }
          },
          model: "gemini-2.5-flash-preview-tts"
      };

      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`;
      
      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }

      const result = await response.json();
      const part = result?.candidates?.[0]?.content?.parts?.[0];
      const audioData = part?.inlineData?.data;
      const mimeType = part?.inlineData?.mimeType;

      if (audioData && mimeType && mimeType.startsWith("audio/")) {
          const sampleRateMatch = mimeType.match(/rate=(\d+)/);
          const sampleRate = sampleRateMatch ? parseInt(sampleRateMatch[1], 10) : 16000;
          
          const pcmDataBuffer = base64ToArrayBuffer(audioData);
          const pcm16 = new Int16Array(pcmDataBuffer);

          const wavBlob = pcmToWav(pcm16, sampleRate);
          const audioUrl = URL.createObjectURL(wavBlob);
          const audio = new Audio(audioUrl);
          audio.play().catch(e => console.error("Error playing audio:", e));
          // Revoke the URL when the audio has finished playing to free up memory
          audio.addEventListener('ended', () => URL.revokeObjectURL(audioUrl));
      } else {
        console.error("Audio data or mime type missing from API response.");
      }
    } catch (error) {
      console.error("Error generating TTS audio:", error);
    } finally {
      setIsTtsLoading(false);
    }
  };


  // Fonction pour générer une idée d'apprentissage via l'API Gemini
  const generateLearningIdea = async () => {
    setIsGeneratingIdea(true);
    setLearningIdea("");
    try {
      const prompt = `Générer une idée d'activité pédagogique créative, courte et amusante pour des parents et des enfants, basée sur l'un des principes suivants : Personnalisation, Respect du rythme, Espace d'expérimentation, ou Inclusion des parents. L'idée doit être pratique et facile à réaliser à la maison.`;
      const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
      const payload = { contents: chatHistory };
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const result = await response.json();
      const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        setLearningIdea(text);
      } else {
        setLearningIdea("Erreur lors de la génération de l'idée. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur lors de la génération de l'idée :", error);
      setLearningIdea("Erreur lors de la génération de l'idée. Veuillez réessayer.");
    } finally {
      setIsGeneratingIdea(false);
    }
  };
  
  return (
    <>
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
          .font-fraunces {
            font-family: 'Fraunces', serif;
          }
          .font-nobile {
            font-family: 'Nobile', sans-serif;
          }
          h1, h2, h3, h4, h5, h6 {
            font-family: 'Fraunces', serif !important;
            color: var(--heading-color);
          }
          p, li {
            font-family: 'Nobile', sans-serif !important;
            color: var(--body-color);
            line-height: var(--body-line-height);
          }
          .custom-shadow {
            box-shadow: 6px 6px 0px var(--secondary-accent);
          }
        `}
      </style>
      
      <div className="min-h-screen bg-[#DEEEE1] flex flex-col lg:flex-row">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        {/* Toggle button for sidebar on mobile */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden fixed top-4 left-4 p-2 z-50 bg-[#FAFFFA] rounded-md custom-shadow"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <main className="flex-1 lg:ml-64 p-6 md:p-8">
          {/* Section: Le choix impossible */}
          <section id="impossible-choice-section" className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-fraunces text-center mb-6 text-[#3B4540]">Le choix impossible des parents</h1>
            <Card className="bg-[#FAFFFA]">
              <p className="font-nobile text-lg">
                "Nos parents sont confrontés à un choix difficile : imposer un cadre strict pour que leurs enfants réussissent, ou au contraire leur laisser une liberté totale au risque de les voir se perdre."
              </p>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => playAudio("Nos parents sont confrontés à un choix difficile : imposer un cadre strict pour que leurs enfants réussissent, ou au contraire leur laisser une liberté totale au risque de les voir se perdre.")}
                  className="p-2 rounded-full hover:bg-gray-200"
                  disabled={isTtsLoading}
                >
                  {isTtsLoading ? '...' : <Volume2 size={24} />}
                </button>
              </div>
            </Card>
          </section>

          {/* Section: La 3e voie éducative */}
          <section id="third-way-principles" className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-fraunces mb-6 text-[#3B4540]">La 3e voie éducative</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <img src={placeholderImages.Card_1} alt="Card 1" className="w-full rounded-md mb-4 custom-shadow" />
                <p className="font-nobile">
                  "L'accompagnement éducatif : une approche personnalisée pour guider les jeunes vers leur épanouissement."
                </p>
              </Card>
              <Card>
                <img src={placeholderImages.Card_2} alt="Card 2" className="w-full rounded-md mb-4 custom-shadow" />
                <p className="font-nobile">
                  "Développer l'autonomie et la confiance en soi tout en respectant le rythme de chacun."
                </p>
              </Card>
            </div>
          </section>

          {/* Section: Les 5 principes */}
          <section id="principles-diagram" className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-fraunces text-center mb-12 text-[#3B4540]">Les 5 principes de la 3e voie</h2>
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {circlesData.map((data, index) => (
                <CircleIcon key={index} icon={data.icon} text={data.text} />
              ))}
            </div>
          </section>

          {/* Section: Mon rôle */}
          <section id="my-role-section" className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-fraunces mb-6 text-[#3B4540]">Mon rôle</h2>
            <Card className="bg-[#FAFFFA]">
              <img src={placeholderImages.Card_10} alt="Card 10" className="w-full rounded-md mb-4 custom-shadow" />
              <p className="font-nobile text-lg">
                "Je suis un guide, un tuteur, un facilitateur de l'apprentissage."
              </p>
            </Card>
          </section>

          {/* Section: Qui j'accompagne */}
          <section id="who-i-accompany" className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-fraunces mb-6 text-[#3B4540]">Qui j'accompagne</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <img src={placeholderImages.Card_4} alt="Card 4" className="w-full rounded-md mb-4 custom-shadow" />
                <h3 className="text-xl font-fraunces mb-2">Les familles</h3>
                <p className="font-nobile">
                  "Des familles qui cherchent une alternative à l'école traditionnelle."
                </p>
              </Card>
              <Card>
                <img src={placeholderImages.Card_5} alt="Card 5" className="w-full rounded-md mb-4 custom-shadow" />
                <h3 className="text-xl font-fraunces mb-2">Les ados</h3>
                <p className="font-nobile">
                  "Les adolescents qui ont des difficultés scolaires ou qui se sentent démotivés."
                </p>
              </Card>
              <Card>
                <img src={placeholderImages.Card_6} alt="Card 6" className="w-full rounded-md mb-4 custom-shadow" />
                <h3 className="text-xl font-fraunces mb-2">Les adultes</h3>
                <p className="font-nobile">
                  "Les adultes en reconversion professionnelle ou qui souhaitent acquérir de nouvelles compétences."
                </p>
              </Card>
            </div>
          </section>

          {/* Section: Mes services */}
          <section id="my-services-section" className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-fraunces mb-6 text-[#3B4540]">Mes services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <img src={placeholderImages.Card_7} alt="Card 7" className="w-full rounded-md mb-4 custom-shadow" />
                <h3 className="text-xl font-fraunces mb-2">Accompagnement individuel</h3>
                <p className="font-nobile">
                  "Un suivi personnalisé pour atteindre vos objectifs d'apprentissage."
                </p>
              </Card>
              <Card>
                <img src={placeholderImages.Card_8} alt="Card 8" className="w-full rounded-md mb-4 custom-shadow" />
                <h3 className="text-xl font-fraunces mb-2">Ateliers collectifs</h3>
                <p className="font-nobile">
                  "Des ateliers thématiques pour apprendre et échanger en groupe."
                </p>
              </Card>
            </div>
          </section>

          {/* Section: Générateur d'idées d'apprentissage */}
          <section id="ai-learning-ideas" className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-fraunces mb-6 text-[#3B4540]">Générateur d'idées pédagogiques ✨</h2>
            <Card>
              <p className="font-nobile mb-4">
                Cliquez ci-dessous pour obtenir une idée d'activité créative et personnalisée, inspirée des principes de la 3e voie.
              </p>
              <Button onClick={generateLearningIdea} disabled={isGeneratingIdea}>
                {isGeneratingIdea ? "Génération en cours..." : "Générer une idée ✨"}
              </Button>
              {learningIdea && (
                <div className="mt-4 p-4 border rounded-md bg-gray-50 custom-shadow">
                  <p className="font-nobile whitespace-pre-line">{learningIdea}</p>
                  <div className="mt-2 flex justify-end">
                    <button
                      onClick={() => playAudio(learningIdea, "Aoede")}
                      className="p-2 rounded-full hover:bg-gray-200"
                      disabled={isTtsLoading}
                    >
                      {isTtsLoading ? '...' : <Volume2 size={24} />}
                    </button>
                  </div>
                </div>
              )}
            </Card>
          </section>

          {/* Section: Témoignages */}
          <section id="testimonials-section" className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-fraunces mb-6 text-[#3B4540]">Témoignages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Testimonial
                quote="J'ai retrouvé le plaisir d'apprendre et j'ai gagné en confiance en moi."
                author="Marie, 15 ans"
              />
              <Testimonial
                quote="Grâce à cette approche, ma fille a retrouvé le sourire et la motivation pour ses études."
                author="Sophie, maman de Léa"
              />
            </div>
          </section>
          
          {/* Section: Contact */}
          <section id="contact-section" className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-fraunces text-center mb-6 text-[#3B4540]">Contactez-moi</h2>
            <div className="flex flex-col items-center">
              <Button onClick={() => window.open('mailto:contact@example.com')} className="mt-4">
                Envoyer un email
              </Button>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
