import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { RESULTS } from '../constants';
import { ResultCategory } from '../types';
import { TranslationKeys } from '../translations';

const categories: ResultCategory[] = ['onglerie', 'visage', 'corps', 'coiffure'];

const ResultsPage: React.FC = () => {
    const { t } = useLanguage();
    const [filter, setFilter] = useState<ResultCategory | 'all'>('all');

    const filteredResults = filter === 'all' ? RESULTS : RESULTS.filter(r => r.category === filter);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold text-center mb-10 text-brand-gray">{t('our_results')}</h1>
            <div className="flex justify-center flex-wrap gap-2 mb-8">
                <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'all' ? 'bg-brand-pink text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>{t('all')}</button>
                {categories.map(cat => (
                    <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === cat ? 'bg-brand-pink text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>{t(cat as TranslationKeys)}</button>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredResults.map(result => (
                    <div key={result.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="flex">
                            <div className="w-1/2 relative">
                                <img src={result.before} alt="Before" className="object-cover h-full w-full"/>
                                <div className="absolute bottom-0 left-0 w-full text-center bg-black/50 text-white py-1 text-sm font-semibold">{t('before')}</div>
                            </div>
                            <div className="w-1/2 relative">
                                <img src={result.after} alt="After" className="object-cover h-full w-full"/>
                                <div className="absolute bottom-0 left-0 w-full text-center bg-brand-pink/80 text-white py-1 text-sm font-semibold">{t('after')}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ResultsPage;
