import React from 'react';
import { Offer } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { TranslationKeys } from '../translations';
import { generateWhatsAppLink } from '../services/whatsappService';

interface OfferCardProps {
  offer: Offer;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer }) => {
  const { t } = useLanguage();
  const offerTitle = t(offer.title as TranslationKeys);

  const bookingMessage = t('offer_booking_whatsapp_template').replace('[Offer Name]', offerTitle);
  const whatsappUrl = generateWhatsAppLink(bookingMessage);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transform hover:scale-105 transition-transform duration-300">
      <img src={offer.image || `https://placehold.co/400x300/fecdd3/4A4A4A?text=Offre`} alt={offerTitle} className="w-full h-48 object-cover"/>
      <div className="p-6 flex flex-col flex-grow text-center">
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-brand-pink mb-3 flex-grow flex items-center justify-center">{offerTitle}</h3>
        <p className="text-brand-gray mb-6">{t(offer.description as TranslationKeys)}</p>
        <div className="mt-auto">
           <p className="text-2xl sm:text-3xl font-bold text-yellow-600 mb-6">{offer.price}</p>
           <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-brand-pink text-white font-bold py-3 px-8 rounded-full hover:bg-pink-700 transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
           >
              {t('book_now')}
           </a>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;