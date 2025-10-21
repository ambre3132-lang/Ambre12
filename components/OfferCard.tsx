
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
    <div className="bg-gradient-to-br from-rose-50 to-amber-50 rounded-lg shadow-lg p-8 flex flex-col justify-between text-center border-2 border-transparent hover:border-brand-pink transform hover:scale-105 hover:shadow-2xl transition-all duration-300 min-h-[360px]">
      <div>
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-brand-pink mb-3 min-h-[56px] sm:min-h-[64px] flex items-center justify-center">{offerTitle}</h3>
        <p className="text-brand-gray mb-6 min-h-0 sm:min-h-[70px]">{t(offer.description as TranslationKeys)}</p>
      </div>
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
  );
};

export default OfferCard;
