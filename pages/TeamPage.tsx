import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { TEAM_MEMBERS } from '../constants';
import TeamMemberCard from '../components/TeamMemberCard';

const TeamPage: React.FC = () => {
    const { t } = useLanguage();
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold text-center mb-10 text-brand-gray">{t('our_team')}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {TEAM_MEMBERS.map((member, index) => (
                    <TeamMemberCard key={index} member={member} />
                ))}
            </div>
        </div>
    );
}

export default TeamPage;
