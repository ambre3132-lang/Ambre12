
import React from 'react';
import { Service } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { TranslationKeys } from '../translations';
import { generateWhatsAppLink } from '../services/whatsappService';
import { WhatsAppIcon } from './icons/Icons';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { t } = useLanguage();

  const serviceName = t(service.key as TranslationKeys);
  const bookingMessage = service.price
    ? t('service_booking_whatsapp_template')
        .replace(/\[Service Name\]/g, serviceName)
        .replace(/\[Price\]/g, service.price)
    : '';

  const whatsappUrl = bookingMessage ? generateWhatsAppLink(bookingMessage) : '#';

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between transform hover:-translate-y-2 transition-transform duration-300">
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-brand-gray mb-2">
          {serviceName}
        </h3>
        {service.noteKey && (
          <p className="text-sm text-gray-500 mb-4">
            {t(service.noteKey as TranslationKeys)}
          </p>
        )}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center gap-4">
        <div className="text-left">
          {service.price && (
            <p className="text-base sm:text-lg font-bold text-brand-pink">{service.price}</p>
          )}
          {service.duration && (
            <p className="text-sm text-gray-600 mt-1">
              {t('duration')}: {service.duration}
            </p>
          )}
        </div>
        {service.price && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 transition-colors"
            aria-label={`${t('book_now')} ${serviceName}`}
          >
            <WhatsAppIcon className="w-4 h-4 mr-2" />
            {t('book_now')}
          </a>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;
