
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
    <div className="relative rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 group aspect-[4/5]">
      <img src={offer.image || `https://placehold.co/400x500/fecdd3/4A4A4A?text=Offre`} alt={offerTitle} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      <div className="relative z-10 h-full flex flex-col justify-center items-center p-6 text-center text-white">
        <h3 
          className="text-2xl sm:text-3xl font-serif font-bold mb-4" 
          style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.8)' }}
        >
          {offerTitle}
        </h3>
        <p 
          className="mb-6 opacity-90" 
          style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}
        >
          {t(offer.description as TranslationKeys)}
        </p>
        <p 
          className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-6" 
          style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.8)' }}
        >
          {offer.price}
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-brand-pink text-white font-bold py-3 px-8 rounded-full hover:bg-pink-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          {t('book_now')}
        </a>
      </div>
    </div>
  );
};

export default OfferCard;
