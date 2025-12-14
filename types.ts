
export enum SlideType {
  COVER = 'COVER',
  OBJECTIVES = 'OBJECTIVES',
  ICE_BREAKER = 'ICE_BREAKER',
  READING = 'READING',
  COMPREHENSION_TF = 'COMPREHENSION_TF',
  COMPREHENSION_MC = 'COMPREHENSION_MC',
  GRAMMAR = 'GRAMMAR',
  GRAMMAR_BANK = 'GRAMMAR_BANK',
  DRILL = 'DRILL',
  SPEAKING = 'SPEAKING',
  MEDIA = 'MEDIA',
  MATCHING = 'MATCHING',
  CHECKLIST = 'CHECKLIST',
  QA = 'QA',
  SCRAMBLE = 'SCRAMBLE', 
  DEBRIEF = 'DEBRIEF',
  IMPERATIVES = 'IMPERATIVES',
  MISSION_LOG = 'MISSION_LOG' // New Slide Type
}

export interface Vocabulary {
  word: string;
  definition: string;
}

export interface KeyPoint {
  title: string;
  content: string;
  position: 'left' | 'right';
}

export interface ReadingContent {
  text: string;
  vocabulary: Vocabulary[];
  keyPoints?: KeyPoint[];
  audioSrc?: string; 
  backgroundImage?: string;
  backgroundVideo?: string; 
  footerImage?: string; 
}

export interface SlideData {
  id: number;
  type: SlideType;
  title: string;
  subtitle?: string;
  content: any; 
}

export interface QuestionTF {
  id: number;
  statement: string;
  isTrue: boolean;
  explanation: string;
  contextHighlight?: string; 
}

export interface QuestionMC {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  iconType: 'history' | 'geography' | 'person' | 'general' | 'military';
  contextHighlight?: string; 
}

export interface GrammarItem {
  id: number;
  prefix: string;
  suffix: string;
  correctAnswer: string; 
}

export interface DrillItem {
  id: number;
  speaker?: string;
  text: string;
}

export interface GrammarBankItem {
  id: number;
  segments: string[]; 
  answers: string[]; 
}

export interface GrammarBankSection {
  id: number;
  title: string;
  instruction: string;
  items: GrammarBankItem[];
}

export interface MatchingPair {
  id: number;
  left: string;
  right: string;
  contextHighlight?: string; 
}

export interface ChecklistItem {
  id: string;
  text: string;
  isCorrect: boolean; 
  contextHighlight?: string; 
}

export interface QAItem {
  id: number;
  question: string;
  answer: string;
  contextHighlight?: string; 
}

export interface ScrambleItem {
  id: number;
  parts: string[]; // ["You", "should", "go"]
  correctSentence: string;
}

export interface DebriefItem {
  text: string;
  reflection: string;
}

export interface ImperativeSign {
  icon: string;
  rule: string;
  correct: boolean;
}

export interface GrammarQuizItem {
  id: number;
  question: string; // "_____ open your books"
  options: string[]; // ["Please", "Do"]
  correctIndex: number;
}

// New Interface for Mission Log
export interface MissionLogStep {
  id: number;
  phase: string;
  command: string;
  subCommand?: string;
  visualIcon: string; // Emoji or simple graphic rep
  style: 'normal' | 'alert' | 'action';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}