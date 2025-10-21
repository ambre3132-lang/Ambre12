
import React from 'react';
import { CONTACT_INFO } from '../../constants';
import { generateWhatsAppLink } from '../../services/whatsappService';
import { WhatsAppIcon } from '../icons/Icons';
import { useLanguage } from '../../context/LanguageContext';

const WhatsAppButton: React.FC = () => {
  const { t } = useLanguage();
  const message = t('whatsapp_default_message');
  const link = generateWhatsAppLink(message);

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 bg-green-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center md:hidden hover:bg-green-600 transition-all duration-300 transform hover:scale-110"
      aria-label={t('whatsapp_button_contact')}
    >
      <WhatsAppIcon className="w-8 h-8" />
    </a>
  );
};

export default WhatsAppButton;
