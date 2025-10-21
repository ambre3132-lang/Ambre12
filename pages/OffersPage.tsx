
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { OFFERS } from '../constants';
import OfferCard from '../components/OfferCard';
import { TranslationKeys } from '../translations';

const OffersPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl sm:text-4xl font-serif font-bold text-center mb-10 text-brand-gray">{t('special_offers')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {OFFERS.map((offer, index) => (
          <OfferCard key={index} offer={offer} />
        ))}
      </div>
      <p className="mt-16 text-center text-lg sm:text-xl font-serif text-brand-pink">
        {t('offers_tagline')}
      </p>
    </div>
  );
};

export default OffersPage;
