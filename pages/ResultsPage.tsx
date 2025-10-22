
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { RESULTS_GALLERY, RESULTS_BEFORE_AFTER } from '../constants';
import { TranslationKeys } from '../translations';
import ImageModal from '../components/common/ImageModal';
import { ResultImage, GalleryImage } from '../types';

const ResultsPage: React.FC = () => {
    const { t } = useLanguage();
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

    const handleImageClick = (image: GalleryImage) => {
        setSelectedImage(image);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    return (
        <>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-center mb-12 text-brand-gray">{t('our_results')}</h1>
                
                {/* Image Gallery Section */}
                <section className="mb-16">
                    <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-center mb-8 text-brand-pink border-b-2 border-pink-200 pb-2 max-w-md mx-auto">{t('results_gallery_section_title')}</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {RESULTS_GALLERY.map(image => {
                            const categoryName = t(image.category as TranslationKeys);
                            const altText = `${categoryName} #${image.id}`;
                            return (
                                <button
                                    key={`gallery-${image.id}`}
                                    className="bg-white rounded-lg shadow-md overflow-hidden aspect-square block w-full focus:outline-none focus:ring-2 focus:ring-brand-pink focus:ring-offset-2 transition-transform duration-300 transform hover:scale-105"
                                    onClick={() => handleImageClick(image)}
                                    aria-label={`Agrandir l'image: ${altText}`}
                                >
                                    <img src={image.src} alt={altText} className="object-cover h-full w-full"/>
                                </button>
                            );
                        })}
                    </div>
                </section>

                {/* Before & After Section */}
                <section>
                    <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-center mb-8 text-brand-pink border-b-2 border-pink-200 pb-2 max-w-md mx-auto">{t('results_before_after_section_title')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {RESULTS_BEFORE_AFTER.map(result => (
                            <div key={`comparison-${result.id}`} className="bg-white p-4 rounded-lg shadow-lg">
                                <div className="flex gap-2 sm:gap-4">
                                    <div className="flex-1 text-center">
                                        <p className="font-semibold mb-2 text-gray-600">{t('before')}</p>
                                        <img 
                                            src={result.before} 
                                            alt={`${t('before')} - ${t(result.category as TranslationKeys)} #${result.id}`} 
                                            className="rounded-md w-full object-cover aspect-square" 
                                        />
                                    </div>
                                    <div className="flex-1 text-center">
                                        <p className="font-semibold mb-2 text-gray-600">{t('after')}</p>
                                        <img 
                                            src={result.after} 
                                            alt={`${t('after')} - ${t(result.category as TranslationKeys)} #${result.id}`} 
                                            className="rounded-md w-full object-cover aspect-square" 
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            {selectedImage && (
                <ImageModal
                    imageUrl={selectedImage.src}
                    onClose={handleCloseModal}
                    altText={`${t(selectedImage.category as TranslationKeys)} #${selectedImage.id}`}
                />
            )}
        </>
    );
}

export default ResultsPage;