export type Platform = 'TikTok' | 'Instagram Reels' | 'YouTube Shorts';

export type Tone = 'engaging' | 'funny' | 'inspirational' | 'educational' | 'storytime' | 'bold';

export type HookAngle = 'curiosity' | 'contrarian' | 'shocking' | 'mistake' | 'how-to';

export type Language = 'auto' | 'roman-urdu' | 'english';

export interface GeneratedCaption {
  id: string;
  topic: string;
  platform: Platform;
  tone: Tone;
  language?: Language;
  fullCaption: string;
  hook: string;
  valueCta: string;
  tags: string[];
  alternativeHooks: string[];
  creatorTip?: string;
  source?: string;
  createdAt: number;
}

export interface ComplianceReport {
  hookWordCount: number;
  isHookWordCountValid: boolean;
  hookEmojiCount: number;
  isHookEmojiValid: boolean;
  hasCleanLineBreaks: boolean;
  tagCount: number;
  isTagCountValid: boolean;
  bannedWords: string[];
  isToneClean: boolean;
  score: number;
  summary: string;
}
