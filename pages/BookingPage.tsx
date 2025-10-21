import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { generateWhatsAppLink } from '../services/whatsappService';
import { SERVICE_DATA } from '../constants';
import { TranslationKeys } from '../translations';

const BookingPage: React.FC = () => {
    const { t } = useLanguage();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [service, setService] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [message, setMessage] = useState('');
    const [feedback, setFeedback] = useState('');

    const allServices = SERVICE_DATA.flatMap(category => category.services);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !phone || !service || !date || !time) {
            setFeedback(t('booking_feedback_error'));
            return;
        }

        const selectedService = allServices.find(s => s.key === service);
        const serviceName = selectedService ? t(selectedService.key as TranslationKeys) : '';

        const bookingMessage = t('booking_whatsapp_message_template')
            .replace('[Name]', name)
            .replace('[Service]', serviceName)
            .replace('[Date]', date)
            .replace('[Time]', time)
            + (message ? `\n${t('booking_whatsapp_comment')}: ${message}` : '');
        
        const whatsappUrl = generateWhatsAppLink(bookingMessage);
        window.open(whatsappUrl, '_blank');
        setFeedback(t('booking_feedback_success'));
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-serif font-bold text-center mb-4 text-brand-gray">{t('book_appointment')}</h1>
            <p className="text-center text-gray-600 mb-10">{t('booking_page_description')}</p>
            
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t('booking_form_name')}</label>
                        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-pink focus:border-brand-pink" />
                    </div>
                     <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">{t('booking_form_phone')}</label>
                        <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-pink focus:border-brand-pink" />
                    </div>
                    <div>
                        <label htmlFor="service" className="block text-sm font-medium text-gray-700">{t('booking_form_service')}</label>
                        <select id="service" value={service} onChange={e => setService(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-pink focus:border-brand-pink">
                            <option value="">{t('booking_form_select_service')}</option>
                            {SERVICE_DATA.map(category => (
                                <optgroup key={category.key} label={t(category.key as TranslationKeys)}>
                                    {category.services.map(s => (
                                        <option key={s.key} value={s.key}>{t(s.key as TranslationKeys)}</option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700">{t('booking_form_date')}</label>
                            <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-pink focus:border-brand-pink" />
                        </div>
                        <div>
                            <label htmlFor="time" className="block text-sm font-medium text-gray-700">{t('booking_form_time')}</label>
                            <input type="time" id="time" value={time} onChange={e => setTime(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-pink focus:border-brand-pink" />
                        </div>
                    </div>
                     <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">{t('booking_form_comment')}</label>
                        <textarea id="message" value={message} onChange={e => setMessage(e.target.value)} rows={3} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-pink focus:border-brand-pink"></textarea>
                    </div>
                    <div>
                        <button type="submit" className="w-full bg-brand-pink hover:bg-pink-700 text-white font-bold py-3 px-4 rounded-md transition duration-300">{t('book_now_whatsapp')}</button>
                    </div>
                </form>
                {feedback && <p className={`mt-4 text-center text-sm ${feedback.includes('erreur') ? 'text-red-600' : 'text-green-600'}`}>{feedback}</p>}
            </div>
        </div>
    );
};

export default BookingPage;
