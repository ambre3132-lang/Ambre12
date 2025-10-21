
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { db } from '../firebaseConfig';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { Review } from '../types';
import { UserIcon, ChatBubbleBottomCenterTextIcon, PaperAirplaneIcon, SparklesIcon, FaceSmileIcon, ScissorsIcon } from '../components/icons/Icons';
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
                <h2 className="text-4xl font-serif font-bold text-center mb-10 text-brand-gray">{t('reviews_title')}</h2>
                
                <div className="max-w-2xl mx-auto mb-12 bg-rose-50 p-8 rounded-lg shadow-lg">
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
    
    return (
        <div>
            <section className="relative h-[calc(100vh-80px)] flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: "url('https://i.postimg.cc/bvMP48pK/d.png')" }}>
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="relative z-10 text-white px-4">
                    <h1 className="text-5xl md:text-7xl font-bold mb-4">{t('hero_title')}</h1>
                    <p className="text-xl md:text-2xl mb-8">{t('hero_subtitle')}</p>
                    <Link to="/booking" className="bg-brand-pink hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300">
                        {t('book_now')}
                    </Link>
                </div>
            </section>
            
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-serif font-bold text-center mb-4 text-brand-gray">{t('our_services')}</h2>
                    <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">{t('services_subtitle')}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Service Card 1: Laser */}
                        <div className="text-center p-8 bg-rose-50 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                            <div className="inline-block p-4 bg-brand-pink text-white rounded-full mb-4">
                            <SparklesIcon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold font-serif text-brand-gray mb-2">{t('services_category_laser')}</h3>
                            <p className="text-gray-600 mb-4 h-16">{t('home_services_laser_desc')}</p>
                            <Link to="/services" className="font-semibold text-brand-pink hover:text-pink-700 transition-colors">
                            {t('read_more')} &rarr;
                            </Link>
                        </div>
                        {/* Service Card 2: Facial */}
                        <div className="text-center p-8 bg-rose-50 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                            <div className="inline-block p-4 bg-brand-pink text-white rounded-full mb-4">
                            <FaceSmileIcon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold font-serif text-brand-gray mb-2">{t('services_category_visage')}</h3>
                            <p className="text-gray-600 mb-4 h-16">{t('home_services_facial_desc')}</p>
                            <Link to="/services" className="font-semibold text-brand-pink hover:text-pink-700 transition-colors">
                            {t('read_more')} &rarr;
                            </Link>
                        </div>
                        {/* Service Card 3: Hair */}
                        <div className="text-center p-8 bg-rose-50 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                            <div className="inline-block p-4 bg-brand-pink text-white rounded-full mb-4">
                            <ScissorsIcon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold font-serif text-brand-gray mb-2">{t('services_category_coiffure')}</h3>
                            <p className="text-gray-600 mb-4 h-16">{t('home_services_hair_desc')}</p>
                            <Link to="/services" className="font-semibold text-brand-pink hover:text-pink-700 transition-colors">
                            {t('read_more')} &rarr;
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-brand-beige">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-serif font-bold text-center mb-12 text-brand-gray">{t('special_offers')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {topOffers.map((offer, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transform hover:scale-105 transition-transform duration-300">
                                <img src={`https://placehold.co/400x300/${['fecdd3','fbcfe8','f9a8d4'][index]}/4A4A4A?text=Offre+${index + 1}`} alt={t(offer.title as TranslationKeys)} className="w-full h-48 object-cover"/>
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold font-serif text-brand-pink mb-2 flex-grow">{t(offer.title as TranslationKeys)}</h3>
                                    <p className="text-3xl font-bold text-yellow-600 mb-4">{offer.price}</p>
                                    <Link to="/offres" className="mt-auto self-start font-semibold text-brand-pink hover:text-pink-700 transition-colors">
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
                    <h2 className="text-4xl font-serif font-bold text-center mb-10 text-brand-gray">{t('map_section_title')}</h2>
                    <div className="max-w-4xl mx-auto shadow-xl rounded-2xl overflow-hidden">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3440.4467227890163!2d-9.5927765!3d30.4234358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb3b7947320326d%3A0x82f4b87d3806c061!2sCentre%20ambre%20pour%20Elle!5e0!3m2!1sen!2sma!4v1761056683289!5m2!1sen!2sma"
                            width="100%"
                            height="450"
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
                        className="inline-block mt-8 bg-brand-pink text-white font-bold px-8 py-3 rounded-full hover:bg-pink-700 transition duration-300 transform hover:scale-105">
                        🔗 {t('map_button_text')}
                    </a>
                </div>
            </section>
            
            <ReviewsSection />

        </div>
    );
}

export default HomePage;
