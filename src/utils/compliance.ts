import { ComplianceReport } from '../types';

export const BANNED_WORDS = [
  'delve',
  'testament',
  'revolutionize',
  'moreover',
  'tapestry',
  'foster',
  'elevate',
  'unlock',
  'supercharge',
  'nestled',
  'beacon',
  'game-changer',
  'dive deep',
  'empower',
  'harness',
  'in conclusion',
  'transformative',
];

export function countEmojis(str: string): number {
  // Regex for Extended_Pictographic characters
  const emojiRegex = /[\p{Extended_Pictographic}]/gu;
  const matches = str.match(emojiRegex);
  return matches ? matches.length : 0;
}

export function countWordsWithoutEmoji(str: string): number {
  return str
    .trim()
    .replace(/[\p{Extended_Pictographic}\uFE0F\u200D]/gu, '')
    .replace(/[^\w\s]/g, '')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

export function analyzeCompliance(fullCaption: string): ComplianceReport {
  if (!fullCaption || !fullCaption.trim()) {
    return {
      hookWordCount: 0,
      isHookWordCountValid: false,
      hookEmojiCount: 0,
      isHookEmojiValid: false,
      hasCleanLineBreaks: false,
      tagCount: 0,
      isTagCountValid: false,
      bannedWords: [],
      isToneClean: true,
      score: 0,
      summary: 'No caption entered',
    };
  }

  const lines = fullCaption.split(/\r?\n/);
  const hookLine = lines[0] || '';
  
  // Hook analysis
  const hookWordCount = countWordsWithoutEmoji(hookLine);
  const isHookWordCountValid = hookWordCount > 0 && hookWordCount < 7;
  const hookEmojiCount = countEmojis(hookLine);
  const isHookEmojiValid = hookEmojiCount === 1;

  // Empty line breaks check
  // Blueprint specifies: Line 1: Hook, Line 2: Empty, Lines 3-4: Value/CTA, Line 5: Empty, Line 6: Tags
  // Check if double newlines exist separating sections
  const sections = fullCaption.split(/\n\s*\n/).filter((s) => s.trim().length > 0);
  const hasCleanLineBreaks = sections.length >= 3;

  // Hashtags analysis
  const hashtagMatches = fullCaption.match(/#[a-zA-Z0-9_]+/g) || [];
  const tagCount = hashtagMatches.length;
  const isTagCountValid = tagCount >= 3 && tagCount <= 5;

  // Banned words check
  const lowerCaption = fullCaption.toLowerCase();
  const foundBanned = BANNED_WORDS.filter((word) =>
    new RegExp(`\\b${word}\\b`, 'i').test(lowerCaption)
  );
  const isToneClean = foundBanned.length === 0;

  // Calculate score (out of 100)
  let score = 0;
  if (isHookWordCountValid) score += 25;
  if (isHookEmojiValid) score += 20;
  if (hasCleanLineBreaks) score += 15;
  if (isTagCountValid) score += 20;
  if (isToneClean) score += 20;

  let summary = 'Blueprint Passed (100%)';
  if (score < 100) {
    const issues: string[] = [];
    if (!isHookWordCountValid) issues.push(`Hook has ${hookWordCount} words (must be <7)`);
    if (!isHookEmojiValid) issues.push(`Hook has ${hookEmojiCount} emojis (must be exactly 1)`);
    if (!hasCleanLineBreaks) issues.push('Missing empty line breaks between sections');
    if (!isTagCountValid) issues.push(`Found ${tagCount} tags (must be 3-5)`);
    if (!isToneClean) issues.push(`Contains AI buzzword: ${foundBanned.join(', ')}`);
    summary = issues[0] || 'Needs refinement';
  }

  return {
    hookWordCount,
    isHookWordCountValid,
    hookEmojiCount,
    isHookEmojiValid,
    hasCleanLineBreaks,
    tagCount,
    isTagCountValid,
    bannedWords: foundBanned,
    isToneClean,
    score,
    summary,
  };
}
