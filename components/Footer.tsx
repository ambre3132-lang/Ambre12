import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CONTACT_INFO } from '../constants';
import { PhoneIcon, MapPinIcon, MailIcon, InstagramIcon, FacebookIcon, WhatsAppIcon } from './icons/Icons';
import { generateWhatsAppLink } from '../services/whatsappService';


const Footer: React.FC = () => {
  const { t } = useLanguage();
  const whatsappLink = generateWhatsAppLink(t('whatsapp_default_message'));

  return (
    <footer className="bg-brand-gray text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 font-serif">Ambre</h3>
            <p className="text-gray-300">{t('footer_description')}</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">{t('contact_us')}</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center"><MapPinIcon className="w-5 h-5 mr-3 flex-shrink-0" /><span>{CONTACT_INFO.address}</span></li>
              <li className="flex items-center"><PhoneIcon className="w-5 h-5 mr-3 flex-shrink-0" /><a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-brand-pink">{CONTACT_INFO.phone}</a></li>
              <li className="flex items-center"><MailIcon className="w-5 h-5 mr-3 flex-shrink-0" /><a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-brand-pink">{CONTACT_INFO.email}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">{t('follow_us')}</h3>
            <div className="flex space-x-4">
              <a href={CONTACT_INFO.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-300 hover:text-brand-pink"><InstagramIcon className="w-6 h-6" /></a>
              <a href={CONTACT_INFO.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-300 hover:text-brand-pink"><FacebookIcon className="w-6 h-6" /></a>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-gray-300 hover:text-brand-pink"><WhatsAppIcon className="w-6 h-6" /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Ambre. {t('all_rights_reserved')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;