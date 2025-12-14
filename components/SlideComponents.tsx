import React, { useState, useRef, useEffect } from 'react';
import { SlideData, QuestionTF, QuestionMC, GrammarItem, Vocabulary, KeyPoint, DrillItem, GrammarBankSection, GrammarBankItem, MatchingPair, ChecklistItem, QAItem, ScrambleItem, DebriefItem, ImperativeSign, MissionLogStep, GrammarQuizItem } from '../types';

// --- HELPER: Text Reference Modal (ENHANCED) ---
interface HighlightData {
    id: number | string;
    text: string;
    colorClass: string;
}

const HIGHLIGHT_COLORS = [
    'bg-yellow-200 border-yellow-400',
    'bg-green-200 border-green-400',
    'bg-blue-200 border-blue-400',
    'bg-pink-200 border-pink-400',
    'bg-purple-200 border-purple-400',
    'bg-orange-200 border-orange-400',
    'bg-teal-200 border-teal-400',
    'bg-indigo-200 border-indigo-400',
];

const TextReferenceModal: React.FC<{ text?: string; highlights?: HighlightData[] }> = ({ text, highlights = [] }) => {
    const [isOpen, setIsOpen] = useState(false);

    if (!text) return null;

    const renderHighlightedText = () => {
        if (!highlights || highlights.length === 0) return text;

        let parts: { text: string; highlight?: HighlightData }[] = [{ text }];

        highlights.forEach(h => {
            if (!h.text || h.text.trim() === "") return;
            const safeText = h.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const pattern = new RegExp(`(${safeText})`, 'g');
            
            const newParts: typeof parts = [];
            parts.forEach(p => {
                if (p.highlight) {
                    newParts.push(p);
                } else {
                    const split = p.text.split(pattern);
                    split.forEach(s => {
                        if (s === h.text) {
                            newParts.push({ text: s, highlight: h });
                        } else {
                            newParts.push({ text: s });
                        }
                    });
                }
            });
            parts = newParts;
        });

        return parts.map((part, i) => {
            if (part.highlight) {
                return (
                    <span key={i} className={`${part.highlight.colorClass} text-slate-900 font-semibold px-1 mx-0.5 rounded shadow-sm border`}>
                        <sup className="text-[0.6em] font-bold mr-1 bg-black/10 px-1 rounded">Q{part.highlight.id}</sup>
                        {part.text}
                    </span>
                );
            }
            return <span key={i}>{part.text}</span>;
        });
    };

    return (
        <>
            <button 
                onClick={() => setIsOpen(true)}
                className="absolute top-2 right-2 md:top-4 md:right-4 z-30 bg-white hover:bg-ocean-50 text-ocean-700 font-bold py-2 px-3 md:px-4 rounded-xl border-2 border-ocean-200 shadow-md flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 text-sm md:text-base"
            >
                <span className="text-lg md:text-xl">📜</span>
                <span className="hidden md:inline">Show Mission Intel</span>
                <span className="md:hidden">Text</span>
            </button>

            {isOpen && (
                <div className="absolute inset-0 z-40 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-200">
                    <div className="bg-[#fffdf5] w-full max-w-4xl max-h-full rounded-2xl shadow-2xl flex flex-col relative border-4 border-ocean-800">
                        <div className="bg-ocean-800 text-white p-3 md:p-4 flex justify-between items-center shrink-0">
                             <div className="flex flex-col">
                                <h3 className="font-bold text-lg md:text-xl tracking-widest uppercase">Mission Intel</h3>
                                <p className="text-ocean-200 text-[10px] md:text-xs">Evidence matches the active question color</p>
                             </div>
                             <button onClick={() => setIsOpen(false)} className="hover:text-red-300 font-bold text-2xl px-2">✕</button>
                        </div>
                        
                        <div className="p-4 md:p-8 overflow-y-auto custom-scrollbar font-serif text-base md:text-xl leading-relaxed text-slate-800 whitespace-pre-wrap">
                            {renderHighlightedText()}
                        </div>

                        <div className="p-3 md:p-4 bg-ocean-50 border-t border-ocean-200 text-center shrink-0">
                            <button onClick={() => setIsOpen(false)} className="bg-ocean-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-ocean-700 text-sm md:text-base">Close Intel</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};


// --- Cover Slide ---
export const CoverSlide: React.FC<{ data: SlideData }> = ({ data }) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden bg-ocean-900 text-white">
       <div className="absolute inset-0 z-0">
          <img src={data.content.backgroundImage} alt="Cover" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-900 via-ocean-900/50 to-transparent"></div>
       </div>

       <div className="relative z-10 text-center px-4 animate-in zoom-in duration-1000 w-full max-w-4xl">
          <div className="mb-6 flex justify-center">
             <div className="w-20 h-20 md:w-40 md:h-40 rounded-full bg-ocean-100/10 backdrop-blur border-4 border-gold-500 flex items-center justify-center text-5xl md:text-8xl shadow-[0_0_40px_rgba(217,119,6,0.6)]">🏔️</div>
          </div>
          <h1 className="text-4xl md:text-8xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-200 via-green-400 to-green-200 drop-shadow-lg mb-4 md:mb-6 tracking-wide uppercase leading-tight">{data.title}</h1>
          <p className="text-lg md:text-4xl text-ocean-100 font-light tracking-widest uppercase border-t border-ocean-700 pt-4 md:pt-6 inline-block">{data.subtitle}</p>
          <div className="mt-12 md:mt-16 animate-bounce">
            <p className="text-base md:text-lg text-ocean-300 mb-2">Start Adventure</p>
            <span className="text-3xl md:text-4xl text-gold-500">▼</span>
          </div>
       </div>
    </div>
  );
};

// --- Objectives Slide ---
export const ObjectivesSlide: React.FC<{ data: SlideData }> = ({ data }) => {
  return (
    <div className="h-full w-full flex flex-col items-center p-4 md:p-8 overflow-y-auto bg-slate-50">
      <div className="max-w-7xl w-full flex flex-col gap-4 md:gap-6 pb-20">
        <div className="text-center mb-2 md:mb-4">
           <h2 className="text-2xl md:text-4xl font-serif font-bold text-ocean-900 mb-1">{data.title}</h2>
           <p className="text-slate-500 text-sm md:text-lg">{data.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="md:col-span-2 bg-white rounded-3xl p-6 md:p-8 shadow-lg border-l-8 border-ocean-500 flex flex-col justify-center animate-in slide-in-from-left-5 duration-500">
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <span className="text-3xl md:text-4xl">🎯</span>
                    <h3 className="text-xl md:text-2xl font-bold text-ocean-800">Lesson Objectives</h3>
                </div>
                <ul className="space-y-3 md:space-y-4">
                    {data.content.objectives.map((obj: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-base md:text-xl text-slate-700">
                            <span className="text-ocean-500 font-bold mt-1 shrink-0">✓</span>
                            {obj}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-6 shadow-md border border-orange-100 animate-in slide-in-from-right-5 duration-700">
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-3xl">💡</span>
                    <h3 className="text-lg md:text-xl font-bold text-orange-800">Why this is important</h3>
                </div>
                <p className="text-slate-700 italic leading-relaxed text-sm md:text-base">"{data.content.importance}"</p>
            </div>
            <div className="bg-ocean-50 rounded-3xl p-6 shadow-md border border-ocean-100 animate-in slide-in-from-bottom-5 delay-100 duration-500">
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-3xl">🔧</span>
                    <h3 className="text-lg md:text-xl font-bold text-ocean-800">Grammar Focus</h3>
                </div>
                <ul className="space-y-2">
                    {data.content.grammar.map((g: string, i: number) => (
                        <li key={i} className="bg-white px-3 py-2 rounded-lg text-ocean-700 font-medium shadow-sm border border-ocean-100 text-center text-sm md:text-base">{g}</li>
                    ))}
                </ul>
            </div>
            <div className="bg-green-50 rounded-3xl p-6 shadow-md border border-green-100 animate-in slide-in-from-bottom-5 delay-200 duration-500">
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-3xl">🔤</span>
                    <h3 className="text-lg md:text-xl font-bold text-green-800">Vocabulary</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                     {data.content.vocabulary.map((v: string, i: number) => (
                        <span key={i} className="bg-white px-3 py-2 rounded-lg text-green-700 text-xs md:text-sm border border-green-100">{v}</span>
                    ))}
                </div>
            </div>
            <div className="bg-ocean-900 text-white rounded-3xl p-6 shadow-lg animate-in slide-in-from-bottom-5 delay-300 duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 text-9xl -mr-4 -mt-4">🏞</div>
                <div className="flex items-center gap-2 mb-4 relative z-10">
                    <span className="text-3xl">🧭</span>
                    <h3 className="text-lg md:text-xl font-bold text-ocean-100">Cultural Context</h3>
                </div>
                <p className="text-ocean-100 relative z-10 text-sm md:text-base leading-relaxed">{data.content.context}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

// --- Ice Breaker (SIMPLIFIED - Mobile Friendly) ---
export const IceBreakerSlide: React.FC<{ data: SlideData; onNext?: () => void }> = ({ data, onNext }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const content = data.content;

  useEffect(() => {
    setSelectedOption(null);
  }, [data.id]);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-4 relative bg-slate-900 text-white overflow-y-auto">
      {content.backgroundImage && (
        <div className="absolute inset-0 z-0">
            <img src={content.backgroundImage} className="w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/40"></div>
        </div>
      )}

      <div className="relative z-10 w-full max-w-5xl flex flex-col bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl animate-in fade-in zoom-in-95 duration-500 my-4 shrink-0 pb-10">
          <div className="p-4 md:p-6 border-b border-white/10 flex justify-between items-center bg-black/20 shrink-0">
              <div>
                  <h2 className="text-lg md:text-2xl font-bold text-ocean-300 uppercase tracking-widest">{data.title}</h2>
                  <p className="text-slate-300 text-xs md:text-sm">{data.subtitle}</p>
              </div>
          </div>

          <div className="flex-1 p-4 md:p-12 flex flex-col justify-center relative min-h-0">
              <h3 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8 leading-tight text-center">{content.question}</h3>
              
              {content.type === 'poll' && (
                  <div className="relative flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-stretch">
                      {content.options.map((option: any, idx: number) => (
                          <button 
                            key={idx}
                            onClick={() => setSelectedOption(idx)}
                            className={`flex-1 p-4 md:p-8 rounded-3xl border-4 text-center flex flex-col items-center justify-center gap-3 md:gap-4 transition-all hover:scale-105 active:scale-95 group ${selectedOption === idx ? idx === 0 ? 'bg-red-600 border-red-400 shadow-[0_0_30px_rgba(220,38,38,0.5)]' : 'bg-blue-600 border-blue-400 shadow-[0_0_30px_rgba(37,99,235,0.5)]' : 'bg-black/40 border-slate-600 hover:border-slate-400'}`}
                          >
                              <span className="text-5xl md:text-8xl group-hover:animate-bounce">{option.icon}</span>
                              <div className="flex flex-col gap-1 md:gap-2">
                                  <span className="text-lg md:text-2xl font-bold leading-snug">{option.text}</span>
                                  {option.subtext && (
                                      <span className="text-xs md:text-base text-yellow-300 font-serif italic bg-black/30 px-2 py-1 rounded inline-block">
                                          {option.subtext}
                                      </span>
                                  )}
                              </div>
                          </button>
                      ))}
                      
                      <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 bg-yellow-500 rounded-full items-center justify-center font-black text-slate-900 text-2xl border-4 border-slate-900 shadow-xl z-10 rotate-12">VS</div>
                  </div>
              )}

              {content.type === 'external_link' && (
                  <div className="w-full flex flex-col items-center justify-center text-center animate-in zoom-in duration-300">
                       <div className="p-6 md:p-10 bg-ocean-900/50 rounded-3xl border-4 border-ocean-500/50 shadow-2xl flex flex-col items-center gap-4 md:gap-6 max-w-2xl w-full hover:border-ocean-400 transition-colors group">
                           <div className="w-16 h-16 md:w-24 md:h-24 bg-ocean-600 rounded-full flex items-center justify-center text-3xl md:text-5xl shadow-[0_0_30px_rgba(16,185,129,0.5)] group-hover:scale-110 transition-transform">🌐</div>
                           <h3 className="text-xl md:text-3xl font-bold text-white">External Mission Detected</h3>
                           <p className="text-ocean-200 text-base md:text-lg">Click below to launch the video quiz on the secure server.</p>
                           <a href={content.linkUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 md:px-8 md:py-4 bg-yellow-500 hover:bg-yellow-400 text-slate-900 text-lg md:text-xl font-black rounded-xl shadow-xl transform transition-all hover:scale-105 hover:-translate-y-1 flex items-center gap-3 uppercase tracking-wider"><span>🚀</span> {content.buttonText} <span>↗</span></a>
                       </div>
                  </div>
              )}
              
              <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-white/10 text-center">
                  <p className="text-yellow-500/80 text-xs md:text-sm font-mono flex items-center justify-center gap-2"><span>📢</span> {content.prompt || "Discussion Time"}</p>
                  {content.footnote && (
                      <div className="mt-2 md:mt-4 text-slate-400 text-[10px] md:text-xs italic opacity-70">
                          {content.footnote}
                      </div>
                  )}
              </div>
          </div>
      </div>
    </div>
  );
};

// --- Reading (REFACTORED for Mobile & Full Width) ---
export const ReadingSlide: React.FC<{ data: SlideData }> = ({ data }) => {
  const [activeVocab, setActiveVocab] = useState<Vocabulary | null>(null);
  const [showFactSheet, setShowFactSheet] = useState(false);

  const renderInteractiveText = (text: string) => {
    const parts = text.split(/(\b)/); 
    return parts.map((part, index) => {
      const vocabMatch = data.content.vocabulary?.find((v: Vocabulary) => v.word.toLowerCase() === part.toLowerCase());
      if (vocabMatch) {
        return (
          <span 
            key={index} 
            onClick={(e) => { e.stopPropagation(); setActiveVocab(vocabMatch); }}
            className={`cursor-help font-semibold border-b-2 border-dotted transition-colors rounded px-0.5 ${activeVocab === vocabMatch ? 'bg-yellow-200 border-yellow-500 text-yellow-900' : 'border-ocean-400 text-ocean-700 hover:bg-ocean-50'}`}
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const paragraphs = data.content.text.split(/\n\s*\n/);

  return (
    <div className="h-full w-full flex flex-col relative overflow-hidden" onClick={() => setActiveVocab(null)}>
      {/* Background Video Support */}
      {data.content.backgroundVideo ? (
        <div className="absolute inset-0 z-0">
          <video 
            src={data.content.backgroundVideo} 
            className="w-full h-full object-cover" 
            autoPlay 
            loop 
            muted 
            playsInline
          />
        </div>
      ) : data.content.backgroundImage && (
          <div className="absolute inset-0 z-0">
             <img src={data.content.backgroundImage} className="w-full h-full object-cover opacity-10" />
          </div>
      )}

      {/* Full Page Text Container - No Margins, No Radius */}
      <div className="relative z-10 w-full h-full flex flex-col bg-[#fffdf5]/90 backdrop-blur-sm overflow-hidden">
          {/* Header Bar - Stacks on Mobile */}
          <div className="p-3 md:px-8 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-ocean-200 bg-white/50 shrink-0 gap-3 md:gap-0">
             <div className="flex-1 w-full md:w-auto">
                <h2 className="text-xl md:text-3xl font-serif font-bold text-ocean-900 leading-tight">{data.title}</h2>
                <p className="text-xs md:text-base text-slate-500 truncate">{data.subtitle}</p>
             </div>
             
             <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                 {/* Key Point (Trivia) Button */}
                 {data.content.keyPoints && (
                     <button 
                        onClick={() => setShowFactSheet(true)}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-md transition-transform hover:scale-105 active:scale-95 text-xs md:text-base font-bold uppercase tracking-wider shrink-0"
                     >
                        <span className="text-base md:text-xl">📍</span> <span className="hidden md:inline">Zone Info</span><span className="md:hidden">Info</span>
                     </button>
                 )}
                 
                 {data.content.audioSrc && (
                    <div className="flex-1 md:flex-none">
                        <audio 
                            key={data.content.audioSrc} 
                            controls 
                            className="h-8 md:h-10 w-full md:w-64 focus:outline-none shadow-sm rounded-full bg-white"
                        >
                            <source src={data.content.audioSrc} type="audio/mpeg" />
                        </audio>
                    </div>
                 )}
             </div>
          </div>

          {/* Scrolling Content Area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-12 relative">
             <div className="font-serif text-lg md:text-2xl leading-relaxed text-slate-800 text-left space-y-4 md:space-y-6 max-w-5xl mx-auto pb-32 md:pb-24">
               {paragraphs.map((para: string, pIdx: number) => {
                 if (para.trim().startsWith("PART 2")) {
                     return <h4 key={pIdx} className="text-2xl md:text-3xl font-black text-orange-600 uppercase tracking-widest mt-8 md:mt-12 mb-2 md:mb-4 border-b-4 border-orange-200 inline-block">{para}</h4>;
                 }
                 return <p key={pIdx} className="mb-4">{renderInteractiveText(para)}</p>;
               })}
                {/* Decorative Footer Image within scroll */}
                {data.content.footerImage && (
                    <div className="mt-8 md:mt-12 w-full h-48 md:h-80 rounded-xl overflow-hidden shadow-lg border-y-4 border-white">
                        <img src={data.content.footerImage} className="w-full h-full object-cover" alt="Atmosphere" />
                    </div>
                )}
             </div>
          </div>
          
          {/* Fact Sheet Modal */}
          {showFactSheet && data.content.keyPoints && (
              <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
                  <div className="bg-white max-w-3xl w-full rounded-3xl shadow-2xl overflow-hidden border-4 border-blue-500 flex flex-col max-h-[90vh]">
                      <div className="bg-blue-600 text-white p-4 md:p-6 flex justify-between items-center shrink-0">
                          <div>
                            <h3 className="text-xl md:text-2xl font-black uppercase tracking-widest">Tactical Data</h3>
                          </div>
                          <button onClick={() => setShowFactSheet(false)} className="text-3xl hover:text-blue-200">✕</button>
                      </div>
                      <div className="p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 bg-slate-50 overflow-y-auto">
                          {data.content.keyPoints.map((point: KeyPoint, idx: number) => (
                              <div key={idx} className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border-2 border-blue-100 flex flex-col gap-2">
                                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-2xl mb-2">ℹ️</div>
                                  <h4 className="font-bold text-blue-800 text-base md:text-lg uppercase">{point.title}</h4>
                                  <p className="text-slate-700 leading-relaxed font-medium text-sm md:text-base">{point.content}</p>
                              </div>
                          ))}
                      </div>
                      <div className="bg-slate-100 p-4 text-center border-t border-slate-200 shrink-0">
                          <button onClick={() => setShowFactSheet(false)} className="px-8 py-2 bg-slate-800 text-white rounded-lg font-bold hover:bg-black">Dismiss</button>
                      </div>
                  </div>
              </div>
          )}

          {/* Vocab Popup */}
          <div className={`absolute bottom-0 left-0 right-0 z-20 transition-all duration-300 transform ${activeVocab ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}`}>
              {activeVocab && (
                  <div className="bg-ocean-900 text-white p-6 md:p-8 shadow-[0_-10px_40px_rgba(0,0,0,0.3)] border-t border-ocean-600 flex flex-col md:flex-row gap-4 md:items-center justify-between">
                      <div>
                          <h4 className="text-2xl md:text-3xl font-bold capitalize text-yellow-400 mb-1">{activeVocab.word}</h4>
                          <p className="text-lg md:text-xl text-ocean-100 leading-snug">{activeVocab.definition}</p>
                      </div>
                      <button onClick={() => setActiveVocab(null)} className="self-end md:self-center px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-bold uppercase tracking-wider transition-colors">Close</button>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};

// --- MISSION LOG SLIDE ---
export const MissionLogSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    return null;
};

// --- MEDIA SLIDE ---
export const MediaSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-4 md:p-8 bg-slate-900 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_#1e293b_0%,_#0f172a_100%)]"></div>
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "40px 40px", opacity: 0.05 }}></div>

            <div className="relative z-10 max-w-4xl w-full text-center flex flex-col items-center animate-in zoom-in duration-500">
                <div className="mb-6 md:mb-10">
                    <h2 className="text-3xl md:text-5xl font-black text-white tracking-widest uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] mb-2">{data.title}</h2>
                    <div className="inline-block px-4 py-1 border border-yellow-500 rounded-full bg-yellow-500/10 text-yellow-400 font-mono text-sm md:text-lg tracking-wider shadow-[0_0_10px_rgba(234,179,8,0.3)]">
                        {data.subtitle}
                    </div>
                </div>

                <a 
                    href={data.content.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group relative block w-full max-w-2xl aspect-video bg-black rounded-3xl overflow-hidden border-4 border-ocean-600 shadow-[0_0_50px_rgba(5,150,105,0.4)] hover:shadow-[0_0_80px_rgba(5,150,105,0.7)] transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 ring-4 ring-transparent hover:ring-ocean-400/50"
                >
                    {/* Placeholder Image representing the game */}
                    <img 
                        src={data.content.thumbnail || "https://img.freepik.com/free-vector/comic-superhero-chest-illustration_1284-10810.jpg"} 
                        alt="Game Preview" 
                        className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity duration-500 scale-105 group-hover:scale-110"
                    />
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-3xl md:text-5xl shadow-2xl group-hover:scale-110 transition-transform duration-300 group-hover:animate-pulse text-black pl-2 border-4 border-white/20">
                            ▶
                        </div>
                        <span className="mt-4 md:mt-8 text-xl md:text-3xl font-black text-white uppercase tracking-widest drop-shadow-md group-hover:text-yellow-400 transition-colors">
                            Launch Mission
                        </span>
                        <div className="mt-2 md:mt-3 flex items-center gap-2 text-slate-300 font-mono text-xs md:text-sm bg-black/50 px-4 py-1 rounded-full border border-white/10">
                            <span>↗</span> Opens in secure window
                        </div>
                    </div>
                </a>
            </div>
        </div>
    );
};

// --- LOGIC PUZZLE SLIDE ---
export const LogicPuzzleSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    return null; 
};

// --- Comprehension TF ---
export const ComprehensionTFSlide: React.FC<{ data: SlideData }> = ({ data }) => {
  const [answers, setAnswers] = useState<Record<number, boolean | null>>({});

  const handleAnswer = (qId: number, val: boolean, correct: boolean) => {
    if (answers[qId] !== undefined) return;
    setAnswers(prev => ({ ...prev, [qId]: val === correct }));
  };

  const highlights = data.content.questions
    .filter((q: QuestionTF) => answers[q.id] !== undefined)
    .map((q: QuestionTF) => {
        const index = data.content.questions.indexOf(q);
        return {
            id: q.id,
            text: q.contextHighlight || '',
            colorClass: HIGHLIGHT_COLORS[index % HIGHLIGHT_COLORS.length]
        };
    })
    .filter((h: HighlightData) => h.text !== '');

  return (
    <div className="h-full flex flex-col items-center p-4 overflow-y-auto bg-slate-50 justify-start pt-10 pb-20 relative">
      <TextReferenceModal text={data.content.referenceText} highlights={highlights} />

      <div className="bg-white rounded-3xl shadow-xl p-4 md:p-10 max-w-5xl w-full border border-slate-200 shrink-0">
        <h3 className="text-2xl md:text-3xl font-bold text-ocean-800 mb-6 text-center border-b pb-4 flex items-center justify-center gap-3"><span>✅</span> {data.subtitle}</h3>
        <div className="space-y-3 md:space-y-4">
          {data.content.questions.map((q: QuestionTF, idx: number) => {
            const status = answers[q.id];
            const colorClass = HIGHLIGHT_COLORS[idx % HIGHLIGHT_COLORS.length].split(' ')[0]; // Extract bg class
            return (
              <div key={q.id} className="relative">
                <div className={`flex flex-col md:flex-row items-center justify-between p-3 md:p-4 rounded-2xl transition-all border-l-8 ${status === true ? 'bg-green-50 border-green-500' : status === false ? 'bg-red-50 border-red-500' : 'bg-slate-50 hover:bg-ocean-50 border-slate-300'}`} style={{ borderLeftColor: status === undefined ? undefined : undefined }}>
                  <div className="flex items-center gap-3 flex-1 mb-3 md:mb-0 w-full">
                      <span className={`text-xs font-bold px-2 py-1 rounded text-slate-800 border border-black/10 ${colorClass}`}>Q{q.id}</span>
                      <p className="text-base md:text-xl font-medium text-slate-700">{q.statement}</p>
                  </div>
                  <div className="flex gap-3 shrink-0 w-full md:w-auto justify-center">
                    <button onClick={() => handleAnswer(q.id, true, q.isTrue)} disabled={status !== undefined} className={`flex-1 md:flex-none px-6 py-2 rounded-xl font-bold text-lg transition-all ${status === undefined ? 'bg-white border border-slate-300 hover:bg-ocean-50' : (q.isTrue ? 'bg-green-600 text-white' : 'opacity-20')}`}>True</button>
                    <button onClick={() => handleAnswer(q.id, false, q.isTrue)} disabled={status !== undefined} className={`flex-1 md:flex-none px-6 py-2 rounded-xl font-bold text-lg transition-all ${status === undefined ? 'bg-white border border-slate-300 hover:bg-ocean-50' : (!q.isTrue ? 'bg-green-600 text-white' : 'opacity-20')}`}>False</button>
                  </div>
                </div>
                {status !== undefined && q.explanation && (
                   <div className={`mt-2 p-3 rounded-xl text-base font-medium flex items-center gap-2 animate-in slide-in-from-top-2 ${status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      <span className="text-xl">{status ? '✅' : '❌'}</span> {q.explanation}
                   </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// --- Comprehension MC ---
export const ComprehensionMCSlide: React.FC<{ data: SlideData }> = ({ data }) => {
  const [selections, setSelections] = useState<Record<number, number>>({});

  const highlights = data.content.questions.map((q: QuestionMC, index: number) => ({
      id: q.id,
      text: q.contextHighlight || '',
      colorClass: HIGHLIGHT_COLORS[index % HIGHLIGHT_COLORS.length]
  })).filter((h: HighlightData) => h.text !== '');

  return (
    <div className="h-full flex flex-col items-center p-4 overflow-y-auto bg-gradient-to-br from-ocean-900 to-ocean-700 relative justify-start pt-10 pb-20">
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
      <TextReferenceModal text={data.content.referenceText} highlights={highlights} />

      <div className="w-full max-w-7xl relative z-10 py-6 shrink-0">
         <h2 className="text-2xl md:text-4xl font-bold text-white text-center mb-6 md:mb-8 drop-shadow-md tracking-wider border-b border-ocean-600 pb-4 inline-block w-full">{data.subtitle}</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {data.content.questions.map((q: QuestionMC, idx: number) => {
               const selection = selections[q.id];
               const showResult = selection !== undefined;
               const highlightColor = HIGHLIGHT_COLORS[idx % HIGHLIGHT_COLORS.length].split(' ')[0];

               return (
                  <div key={q.id} className="bg-ocean-50 rounded-2xl shadow-xl overflow-hidden flex flex-col border border-ocean-200 hover:shadow-2xl transition-shadow duration-300">
                     <div className="bg-ocean-100 p-3 md:p-4 border-b border-ocean-200 flex items-start gap-3">
                        <span className={`text-xs md:text-sm font-bold px-2 py-1 rounded text-slate-800 border border-black/10 shrink-0 ${highlightColor}`}>Q{q.id}</span>
                        <h4 className="text-ocean-900 font-bold text-base md:text-xl leading-tight mt-1">{q.question}</h4>
                     </div>
                     <div className="p-3 md:p-4 space-y-2 flex-1">
                        {q.options.map((opt, optIdx) => {
                           let btnClass = "w-full text-left p-2 md:p-3 rounded-lg border-2 text-sm md:text-lg font-medium transition-all relative ";
                           if (showResult) {
                              if (optIdx === q.correctIndex) btnClass += "bg-green-100 border-green-500 text-green-900 font-bold";
                              else if (optIdx === selection && optIdx !== q.correctIndex) btnClass += "bg-red-100 border-red-400 text-red-900 opacity-60";
                              else btnClass += "border-transparent opacity-40";
                           } else {
                              btnClass += "bg-white border-slate-200 hover:border-ocean-400 hover:shadow-md hover:-translate-y-0.5";
                           }
                           return (
                              <button key={optIdx} onClick={() => !showResult && setSelections(prev => ({...prev, [q.id]: optIdx}))} className={btnClass}>{opt}</button>
                           );
                        })}
                     </div>
                     {showResult && q.explanation && (
                         <div className="px-4 pb-4 bg-ocean-50">
                             <div className="p-2 bg-yellow-50 text-yellow-800 rounded border border-yellow-200 text-sm italic">💡 {q.explanation}</div>
                         </div>
                     )}
                  </div>
               );
            })}
         </div>
      </div>
    </div>
  );
};

// --- Grammar ---
export const GrammarSlide: React.FC<{ data: SlideData }> = ({ data }) => {
  const [inputs, setInputs] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const checkAnswers = () => setChecked(true);

  return (
    <div className="h-full flex flex-col items-center justify-center p-4 overflow-y-auto pb-20">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 max-w-4xl w-full border border-ocean-100 relative">
        <div className="absolute -top-6 -right-6 p-4 bg-yellow-100 rounded-full shadow-lg rotate-12 hidden md:block"><span className="text-5xl">✍️</span></div>
        <div className="text-center mb-6 md:mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-ocean-800">{data.title}</h3>
            <p className="text-slate-500 text-sm md:text-lg">{data.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 gap-y-4 md:gap-y-6">
          {data.content.items.map((item: GrammarItem) => {
             const userVal = (inputs[item.id] || "").toLowerCase().trim();
             const possibleAnswers = item.correctAnswer.split('/').map(s => s.trim().toLowerCase());
             const isCorrect = possibleAnswers.includes(userVal);
             return (
               <div key={item.id} className="flex flex-wrap items-center text-lg md:text-2xl border-b border-slate-100 pb-2">
                 <span className="text-slate-400 font-bold text-sm md:text-base mr-2 md:mr-4 w-4 md:w-6">{item.id}.</span>
                 <span className="text-slate-800 mr-2">{item.prefix}</span>
                 <div className="relative inline-block mx-1">
                   <input type="text" value={inputs[item.id] || ""} onChange={(e) => { setChecked(false); setInputs({...inputs, [item.id]: e.target.value}); }} className={`border-b-2 bg-transparent text-center w-24 md:w-48 font-bold focus:outline-none transition-colors ${checked ? (isCorrect ? 'border-green-500 text-green-600' : 'border-red-500 text-red-600') : 'border-slate-300 focus:border-ocean-500'}`} placeholder="..." />
                 </div>
                 <span className="text-slate-800 ml-1">{item.suffix}</span>
                 {checked && isCorrect && <span className="ml-2 text-green-500 text-xl md:text-2xl animate-bounce">✓</span>}
                 {checked && !isCorrect && <span className="ml-2 text-red-500 text-sm md:text-base font-bold animate-pulse">({item.correctAnswer})</span>}
               </div>
             );
          })}
        </div>
        <div className="mt-8 md:mt-12 flex justify-center">
          <button onClick={checkAnswers} className="bg-ocean-600 hover:bg-ocean-700 text-white font-bold py-3 px-12 md:px-16 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 text-lg md:text-xl">Check Answers</button>
        </div>
      </div>
    </div>
  );
};

// --- Speaking ---
export const SpeakingSlide: React.FC<{ data: SlideData }> = ({ data }) => {
  return (
    <div className="h-full flex flex-col items-center p-4 overflow-y-auto justify-start pt-6 md:pt-10 pb-20">
      <div className="max-w-[1600px] w-full flex flex-col gap-6 shrink-0">
        {data.content.grammarBox && (
           <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto">
                {data.content.grammarFormula && (
                    <div className="bg-ocean-900 text-white p-4 md:p-6 rounded-2xl text-center shadow-xl border-4 border-yellow-500 transform -rotate-1 shrink-0">
                        <h4 className="text-yellow-400 font-bold tracking-widest text-xs md:text-sm mb-2">{data.content.grammarFormula.title}</h4>
                        <p className="text-lg md:text-4xl font-mono font-bold break-words">{data.content.grammarFormula.structure}</p>
                    </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
                    <div className="bg-white rounded-3xl shadow-lg border border-green-200 overflow-hidden">
                        <div className="bg-green-600 text-white p-3 md:p-4 text-center"><h3 className="text-lg md:text-2xl font-bold uppercase tracking-wider">Good Advice (Should)</h3></div>
                         <div className="p-4 md:p-6 text-base md:text-xl space-y-3 md:space-y-4">
                            {data.content.grammarBox.lines.filter((l: string) => l.includes('(+)') || l.includes('SHOULD (Good')).map((line: string, i: number) => (
                                <div key={i} className="flex justify-between border-b border-green-50 pb-2">
                                     <span className="text-green-800 font-medium">{line.replace('(+)', '').replace('SHOULD (Good idea / Advice)', '')}</span>
                                </div>
                            ))}
                         </div>
                    </div>

                     <div className="bg-white rounded-3xl shadow-lg border border-red-200 overflow-hidden">
                        <div className="bg-red-600 text-white p-3 md:p-4 text-center"><h3 className="text-lg md:text-2xl font-bold uppercase tracking-wider">Bad Advice (Shouldn't)</h3></div>
                         <div className="p-4 md:p-6 text-base md:text-xl space-y-3 md:space-y-4">
                            {data.content.grammarBox.lines.filter((l: string) => l.includes('(-)') || l.includes('SHOULDN\'T')).map((line: string, i: number) => (
                                <div key={i} className="flex justify-between border-b border-red-50 pb-2">
                                     <span className="text-red-800 font-medium">{line.replace('(-)', '').replace('SHOULDN\'T (Bad idea / Advice)', '')}</span>
                                </div>
                            ))}
                         </div>
                    </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4 md:p-6 border border-slate-200 shadow-inner">
                     <h4 className="text-center font-bold text-slate-500 uppercase tracking-widest mb-4">Grammar Intel</h4>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {data.content.tips && data.content.tips.map((tip: any, idx: number) => (
                            <div key={idx} className="bg-yellow-50 border-l-4 border-yellow-400 p-3 md:p-4 rounded-r-xl shadow-sm">
                                <h5 className="font-bold text-yellow-800 text-base md:text-lg mb-1">{tip.title}</h5>
                                <p className="text-slate-700 whitespace-pre-line text-sm md:text-base font-medium">{tip.text}</p>
                            </div>
                        ))}
                     </div>
                </div>
           </div>
        )}

        {data.content.prompts && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-0">
                {data.content.backgroundImage && (
                    <div className="h-64 md:h-full rounded-3xl overflow-hidden border-4 border-ocean-900 shadow-2xl relative group order-last md:order-first">
                        <img src={data.content.backgroundImage} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                        <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded font-mono text-sm animate-pulse">LIVE FEED</div>
                    </div>
                )}
                <div className={`bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-ocean-100 flex flex-col h-full overflow-y-auto ${!data.content.backgroundImage ? 'md:col-span-2' : ''}`}>
                    <h3 className="text-2xl font-bold text-ocean-800 mb-6 flex items-center gap-2"><span>💬</span> {data.subtitle}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 h-full">
                         <div className="bg-blue-50 p-4 md:p-6 rounded-2xl border-2 border-blue-100 flex flex-col">
                             <h4 className="text-lg md:text-xl font-bold text-blue-800 mb-4 border-b border-blue-200 pb-2">STUDENT A</h4>
                             <ul className="space-y-3 md:space-y-4 flex-1">
                                {data.content.prompts.filter((p: string) => !p.includes('STUDENT B') && !p.includes('STUDENT A')).slice(0, 3).map((p: string, i: number) => (
                                    <li key={i} className="text-base md:text-lg text-blue-900 flex gap-2"><span>🗣️</span> {p.replace('•', '')}</li>
                                ))}
                             </ul>
                         </div>
                         <div className="bg-green-50 p-4 md:p-6 rounded-2xl border-2 border-green-100 flex flex-col">
                             <h4 className="text-lg md:text-xl font-bold text-green-800 mb-4 border-b border-green-200 pb-2">STUDENT B</h4>
                             <ul className="space-y-3 md:space-y-4 flex-1">
                                {data.content.prompts.filter((p: string) => !p.includes('STUDENT B') && !p.includes('STUDENT A')).slice(3).map((p: string, i: number) => (
                                    <li key={i} className="text-base md:text-lg text-green-900 flex gap-2"><span>👂</span> {p.replace('•', '')}</li>
                                ))}
                             </ul>
                         </div>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

// --- IMPERATIVES SLIDE (New & Improved) ---
export const ImperativesSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    const [matches, setMatches] = useState<Record<number, boolean>>({});
    const [quizRevealed, setQuizRevealed] = useState<Record<number, boolean>>({});

    const handleMatch = (idx: number) => {
        setMatches(prev => ({...prev, [idx]: true}));
    };

    const handleQuizReveal = (id: number) => {
        setQuizRevealed(prev => ({...prev, [id]: true}));
    }

    return (
        <div className="h-full flex flex-col items-center p-4 bg-slate-100 overflow-y-auto justify-start pt-6 md:pt-8 pb-20">
            <div className="max-w-6xl w-full flex flex-col gap-6 md:gap-8 shrink-0 pb-10">
                 
                 {/* 1. WORD BANK (Clues) - Only show if it's the activity slide */}
                 {data.content.signs && data.content.wordBank && (
                     <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-4 md:p-6 shadow-md">
                         <h3 className="text-center font-bold text-yellow-800 uppercase tracking-widest mb-4 text-sm md:text-base">Transmission Codes (Use these!)</h3>
                         <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                             {data.content.wordBank.map((word: string, i: number) => (
                                 <span key={i} className="bg-white px-2 py-1 md:px-3 rounded-lg border border-yellow-200 text-sm md:text-lg font-mono text-slate-700 shadow-sm">{word}</span>
                             ))}
                         </div>
                     </div>
                 )}

                 {/* 2. Content: Either Grammar Rules or Activity Grid */}
                 {data.content.signs ? (
                     // Activity Mode
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                         {data.content.signs.map((sign: ImperativeSign, idx: number) => (
                             <button 
                                key={idx} 
                                onClick={() => handleMatch(idx)}
                                disabled={matches[idx]}
                                className={`p-2 md:p-4 rounded-xl shadow-md border-2 transition-all flex flex-col items-center gap-2 md:gap-3 text-center h-full min-h-[140px] md:min-h-[180px] justify-between ${matches[idx] ? 'bg-green-50 border-green-500 scale-95 opacity-90' : 'bg-white border-slate-200 hover:border-red-400 hover:-translate-y-1'}`}
                             >
                                 <div className="text-4xl md:text-6xl">{sign.icon}</div>
                                 {matches[idx] ? (
                                     <div className="text-green-800 font-bold animate-in zoom-in leading-tight text-sm md:text-xl">{sign.rule}</div>
                                 ) : (
                                     <div className="w-full bg-slate-100 h-8 md:h-12 rounded border border-slate-200 flex items-center justify-center text-slate-400 text-xs md:text-sm">Tap to Reveal</div>
                                 )}
                             </button>
                         ))}
                     </div>
                 ) : (
                     // Theory Mode (Grammar Briefing)
                     <div className="bg-white rounded-3xl shadow-lg p-4 md:p-6 border-l-8 border-red-500 flex flex-col gap-6">
                         <div className="border-b pb-2">
                             <h2 className="text-2xl md:text-3xl font-bold text-red-600 mb-1 uppercase tracking-widest">{data.title}</h2>
                             <p className="text-slate-500 font-serif italic text-base md:text-lg">{data.subtitle}</p>
                         </div>
                         
                         {/* Compact Theory Cards */}
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                             <div className="bg-green-50 p-4 rounded-2xl border-2 border-green-200 shadow-sm">
                                 <span className="block text-xs font-bold text-green-600 uppercase mb-1">Positive (+)</span>
                                 <div className="font-bold text-slate-900 text-lg">Come early.</div>
                                 <div className="text-slate-500 text-xs">Verb (Base Form)</div>
                             </div>
                             <div className="bg-red-50 p-4 rounded-2xl border-2 border-red-200 shadow-sm">
                                 <span className="block text-xs font-bold text-red-600 uppercase mb-1">Negative (-)</span>
                                 <div className="font-bold text-slate-900 text-lg">Don't be late.</div>
                                 <div className="text-slate-500 text-xs">Don't + Verb</div>
                             </div>
                             <div className="bg-blue-50 p-4 rounded-2xl border-2 border-blue-200 shadow-sm">
                                 <span className="block text-xs font-bold text-blue-600 uppercase mb-1">Polite</span>
                                 <div className="font-bold text-slate-900 text-lg">Please bring shoes.</div>
                                 <div className="text-slate-500 text-xs">Add 'Please'</div>
                             </div>
                         </div>

                         {/* Quiz Section */}
                         {data.content.quiz && (
                             <div className="mt-4 pt-4 border-t border-slate-100">
                                 <h4 className="text-center font-bold text-ocean-700 text-base md:text-lg mb-4">Can you answer these grammar questions correctly?</h4>
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 md:gap-y-4">
                                     {data.content.quiz.map((q: GrammarQuizItem) => {
                                         const isRevealed = quizRevealed[q.id];
                                         return (
                                             <button 
                                                key={q.id}
                                                onClick={() => handleQuizReveal(q.id)}
                                                disabled={isRevealed}
                                                className={`text-left p-3 rounded-lg border flex flex-col gap-1 transition-all ${isRevealed ? 'bg-green-50 border-green-300' : 'bg-white border-slate-200 hover:border-ocean-300 hover:bg-slate-50'}`}
                                             >
                                                 <div className="font-medium text-slate-800 text-base md:text-lg">
                                                     <span className="font-bold text-slate-400 mr-2">{q.id})</span>
                                                     {isRevealed 
                                                        ? q.question.replace('_____', `[ ${q.options[q.correctIndex]} ]`) 
                                                        : q.question}
                                                 </div>
                                                 <div className="flex gap-4 text-sm text-slate-500 pl-6">
                                                     {q.options.map((opt, i) => (
                                                         <span key={i} className={`${isRevealed && i === q.correctIndex ? 'text-green-700 font-bold underline' : ''}`}>
                                                             {String.fromCharCode(97 + i)}) {opt}
                                                         </span>
                                                     ))}
                                                 </div>
                                             </button>
                                         );
                                     })}
                                 </div>
                             </div>
                         )}
                     </div>
                 )}
            </div>
        </div>
    );
};

// --- SCRAMBLE SLIDE ---
export const ScrambleSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    const [orders, setOrders] = useState<Record<number, string[]>>({});
    const [checked, setChecked] = useState<Record<number, boolean>>({});

    useEffect(() => {
        const initialOrders: Record<number, string[]> = {};
        data.content.items.forEach((item: ScrambleItem) => {
            initialOrders[item.id] = [...item.parts].sort(() => Math.random() - 0.5);
        });
        setOrders(initialOrders);
    }, [data.content.items]);

    const moveWord = (itemId: number, wordIndex: number, direction: 'left' | 'right') => {
        const currentList = [...(orders[itemId] || [])];
        if (direction === 'left' && wordIndex > 0) {
            [currentList[wordIndex - 1], currentList[wordIndex]] = [currentList[wordIndex], currentList[wordIndex - 1]];
        } else if (direction === 'right' && wordIndex < currentList.length - 1) {
            [currentList[wordIndex], currentList[wordIndex + 1]] = [currentList[wordIndex + 1], currentList[wordIndex]];
        }
        setOrders({ ...orders, [itemId]: currentList });
        setChecked({ ...checked, [itemId]: false }); 
    };

    const checkSentence = (itemId: number, correct: string) => {
        const attempt = orders[itemId].join(' ');
        setChecked({ ...checked, [itemId]: attempt === correct });
    };

    return (
        <div className="h-full flex flex-col items-center justify-center p-4 bg-slate-100 overflow-y-auto pb-20">
            <div className="max-w-4xl w-full space-y-6 md:space-y-8">
                <div className="text-center">
                    <h2 className="text-2xl md:text-4xl font-bold text-ocean-900">{data.title}</h2>
                    <p className="text-slate-500 text-lg">{data.subtitle}</p>
                </div>
                {data.content.items.map((item: ScrambleItem) => {
                    const isCorrect = checked[item.id];
                    return (
                        <div key={item.id} className="bg-white p-4 md:p-6 rounded-2xl shadow-md border-2 border-slate-200">
                             <div className="flex flex-wrap gap-2 justify-center mb-4 min-h-[60px] items-center p-3 md:p-4 bg-slate-50 rounded-xl">
                                 {(orders[item.id] || []).map((word, idx) => (
                                     <div key={idx} className="flex items-center">
                                         <button onClick={() => moveWord(item.id, idx, 'left')} className="text-slate-300 hover:text-ocean-500 px-1 disabled:opacity-0 text-xl" disabled={idx === 0 || isCorrect}>‹</button>
                                         <span className={`px-2 py-1 md:px-4 md:py-2 rounded-lg font-bold text-base md:text-xl shadow-sm transition-colors ${isCorrect ? 'bg-green-500 text-white' : 'bg-white border border-ocean-200 text-ocean-800'}`}>{word}</span>
                                         <button onClick={() => moveWord(item.id, idx, 'right')} className="text-slate-300 hover:text-ocean-500 px-1 disabled:opacity-0 text-xl" disabled={idx === (orders[item.id]?.length || 0) - 1 || isCorrect}>›</button>
                                     </div>
                                 ))}
                             </div>
                             <div className="text-center">
                                 {isCorrect ? (
                                     <div className="text-green-600 font-bold text-lg animate-bounce">Correct! Communication Restored.</div>
                                 ) : (
                                     <button onClick={() => checkSentence(item.id, item.correctSentence)} className="bg-ocean-600 text-white px-6 py-2 rounded-full font-bold hover:bg-ocean-700">Check Signal</button>
                                 )}
                             </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// --- CHECKLIST SLIDE (With Extension & Fix) ---
export const ChecklistSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    const [checkedItems, setCheckedItems] = useState<string[]>([]);
    const [isVerified, setIsVerified] = useState(false);
    const [extensionAnswer, setExtensionAnswer] = useState("");

    const toggleItem = (id: string) => {
        if (isVerified) return; 
        if (checkedItems.includes(id)) setCheckedItems(prev => prev.filter(i => i !== id));
        else setCheckedItems(prev => [...prev, id]);
    };

    const highlights = data.content.items
    .filter((item: ChecklistItem) => checkedItems.includes(item.id))
    .map((item: ChecklistItem, index: number) => ({
      id: item.id,
      text: item.contextHighlight || '',
      colorClass: HIGHLIGHT_COLORS[index % HIGHLIGHT_COLORS.length]
    })).filter((h: HighlightData) => h.text !== '');

    return (
        // Corrected Layout: justify-start allows content to grow downwards without being clipped at top
        <div className="h-full flex flex-col items-center p-4 relative overflow-y-auto justify-start pt-6 md:pt-10 pb-20">
            <TextReferenceModal text={data.content.referenceText} highlights={highlights} />
            <div className="bg-white rounded-3xl shadow-xl p-4 md:p-8 max-w-5xl w-full border border-ocean-100 my-4 shrink-0">
                <div className="flex items-center justify-center gap-4 mb-6 md:mb-8"><span className="text-3xl md:text-4xl">📝</span><div className="text-center"><h3 className="text-2xl md:text-3xl font-bold text-ocean-800">{data.title}</h3><p className="text-slate-500">{data.subtitle}</p></div></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    {data.content.items.map((item: ChecklistItem, idx: number) => {
                        const isChecked = checkedItems.includes(item.id);
                        let bgClass = "bg-white hover:bg-slate-50";
                        let borderClass = "border-slate-200";
                        let icon = isChecked ? "☑️" : "⬜";
                        const highlightColor = HIGHLIGHT_COLORS[idx % HIGHLIGHT_COLORS.length].split(' ')[0];

                        if (isVerified) {
                            if (item.isCorrect) { bgClass = "bg-green-50"; borderClass = "border-green-500"; icon = "✅"; } 
                            else if (isChecked && !item.isCorrect) { bgClass = "bg-red-50"; borderClass = "border-red-500"; icon = "❌"; } 
                            else { bgClass = "opacity-50"; }
                        } else if (isChecked) { bgClass = "bg-ocean-50"; borderClass = "border-ocean-500"; }

                        return (
                            <button key={item.id} onClick={() => toggleItem(item.id)} className={`p-3 md:p-4 rounded-xl border-2 text-left flex items-center gap-3 md:gap-4 text-lg md:text-xl transition-all ${bgClass} ${borderClass}`}>
                                <span className={`text-xs px-1 rounded border border-black/10 ${highlightColor}`}>{item.id}</span>
                                <span className="text-xl md:text-2xl">{icon}</span>
                                <span className="font-medium text-base md:text-xl">{item.text}</span>
                            </button>
                        );
                    })}
                </div>
                
                {/* Verification & Extension Task */}
                <div className="mt-8 flex flex-col items-center gap-6">
                    {!isVerified ? (
                        <button onClick={() => setIsVerified(true)} className="bg-ocean-600 hover:bg-ocean-700 text-white font-bold py-3 px-12 rounded-full shadow-lg text-lg md:text-xl transition-transform active:scale-95">Verify Log</button>
                    ) : (
                        <div className="w-full text-center animate-in fade-in slide-in-from-bottom-2">
                             <p className="text-lg font-bold text-ocean-700 mb-4">Verification Complete.</p>
                             
                             {/* Extension Task */}
                             {data.content.extensionQuestion && (
                                 <div className="bg-yellow-50 p-4 md:p-6 rounded-2xl border-2 border-yellow-200 max-w-2xl mx-auto">
                                     <h4 className="font-bold text-yellow-800 mb-2">🤔 {data.content.extensionQuestion}</h4>
                                     <div className="flex flex-col md:flex-row gap-2">
                                         <input 
                                            type="text" 
                                            value={extensionAnswer}
                                            onChange={(e) => setExtensionAnswer(e.target.value)}
                                            placeholder="I want to... because..." 
                                            className="flex-1 p-2 rounded border border-yellow-300 focus:outline-none focus:border-yellow-500 bg-white"
                                         />
                                         <button className="bg-yellow-500 text-white px-4 py-2 rounded font-bold hover:bg-yellow-600">Save</button>
                                     </div>
                                 </div>
                             )}

                             <button onClick={() => { setIsVerified(false); setCheckedItems([]); setExtensionAnswer(""); }} className="text-sm text-slate-400 mt-4 underline">Reset</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- QA SLIDE ---
export const QASlide: React.FC<{ data: SlideData }> = ({ data }) => {
    const [openId, setOpenId] = useState<number | null>(null);

    // HIGHLIGHT FIX: Only highlight the OPEN question.
    const highlights = data.content.questions
    .filter((q: QAItem) => q.id === openId)
    .map((q: QAItem, index: number) => ({
      id: q.id,
      text: q.contextHighlight || '',
      colorClass: HIGHLIGHT_COLORS[index % HIGHLIGHT_COLORS.length]
    })).filter((h: HighlightData) => h.text !== '');

    return (
        <div className="h-full flex flex-col items-center p-4 overflow-y-auto bg-slate-50 justify-start pt-6 md:pt-10 pb-20 relative">
            <TextReferenceModal text={data.content.referenceText} highlights={highlights} />
            <div className="max-w-4xl w-full space-y-4 shrink-0">
                <div className="text-center mb-6 md:mb-8"><h3 className="text-2xl md:text-4xl font-bold text-ocean-900 mb-2">{data.title}</h3><div className="inline-block px-4 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs md:text-sm font-bold tracking-widest uppercase border border-yellow-200">{data.subtitle}</div></div>
                {data.content.questions.map((item: QAItem, idx: number) => {
                    const isOpen = openId === item.id;
                    const colorClass = HIGHLIGHT_COLORS[idx % HIGHLIGHT_COLORS.length].split(' ')[0];
                    return (
                        <div key={item.id} className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-200 transition-all duration-300 hover:shadow-lg">
                            <button onClick={() => setOpenId(isOpen ? null : item.id)} className={`w-full text-left p-4 md:p-6 flex justify-between items-center transition-colors ${isOpen ? 'bg-ocean-50' : 'bg-white'}`}>
                                <div className="flex items-center gap-4">
                                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-sm md:text-lg border border-black/10 shrink-0 ${colorClass}`}>Q{item.id}</div>
                                    <span className="text-lg md:text-2xl font-bold text-slate-800 leading-tight">{item.question}</span>
                                </div>
                                <span className={`text-2xl transition-transform duration-300 text-slate-400 shrink-0 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="p-4 md:p-6 pt-0 pl-16 md:pl-20 pr-4 md:pr-8"><div className="p-3 md:p-4 bg-green-50 rounded-xl border-l-4 border-green-500 text-lg md:text-xl text-green-900 font-medium leading-relaxed">{item.answer}</div></div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// --- MATCHING SLIDE ---
export const MatchingSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [matchedIds, setMatchedIds] = useState<number[]>([]);
    const [rightItems, setRightItems] = useState<MatchingPair[]>([]);
    
    useEffect(() => {
        if (data.content.pairs) {
            setRightItems([...(data.content.pairs as MatchingPair[])].sort(() => Math.random() - 0.5));
        }
    }, [data.content.pairs]);

    const handleLeftClick = (id: number) => {
        if (matchedIds.includes(id)) return;
        setSelectedId(id === selectedId ? null : id);
    };

    const handleRightClick = (id: number) => {
        if (matchedIds.includes(id)) return;
        if (selectedId === null) return;

        if (selectedId === id) {
            setMatchedIds([...matchedIds, id]);
            setSelectedId(null);
        } else {
            setSelectedId(null);
        }
    };

    const highlights = matchedIds.map((id, index) => {
        const pair = data.content.pairs.find((p: MatchingPair) => p.id === id);
        return {
            id: pair?.id || 0,
            text: pair?.contextHighlight || '',
            colorClass: HIGHLIGHT_COLORS[index % HIGHLIGHT_COLORS.length]
        };
    }).filter(h => h.text !== '');

    return (
        <div className="h-full flex flex-col items-center p-4 overflow-y-auto bg-slate-50 justify-start pt-6 md:pt-10 pb-20 relative">
             <TextReferenceModal text={data.content.referenceText} highlights={highlights} />
             
             <div className="max-w-6xl w-full shrink-0">
                <div className="text-center mb-6 md:mb-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-ocean-900">{data.title}</h3>
                    <p className="text-slate-500 text-sm md:text-base">{data.subtitle}</p>
                </div>

                <div className="flex flex-col md:flex-row gap-4 md:gap-16 justify-center items-stretch">
                    <div className="flex-1 space-y-3 md:space-y-4">
                        {data.content.pairs.map((pair: MatchingPair) => {
                            const isMatched = matchedIds.includes(pair.id);
                            const isSelected = selectedId === pair.id;
                            const index = matchedIds.indexOf(pair.id);
                            const colorClass = index >= 0 ? HIGHLIGHT_COLORS[index % HIGHLIGHT_COLORS.length].split(' ')[0] : '';
                            
                            return (
                                <button
                                    key={pair.id}
                                    onClick={() => handleLeftClick(pair.id)}
                                    disabled={isMatched}
                                    className={`w-full p-3 md:p-4 rounded-xl text-left border-2 transition-all duration-200 ${
                                        isMatched 
                                            ? `${colorClass} border-transparent opacity-80 cursor-default shadow-sm` 
                                            : isSelected 
                                                ? 'bg-ocean-100 border-ocean-500 shadow-md transform scale-[1.02]' 
                                                : 'bg-white border-slate-200 hover:border-ocean-300'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-bold shrink-0 ${isMatched ? 'bg-white/50 text-slate-800' : 'bg-slate-100 text-slate-500'}`}>
                                            {pair.id}
                                        </span>
                                        <span className="text-base md:text-lg font-medium text-slate-800">{pair.left}</span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex-1 space-y-3 md:space-y-4">
                         {rightItems.map((pair: MatchingPair) => {
                            const isMatched = matchedIds.includes(pair.id);
                            const index = matchedIds.indexOf(pair.id);
                            const colorClass = index >= 0 ? HIGHLIGHT_COLORS[index % HIGHLIGHT_COLORS.length].split(' ')[0] : '';

                            return (
                                <button
                                    key={pair.id}
                                    onClick={() => handleRightClick(pair.id)}
                                    disabled={isMatched}
                                    className={`w-full p-3 md:p-4 rounded-xl text-left border-2 transition-all duration-200 ${
                                        isMatched 
                                            ? `${colorClass} border-transparent opacity-80 cursor-default shadow-sm` 
                                            : selectedId !== null && !isMatched
                                                ? 'bg-white border-slate-300 hover:bg-ocean-50 hover:border-ocean-400 cursor-pointer animate-pulse'
                                                : 'bg-white border-slate-200 opacity-60'
                                    }`}
                                >
                                     <span className="text-base md:text-lg font-medium text-slate-800">{pair.right}</span>
                                </button>
                            );
                         })}
                    </div>
                </div>
                
                {matchedIds.length === data.content.pairs.length && (
                    <div className="mt-8 text-center animate-bounce">
                        <div className="inline-block bg-green-100 text-green-800 px-8 py-4 rounded-full font-bold text-2xl border border-green-300 shadow-lg">
                            🎉 System Decoded!
                        </div>
                    </div>
                )}
             </div>
        </div>
    );
};

// --- DRILL SLIDE ---
export const DrillSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    return (
        <div className="h-full flex flex-col items-center justify-center p-4 bg-slate-100 overflow-y-auto pb-20">
             <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-slate-200">
                <div className="text-center mb-6 md:mb-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-ocean-900">{data.title}</h3>
                    <p className="text-slate-500 text-base md:text-lg">{data.subtitle}</p>
                </div>
                
                <div className="space-y-3 md:space-y-4">
                    {data.content.items && data.content.items.map((item: DrillItem) => (
                        <div key={item.id} className="p-3 md:p-4 bg-ocean-50 rounded-xl border-l-4 border-ocean-500 flex items-center gap-4">
                             {item.speaker && (
                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-ocean-200 flex items-center justify-center font-bold text-ocean-800 shrink-0">
                                    {item.speaker.charAt(0)}
                                </div>
                             )}
                             <div className="text-lg md:text-xl text-slate-800 flex-1 font-medium font-serif leading-relaxed">
                                {item.text}
                             </div>
                        </div>
                    ))}
                </div>
             </div>
        </div>
    );
};

// --- DEBRIEF SLIDE (Full Width Redesign) ---
export const DebriefSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    const [stamped, setStamped] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setStamped(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="h-full w-full flex items-center justify-center bg-slate-800 p-0 overflow-hidden relative">
             <div className="absolute inset-0 z-0 opacity-20 bg-[url('/uludag_spring.jpg')] bg-cover bg-center grayscale"></div>
             
             {/* Full screen dashboard layout */}
             <div className="relative z-10 w-full h-full flex flex-col bg-[#f4f4f4] overflow-y-auto">
                 {/* Top Bar */}
                 <div className="bg-slate-900 text-white p-4 md:px-12 flex justify-between items-center shadow-lg shrink-0">
                     <div>
                         <h1 className="text-2xl md:text-5xl font-black tracking-tighter uppercase">{data.title}</h1>
                         <div className="flex flex-wrap gap-2 md:gap-6 mt-1 md:mt-2 font-mono text-[10px] md:text-sm text-slate-400">
                             <span>UNIT: 4D</span>
                             <span>LOC: ULUDAĞ</span>
                             <span>OP: SPRINGWATCH</span>
                         </div>
                     </div>
                     <div className="hidden md:block text-right">
                         <div className="font-bold text-2xl text-green-500">MISSION SUCCESS</div>
                         <div className="text-xs text-slate-500">AUTHORIZED</div>
                     </div>
                 </div>

                 {/* Main Content Area - Horizontal Spread */}
                 <div className="flex-1 p-4 md:p-12 overflow-y-auto pb-20">
                     <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 h-full">
                         
                         {/* Left Panel: Personnel */}
                         <div className="bg-white p-6 md:p-8 shadow-sm border border-slate-200 flex flex-col gap-4 md:gap-6">
                             <h3 className="font-bold text-slate-400 uppercase tracking-widest border-b pb-2">Personnel File</h3>
                             <div className="flex items-center gap-4">
                                 <div className="w-16 h-16 md:w-24 md:h-24 bg-slate-200 rounded-full flex items-center justify-center text-3xl md:text-4xl grayscale">👤</div>
                                 <div>
                                     <div className="font-bold text-lg md:text-xl">SCOUT</div>
                                     <div className="text-slate-500 text-sm">Level A2</div>
                                 </div>
                             </div>
                             <div className="bg-yellow-50 p-4 border-l-4 border-yellow-400 text-slate-700 italic text-sm md:text-base">
                                 "Sailor has demonstrated excellent command of advice (should) and rules (imperatives)."
                             </div>
                             
                             <div className="mt-auto pt-4 md:pt-8">
                                 <div className="text-xs text-slate-400 uppercase mb-1">Approved By</div>
                                 <div className="font-serif text-2xl md:text-3xl text-blue-900 italic font-bold">Cpt. English</div>
                             </div>
                         </div>

                         {/* Center/Right Panel: Proficiency Log (Wider) */}
                         <div className="md:col-span-2 bg-white p-6 md:p-8 shadow-sm border border-slate-200">
                             <h3 className="font-bold text-slate-400 uppercase tracking-widest border-b pb-2 mb-4 md:mb-6">Operational Proficiency Log</h3>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                 {data.content.checklist.map((item: DebriefItem, i: number) => (
                                     <div key={i} className="flex items-start gap-4 p-3 md:p-4 bg-slate-50 border border-slate-100 rounded hover:bg-white hover:shadow-md transition-all">
                                         <div className="mt-1 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">✓</div>
                                         <div>
                                             <span className="font-bold block text-sm uppercase text-slate-800 mb-1">{item.text}</span>
                                             <span className="text-slate-600 text-sm leading-relaxed">{item.reflection}</span>
                                         </div>
                                     </div>
                                 ))}
                             </div>
                         </div>
                     </div>
                 </div>

                 {/* Stamp Overlay */}
                 <div className={`absolute bottom-20 right-4 md:bottom-10 md:right-20 pointer-events-none transition-all duration-700 ${stamped ? 'opacity-90 scale-100' : 'opacity-0 scale-150'}`}>
                     <div className="border-4 md:border-8 border-green-800 text-green-800 font-black text-4xl md:text-8xl p-4 md:p-6 rounded-xl rotate-[-12deg] uppercase" style={{ mixBlendMode: 'multiply' }}>
                         APPROVED
                     </div>
                 </div>
             </div>
        </div>
    );
};

export const GrammarBankSlide: React.FC<{ data: SlideData }> = ({ data }) => <div>Grammar Bank Placeholder</div>;
