import { CONTACT_INFO } from '../constants';

export const generateWhatsAppLink = (message: string): string => {
  const phone = CONTACT_INFO.whatsapp;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encodedMessage}`;
};
