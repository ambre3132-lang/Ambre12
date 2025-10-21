import React from 'react';
import { TeamMember } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { TranslationKeys } from '../translations';

interface TeamMemberCardProps {
  member: TeamMember;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  const { t } = useLanguage();
  return (
    <div className="bg-white rounded-lg shadow-lg text-center p-6">
      <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
      <h3 className="text-xl font-bold text-brand-gray">{member.name}</h3>
      <p className="text-brand-pink mb-2">{t(member.role as TranslationKeys)}</p>
      <p className="text-gray-600 text-sm">{t(member.bio as TranslationKeys)}</p>
    </div>
  );
};

export default TeamMemberCard;
