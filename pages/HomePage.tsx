
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { db } from '../firebaseConfig';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { Review } from '../types';
import { UserIcon, ChatBubbleBottomCenterTextIcon, PaperAirplaneIcon } from '../components/icons/Icons';
import { OFFERS } from '../constants';
import { TranslationKeys } from '../translations';

// Reviews Section Component defined inside HomePage
const ReviewsSection: React.FC = () => {
    const { t } = useLanguage();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const reviewsData: Review[] = [];
            querySnapshot.forEach((doc) => {
                reviewsData.push({ id: doc.id, ...doc.data() } as Review);
            });
            setReviews(reviewsData);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching reviews: ", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [t]);

    // FIX: Refactored handleSubmit to use a promise chain to resolve scope-related errors.
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !comment.trim()) {
            setFeedback(t('review_form_error'));
            return;
        }
        setSubmitting(true);
        setFeedback('');

        addDoc(collection(db, 'reviews'), {
            name: name,
            comment: comment,
            createdAt: serverTimestamp()
        })
        .then(() => {
            setName('');
            setComment('');
            setFeedback(t('review_form_success'));
            setTimeout(() => setFeedback(''), 3000);
        })
        .catch((error) => {
            console.error("Error adding review: ", error);
            setFeedback(t('review_form_error'));
        })
        .finally(() => {
            setSubmitting(false);
        });
    };

    const getInitials = (nameStr: string) => {
        if (!nameStr) return '';
        return nameStr.split(' ').map(n => n[0]).join('').toUpperCase();
    }

    return (
        <section className="py-16 bg-brand-beige">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center mb-10 text-brand-gray">{t('reviews_title')}</h2>
                
                <div className="max-w-2xl mx-auto mb-12 bg-rose-50 p-6 sm:p-8 rounded-lg shadow-lg">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative">
                            <UserIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder={t('review_form_name_placeholder')}
                                required
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-pink"
                            />
                        </div>
                        <div className="relative">
                            <ChatBubbleBottomCenterTextIcon className="w-5 h-5 text-gray-400 absolute left-3 top-5" />
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder={t('review_form_comment_placeholder')}
                                required
                                rows={4}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-pink resize-none"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-brand-pink text-white font-bold py-3 px-6 rounded-md hover:bg-pink-700 transition duration-300 flex items-center justify-center disabled:bg-pink-300"
                        >
                            <PaperAirplaneIcon className="w-5 h-5 mr-2" />
                            {submitting ? t('review_form_submitting') : t('review_form_submit_button')}
                        </button>
                    </form>
                    {feedback && <p className={`mt-4 text-center text-sm ${feedback.includes('Error') || feedback.includes('erreur') ? 'text-red-600' : 'text-green-600'}`}>{feedback}</p>}
                </div>

                <div>
                    {loading ? (
                        <p className="text-center text-gray-500">{t('reviews_loading')}</p>
                    ) : reviews.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {reviews.map((review) => (
                                <div key={review.id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-brand-pink flex flex-col">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 rounded-full bg-brand-pink text-white flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0">
                                            {getInitials(review.name)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-brand-gray">{review.name}</p>
                                            {review.createdAt && review.createdAt.toDate && (
                                                <p className="text-xs text-gray-400">{new Date(review.createdAt.toDate()).toLocaleDateString()}</p>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-gray-600 italic">"{review.comment}"</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">{t('no_reviews_yet')}</p>
                    )}
                </div>
            </div>
        </section>
    );
};


const HomePage: React.FC = () => {
    const { t } = useLanguage();
    const topOffers = OFFERS.slice(0, 3);
    
    const backgroundImages = [
        "https://i.postimg.cc/Y2yQyPx1/1.png",
        "https://i.postimg.cc/Y9DLZ4Y1/2.png",
        "https://i.postimg.cc/SRzRPgyc/4.png",
        "https://i.postimg.cc/Pqh1mNgW/1.png",
        "https://i.postimg.cc/PfcZS6Gr/sy.png"
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
        }, 5000); // Change image every 5 seconds

        return () => clearTimeout(timer);
    }, [currentImageIndex, backgroundImages.length]);

    const homeServices = [
        { titleKey: 'services_category_visage' as TranslationKeys, descKey: 'home_services_facial_desc' as TranslationKeys, image: 'https://i.postimg.cc/ZYsNnJJ4/a.png' },
        { titleKey: 'services_category_onglerie' as TranslationKeys, descKey: 'home_services_onglerie_desc' as TranslationKeys, image: 'https://i.postimg.cc/hvNhrPGr/aa.png' },
        { titleKey: 'services_category_laser' as TranslationKeys, descKey: 'home_services_laser_desc' as TranslationKeys, image: 'https://i.postimg.cc/wjX3XzYM/aaa.png' },
        { titleKey: 'services_category_coiffure' as TranslationKeys, descKey: 'home_services_hair_desc' as TranslationKeys, image: 'https://i.postimg.cc/1XV3fhKq/aaaa.png' },
        { titleKey: 'home_services_epilation_naturel' as TranslationKeys, descKey: 'home_services_epilation_naturel_desc' as TranslationKeys, image: 'https://i.postimg.cc/W4prtzFK/aaaaa.png' },
    ];

    return (
        <div>
            <section className="relative h-[calc(100vh-80px)] flex items-center justify-center text-center overflow-hidden">
                {backgroundImages.map((src, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
                        style={{ backgroundImage: `url(${src})` }}
                        aria-hidden={index !== currentImageIndex}
                        role="img"
                        aria-label={`Background image ${index + 1}`}
                    />
                ))}
                <div className="relative z-10 text-white px-4">
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold mb-4" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>{t('hero_title')}</h1>
                    <p className="text-lg sm:text-xl md:text-2xl mb-8" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>{t('hero_subtitle')}</p>
                    <Link to="/booking" className="bg-brand-pink hover:bg-pink-700 text-white font-bold py-4 px-8 rounded-full text-lg transition duration-300">
                        {t('book_now')}
                    </Link>
                </div>
            </section>
            
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center mb-4 text-brand-gray">{t('our_services')}</h2>
                    <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">{t('services_subtitle')}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        {homeServices.map((service, index) => (
                            <div key={index} className="relative rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 group aspect-[4/5]">
                                <img 
                                    src={service.image} 
                                    alt={t(service.titleKey)} 
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                                <div className="relative z-10 h-full flex flex-col justify-center items-center p-4 text-center text-white">
                                    <h3 
                                        className="text-lg sm:text-xl font-serif font-bold mb-2"
                                        style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}
                                    >
                                        {t(service.titleKey)}
                                    </h3>
                                    <p 
                                        className="text-xs sm:text-sm mb-4 opacity-90"
                                        style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}
                                    >
                                        {t(service.descKey)}
                                    </p>
                                    <Link to="/services" className="font-semibold text-white border-b-2 border-transparent hover:border-white transition-colors duration-300 text-sm">
                                        {t('read_more')} &rarr;
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-brand-beige">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center mb-12 text-brand-gray">{t('special_offers')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {topOffers.map((offer, index) => (
                             <div key={index} className="relative rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 group aspect-[4/5]">
                                <img 
                                    src={offer.image || `https://placehold.co/400x500/${['fecdd3','fbcfe8','f9a8d4'][index]}/4A4A4A?text=Offre+${index + 1}`} 
                                    alt={t(offer.title as TranslationKeys)} 
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                                <div className="relative z-10 h-full flex flex-col justify-center items-center p-6 text-center text-white">
                                    <h3 
                                        className="text-2xl font-serif font-bold mb-4"
                                        style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.8)' }}
                                    >
                                        {t(offer.title as TranslationKeys)}
                                    </h3>
                                    <p 
                                        className="text-3xl font-bold text-yellow-400 mb-6"
                                        style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.8)' }}
                                    >
                                        {offer.price}
                                    </p>
                                    <Link 
                                        to="/offres" 
                                        className="inline-block bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-brand-pink transition-colors duration-300 shadow-lg"
                                    >
                                        {t('read_more')} &rarr;
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            <section className="py-16 bg-pink-50 text-center">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center mb-10 text-brand-gray">{t('map_section_title')}</h2>
                    <div className="max-w-4xl mx-auto shadow-xl rounded-2xl overflow-hidden h-[300px] md:h-[450px]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3440.4467227890163!2d-9.5927765!3d30.4234358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb3b7947320326d%3A0x82f4b87d3806c061!2sCentre%20ambre%20pour%20Elle!5e0!3m2!1sen!2sma!4v1761056683289!5m2!1sen!2sma"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title={t('map_section_title')}>
                        </iframe>
                    </div>
                    <a
                        href="https://maps.app.goo.gl/so69jyMyQQbzMfuo6?g_st=iwb"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-8 bg-brand-pink text-white font-bold px-8 py-4 rounded-full hover:bg-pink-700 transition duration-300 transform hover:scale-105">
                        🔗 {t('map_button_text')}
                    </a>
                </div>
            </section>
            
            <ReviewsSection />

        </div>
    );
}

export default HomePage;
