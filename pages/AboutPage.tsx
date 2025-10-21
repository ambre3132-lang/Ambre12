
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import FaqItem from '../components/FaqItem';
import { TranslationKeys } from '../translations';

const AboutPage: React.FC = () => {
    const { t } = useLanguage();
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const handleFaqClick = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const faqs: { qKey: TranslationKeys; aKey: TranslationKeys }[] = [
        { qKey: 'faq_q1', aKey: 'faq_a1' },
        { qKey: 'faq_q2', aKey: 'faq_a2' },
        { qKey: 'faq_q3', aKey: 'faq_a3' },
        { qKey: 'faq_q4', aKey: 'faq_a4' },
        { qKey: 'faq_q5', aKey: 'faq_a5' },
    ];

    return (
        <div>
            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2070&auto=format&fit=crop')" }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10 text-white px-4">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-4">{t('about_page_title')}</h1>
                    <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto">{t('about_hero_subtitle')}</p>
                </div>
            </section>

            {/* Main Content */}
            <div className="bg-brand-beige py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

                    {/* History Section */}
                    <section className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-6 text-brand-gray">{t('about_history_title')}</h2>
                            <div className="space-y-4 text-gray-700 leading-relaxed">
                                <p>{t('about_history_p1')}</p>
                                <p>{t('about_history_p2')}</p>
                            </div>
                        </div>
                        <div className="rounded-lg overflow-hidden shadow-2xl">
                            <img src="https://i.postimg.cc/B6XhT6Nn/af.png" />
                        </div>
                    </section>
                    
                    {/* Mission Section */}
                    <section className="text-center max-w-4xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-6 text-brand-gray">{t('about_mission_title')}</h2>
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">{t('about_mission_p1')}</p>
                    </section>

                    {/* Values Section */}
                    <section>
                         <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center mb-12 text-brand-gray">{t('about_values_title')}</h2>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                             <div className="text-center p-8 bg-white rounded-lg shadow-lg">
                                 <h3 className="text-xl sm:text-2xl font-serif font-bold text-brand-pink mb-3">{t('about_value_1_title')}</h3>
                                 <p className="text-gray-600">{t('about_value_1_desc')}</p>
                             </div>
                             <div className="text-center p-8 bg-white rounded-lg shadow-lg">
                                 <h3 className="text-xl sm:text-2xl font-serif font-bold text-brand-pink mb-3">{t('about_value_2_title')}</h3>
                                 <p className="text-gray-600">{t('about_value_2_desc')}</p>
                             </div>
                             <div className="text-center p-8 bg-white rounded-lg shadow-lg">
                                 <h3 className="text-xl sm:text-2xl font-serif font-bold text-brand-pink mb-3">{t('about_value_3_title')}</h3>
                                 <p className="text-gray-600">{t('about_value_3_desc')}</p>
                             </div>
                         </div>
                    </section>

                    {/* Commitment & CTA Section */}
                    <section className="bg-rose-50 text-center p-8 sm:p-12 rounded-lg shadow-xl">
                        <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-6 text-brand-gray">{t('about_commitment_title')}</h2>
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto mb-8">{t('about_commitment_p1')}</p>
                        <Link to="/services" className="bg-brand-pink hover:bg-pink-700 text-white font-bold py-4 px-8 rounded-full text-lg transition duration-300">
                             {t('about_cta_button')}
                        </Link>
                    </section>

                    {/* FAQ Section */}
                    <section>
                        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center mb-12 text-brand-gray">{t('faq_title')}</h2>
                        <div className="max-w-3xl mx-auto bg-white p-4 sm:p-8 rounded-lg shadow-lg">
                            {faqs.map((faq, index) => (
                                <FaqItem
                                    key={index}
                                    question={t(faq.qKey)}
                                    answer={t(faq.aKey)}
                                    isOpen={openFaqIndex === index}
                                    onClick={() => handleFaqClick(index)}
                                />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
