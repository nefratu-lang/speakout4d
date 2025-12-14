import React, { useState, useEffect } from 'react';
import { SLIDES, LESSON_TITLE } from './constants';
import { SlideType } from './types';
import {
  CoverSlide,
  ObjectivesSlide,
  IceBreakerSlide,
  ReadingSlide,
  ComprehensionTFSlide,
  ComprehensionMCSlide,
  GrammarSlide,
  SpeakingSlide,
  DrillSlide,
  GrammarBankSlide,
  MediaSlide,
  MatchingSlide,
  ChecklistSlide,
  QASlide,
  ScrambleSlide,
  DebriefSlide,
  ImperativesSlide,
  MissionLogSlide
} from './components/SlideComponents';

const App = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const currentSlide = SLIDES[currentSlideIndex];
  const progress = ((currentSlideIndex + 1) / SLIDES.length) * 100;

  const nextSlide = () => {
    if (currentSlideIndex < SLIDES.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex]);

  const renderSlideContent = () => {
    switch (currentSlide.type) {
      case SlideType.COVER: return <CoverSlide data={currentSlide} />;
      case SlideType.OBJECTIVES: return <ObjectivesSlide data={currentSlide} />;
      // Pass nextSlide specifically to IceBreaker for the "Begin Operation" button
      case SlideType.ICE_BREAKER: return <IceBreakerSlide data={currentSlide} onNext={nextSlide} />;
      case SlideType.READING: return <ReadingSlide data={currentSlide} />;
      case SlideType.COMPREHENSION_TF: return <ComprehensionTFSlide data={currentSlide} />;
      case SlideType.COMPREHENSION_MC: return <ComprehensionMCSlide data={currentSlide} />;
      case SlideType.GRAMMAR: return <GrammarSlide data={currentSlide} />;
      case SlideType.DRILL: return <DrillSlide data={currentSlide} />;
      case SlideType.MATCHING: return <MatchingSlide data={currentSlide} />;
      case SlideType.SPEAKING: return <SpeakingSlide data={currentSlide} />;
      case SlideType.MEDIA: return <MediaSlide data={currentSlide} />;
      case SlideType.CHECKLIST: return <ChecklistSlide data={currentSlide} />;
      case SlideType.QA: return <QASlide data={currentSlide} />;
      case SlideType.SCRAMBLE: return <ScrambleSlide data={currentSlide} />;
      case SlideType.IMPERATIVES: return <ImperativesSlide data={currentSlide} />;
      case SlideType.MISSION_LOG: return <MissionLogSlide data={currentSlide} />;
      case SlideType.DEBRIEF: return <DebriefSlide data={currentSlide} />;
      default: return <div className="p-10">Slide content not implemented</div>;
    }
  };

  return (
    // FULL SCREEN CONTAINER - No padding, No rounded corners
    <div className="w-screen h-screen flex flex-col bg-ocean-50 font-sans overflow-hidden">
        
      {/* Top Bar (Header) - Sticky at top - REDUCED HEIGHT */}
      {currentSlide.type !== SlideType.COVER && (
        <header className="bg-white border-b border-ocean-100 h-10 md:h-12 flex items-center justify-between px-4 md:px-8 shadow-sm shrink-0 z-20">
          <div className="flex items-center gap-3">
              <span className="text-lg md:text-xl">🌲</span>
              <h1 className="text-ocean-900 font-bold text-sm md:text-base truncate">{LESSON_TITLE}</h1>
          </div>
          <div className="text-slate-400 font-serif italic text-xs md:text-sm">
            {currentSlideIndex + 1} / {SLIDES.length}
          </div>
        </header>
      )}

      {/* Progress Bar */}
      {currentSlide.type !== SlideType.COVER && (
        <div className="h-1 bg-ocean-100 w-full shrink-0 z-20">
          <div 
            className="h-full bg-ocean-600 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(16,185,129,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Main Content Area - Fills remaining height */}
      <main className="flex-1 overflow-hidden relative bg-[url('https://www.transparenttextures.com/patterns/paper.png')]">
        <div className="absolute inset-0 w-full h-full">
            {renderSlideContent()}
        </div>
      </main>

      {/* Navigation Footer - Sticky at bottom */}
      <footer className="bg-white border-t border-slate-200 px-4 py-2 md:p-4 shrink-0 z-20 flex justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <button
          onClick={prevSlide}
          disabled={currentSlideIndex === 0}
          className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-lg font-bold transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed bg-ocean-600 text-white hover:bg-ocean-700 shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="hidden sm:inline">Back</span>
        </button>

        {/* Slide Indicator Dots - Hide on small screens, adjust size */}
        {currentSlide.type !== SlideType.COVER && (
          <div className="hidden lg:flex gap-1.5 overflow-x-auto max-w-[50%] px-2">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all shrink-0 ${idx === currentSlideIndex ? 'bg-ocean-600 scale-125' : 'bg-slate-300 hover:bg-ocean-300'}`}
              />
            ))}
          </div>
        )}

        <button
          onClick={nextSlide}
          disabled={currentSlideIndex === SLIDES.length - 1}
          className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-lg font-bold transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed bg-ocean-600 text-white hover:bg-ocean-700 shadow-md"
        >
          <span className="hidden sm:inline">Next</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </footer>
    </div>
  );
};

export default App;