import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BEAUTY_TIPS } from '../constants';
import { TranslationKeys } from '../translations';

const TipsPage: React.FC = () => {
    const { t } = useLanguage();
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold text-center mb-10 text-brand-gray">{t('beauty_tips')}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {BEAUTY_TIPS.map(tip => (
                    <div key={tip.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img src={tip.image} alt={t(tip.title as TranslationKeys)} className="w-full h-56 object-cover" />
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-brand-gray mb-2">{t(tip.title as TranslationKeys)}</h3>
                            <p className="text-gray-600">{t(tip.excerpt as TranslationKeys)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TipsPage;
