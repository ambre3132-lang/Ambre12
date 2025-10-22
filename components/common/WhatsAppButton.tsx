
import React from 'react';
import { CONTACT_INFO } from '../../constants';
import { generateWhatsAppLink } from '../../services/whatsappService';
import { WhatsAppIcon, InstagramIcon } from '../icons/Icons';
import { useLanguage } from '../../context/LanguageContext';

const WhatsAppButton: React.FC = () => {
  const { t } = useLanguage();
  const message = t('whatsapp_default_message');
  const whatsappLink = generateWhatsAppLink(message);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-center space-y-3">
      <a
        href={CONTACT_INFO.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 text-white p-3 rounded-full shadow-lg flex items-center justify-center hover:opacity-90 transition-all duration-300 transform hover:scale-110"
        aria-label={t('instagram_button_label')}
      >
        <InstagramIcon className="w-7 h-7" />
      </a>
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition-all duration-300 transform hover:scale-110"
        aria-label={t('whatsapp_button_contact')}
      >
        <WhatsAppIcon className="w-8 h-8" />
      </a>
    </div>
  );
};

export default WhatsAppButton;
