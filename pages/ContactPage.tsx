import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CONTACT_INFO } from '../constants';
import { PhoneIcon, MapPinIcon, MailIcon, WhatsAppIcon } from '../components/icons/Icons';

const ContactPage: React.FC = () => {
    const { t } = useLanguage();
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-serif font-bold text-center mb-10 text-brand-gray">{t('contact_us')}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center flex flex-col items-center justify-center h-full">
                    <h2 className="text-2xl font-semibold mb-4 text-brand-gray">{t('contact_whatsapp_prompt')}</h2>
                    <p className="text-gray-600 mb-6">
                       {t('contact_whatsapp_reply_time')}
                    </p>
                    <a
                        href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-8 py-4 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-transform transform hover:scale-105 shadow-lg"
                    >
                        <WhatsAppIcon className="w-6 h-6 mr-3" />
                        {t('contact_whatsapp_button')}
                    </a>
                </div>
                <div>
                     <h2 className="text-2xl font-semibold mb-4 text-brand-gray">{t('our_location')}</h2>
                     <div className="space-y-4 text-brand-gray">
                        <div className="flex items-start">
                            <MapPinIcon className="w-6 h-6 mr-3 mt-1 text-brand-pink flex-shrink-0" />
                            <span>{CONTACT_INFO.address}</span>
                        </div>
                        <div className="flex items-center">
                            <PhoneIcon className="w-6 h-6 mr-3 text-brand-pink flex-shrink-0" />
                            <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-brand-pink">{CONTACT_INFO.phone}</a>
                        </div>
                        <div className="flex items-center">
                            <MailIcon className="w-6 h-6 mr-3 text-brand-pink flex-shrink-0" />
                            <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-brand-pink">{CONTACT_INFO.email}</a>
                        </div>
                     </div>
                     <div className="mt-6 h-64 bg-gray-300 rounded-lg overflow-hidden shadow-md">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3440.665402092288!2d-9.59733072439504!3d30.416828901506504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb3b6f0a3e8e6ab%3A0x1d37f37497d5a52!2sFal%20Ould%20Oumeir%2C%20Agadir%2080000%2C%20Morocco!5e0!3m2!1sen!2sus!4v1721345432420!5m2!1sen!2sus"
                            width="100%" 
                            height="100%" 
                            style={{border:0}} 
                            allowFullScreen={false}
                            loading="lazy"
                            title="Google Maps Location"
                        ></iframe>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;