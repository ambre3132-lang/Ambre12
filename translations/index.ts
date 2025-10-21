
import { fr } from './fr';
import { en } from './en';
import { ar } from './ar';

export const translations = {
  fr,
  en,
  ar,
};

export type TranslationKeys = keyof typeof fr;
