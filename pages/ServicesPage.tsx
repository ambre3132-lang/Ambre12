import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SERVICE_DATA } from '../constants';
import ServiceCard from '../components/ServiceCard';
import { ServiceCategory } from '../types';
import { TranslationKeys } from '../translations';
import { generateWhatsAppLink } from '../services/whatsappService';
import { WhatsAppIcon } from '../components/icons/Icons';

const ServicesPage: React.FC = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState(SERVICE_DATA[0].key);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const handleNavClick = (categoryKey: string) => {
    setActiveCategory(categoryKey);
    sectionRefs.current[categoryKey]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="bg-brand-beige">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-serif font-bold text-center mb-4 text-brand-gray">{t('our_services')}</h1>
        <p className="text-center text-gray-600 mb-10">{t('services_subtitle')}</p>

        <nav className="sticky top-20 bg-brand-beige/80 backdrop-blur-sm z-30 py-4 mb-8 overflow-x-auto whitespace-nowrap">
          <div className="flex justify-center items-center space-x-2 sm:space-x-4">
            {SERVICE_DATA.map((category) => (
              <button
                key={category.key}
                onClick={() => handleNavClick(category.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  activeCategory === category.key
                    ? 'bg-brand-pink text-white shadow-md'
                    : 'bg-white text-brand-gray hover:bg-pink-100'
                }`}
              >
                {t(category.key as TranslationKeys)}
              </button>
            ))}
          </div>
        </nav>

        <div className="space-y-16">
          {SERVICE_DATA.map((category: ServiceCategory) => (
            <section
              key={category.key}
              id={category.key}
              // FIX: A ref callback must not return a value. Changed from an implicit return to a block statement.
              ref={(el) => { sectionRefs.current[category.key] = el; }}
              className="scroll-mt-24"
            >
              <h2 className="text-3xl font-serif font-semibold mb-6 text-brand-pink border-b-2 border-pink-200 pb-2">
                {t(category.key as TranslationKeys)}
              </h2>
              
              {category.key === 'services_category_laser' ? (
                <div className="overflow-x-auto bg-white rounded-lg shadow-lg p-4">
                  <table className="w-full text-left">
                    <thead className="bg-pink-50">
                      <tr>
                        <th className="p-4 font-semibold text-brand-gray">{t('laser_table_zone')}</th>
                        <th className="p-4 font-semibold text-brand-gray text-center">{t('laser_table_session')}</th>
                        <th className="p-4 font-semibold text-brand-gray text-center">{t('laser_table_package')}</th>
                        <th className="p-4 font-semibold text-brand-gray text-center">{t('laser_table_action')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.services.map((service) => {
                        const serviceName = t(service.key as TranslationKeys);
                        const bookingMessage = t('laser_booking_whatsapp_template')
                            .replace(/\[Service Name\]/g, serviceName);
                        const whatsappUrl = generateWhatsAppLink(bookingMessage);

                        return (
                          <tr key={service.key} className="border-t">
                            <td className="p-4 text-brand-gray">{serviceName}</td>
                            <td className="p-4 text-brand-gray text-center">{service.sessionPrice}DH</td>
                            <td className="p-4 text-brand-gray text-center">{service.packagePrice}DH</td>
                            <td className="p-4 text-center">
                              <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-3 py-2 text-xs font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 transition-colors"
                                aria-label={`${t('book_now')} ${serviceName}`}
                              >
                                <WhatsAppIcon className="w-4 h-4 mr-2" />
                                {t('book_now')}
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.services.map((service) => (
                    <ServiceCard key={service.key} service={service} />
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
