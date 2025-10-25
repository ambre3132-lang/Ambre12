
import { Offer, ResultImage, ServiceCategory, TeamMember, BeautyTip, GalleryImage } from './types';

export const CONTACT_INFO = {
  address: '27 rue fal ouald oumeir talborjte agadir',
  phone: '+212 666-678797',
  email: 'ambre3132@gmail.com',
  instagram: 'https://www.instagram.com/centre_ambre/',
  facebook: 'https://www.facebook.com/AmbreAgadir?mibextid=wwXIfr&mibextid=wwXIfr',
  whatsapp: '212666678797', // no + for wa.me link
};

export const SERVICE_DATA: ServiceCategory[] = [
  {
    key: 'services_category_onglerie',
    services: [
      { key: 'onglerie_manucure_simple', price: '70DH' },
      { key: 'onglerie_manucure_spa_pose', price: '150DH' },
      { key: 'onglerie_manucure_pedicure_simple', price: '200DH' },
      { key: 'onglerie_pedicure_spa_pose', price: '200DH' },
      { key: 'onglerie_pedicure_simple_pose', price: '150DH' },
      { key: 'onglerie_pedicure_medicale', price: '250DH' },
      { key: 'onglerie_pose_gel', price: '300DH' },
      { key: 'onglerie_nails_art', price: '300DH' },
      { key: 'onglerie_faux_ongles', price: '150DH' },
      { key: 'onglerie_bab_manucure_russe', price: '200DH' },
    ],
  },
  {
    key: 'services_category_visage',
    services: [
      { key: 'visage_soin_classique_1', price: '300DH' },
      { key: 'visage_soin_specifique_1', price: '400DH' },
      { key: 'visage_soin_hydrafacial_1', price: '500DH' },
      { key: 'visage_soin_vitamine_c_1', price: '600DH' },
      { key: 'visage_soin_microneedling_1', price: '800DH' },
      { key: 'visage_soin_classique_2', price: '300DH' },
      { key: 'visage_soin_specifique_2', price: '400DH' },
      { key: 'visage_soin_hydrafacial_2', price: '500DH' },
      { key: 'visage_soin_vitamine_c_2', price: '600DH' },
      { key: 'visage_soin_microneedling_2', price: '800DH' },
      { key: 'visage_mesotherapie', price: 'À partir de 800DH' },
      { key: 'visage_prp', price: '500DH' },
    ],
  },
  {
    key: 'services_category_corps',
    services: [
        { key: 'corps_massage_relaxant', price: '200DH' },
        { key: 'corps_massage_tonifiant', price: '300DH' },
        { key: 'corps_massage_amincissant', price: '300DH' },
        { key: 'corps_massage_bresilien', price: '350DH' },
    ],
  },
  {
      key: 'services_category_coiffure',
      services: [
          { key: 'coiffure_shampoing', price: '20DH' },
          { key: 'coiffure_brushing', price: '40/80DH' },
          { key: 'coiffure_coupe', price: '50DH' },
          { key: 'coiffure_meche_bonnet', price: '200/250DH' },
          { key: 'coiffure_coloration', price: '200/250/300DH' },
          { key: 'coiffure_meche_al_results', price: '300/400DH' },
          { key: 'coiffure_reflet', price: '300/400DH' },
          { key: 'coiffure_coloration_soin', price: '350/400DH' },
          { key: 'coiffure_soin_proteine', price: '300DH' },
          { key: 'coiffure_keratine', price: 'à partir de 700DH' },
          { key: 'coiffure_maquillage', price: '150/200DH' },
          { key: 'coiffure_chignon_mariee', price: '1000DH' },
      ]
  },
  {
    key: 'services_category_epilation',
    services: [
      { key: 'epilation_sourcils', price: '30DH' },
      { key: 'epilation_duvet', price: '30DH' },
      { key: 'epilation_menton', price: '30DH' },
      { key: 'epilation_sourcils_duvet', price: '50DH' },
      { key: 'epilation_menton_sourcils_duvet', price: '70DH' },
      { key: 'epilation_visage_sans_sourcils', price: '80DH' },
      { key: 'epilation_visage_avec_sourcils', price: '100DH' },
      { key: 'epilation_aisselles', price: '30DH' },
      { key: 'epilation_avant_bras', price: '50DH' },
      { key: 'epilation_bras_complet', price: '70DH' },
      { key: 'epilation_ventre', price: '50DH' },
      { key: 'epilation_dos', price: '70DH' },
      { key: 'epilation_bas_dos', price: '50DH' },
      { key: 'epilation_bord_maillot', price: '50/80DH' },
      { key: 'epilation_maillot_complet', price: '100DH' },
      { key: 'epilation_demi_jambe', price: '70DH' },
      { key: 'epilation_jambe_complet', price: '120DH' },
      { key: 'epilation_forfait_cire', price: '300DH' },
    ]
  },
  {
    key: 'services_category_laser',
    services: [
        { key: 'laser_zone_levre_superieure', sessionPrice: '150', packagePrice: '900' },
        { key: 'laser_zone_visage', sessionPrice: '500', packagePrice: '2700' },
        { key: 'laser_zone_menton', sessionPrice: '150', packagePrice: '900' },
        { key: 'laser_zone_aisselles', sessionPrice: '250', packagePrice: '1500' },
        { key: 'laser_zone_maillot_classique', sessionPrice: '350', packagePrice: '1800' },
        { key: 'laser_zone_maillot_integral', sessionPrice: '500', packagePrice: '2700' },
        { key: 'laser_zone_jambes_completes', sessionPrice: '900', packagePrice: '4800' },
        { key: 'laser_zone_demi_jambes', sessionPrice: '600', packagePrice: '3300' },
        { key: 'laser_zone_pattes', sessionPrice: '250', packagePrice: '1200' },
        { key: 'laser_zone_avant_bras', sessionPrice: '450', packagePrice: '2400' },
        { key: 'laser_zone_bras_complets', sessionPrice: '500', packagePrice: '2700' },
        { key: 'laser_zone_main', sessionPrice: '250', packagePrice: '1200' },
        { key: 'laser_zone_doigts', sessionPrice: '200', packagePrice: '900' },
        { key: 'laser_zone_cou', sessionPrice: '400', packagePrice: '2100' },
        { key: 'laser_zone_dos', sessionPrice: '300-500', packagePrice: '2100' },
        { key: 'laser_zone_ventre', sessionPrice: '450', packagePrice: '2400' },
        { key: 'laser_zone_bas_ventre', sessionPrice: '300', packagePrice: '1500' },
        { key: 'laser_zone_barbe', sessionPrice: '300-400', packagePrice: '1500-2100' },
    ],
  },
];

// FIX: Add TEAM_MEMBERS constant to resolve error in TeamPage.tsx
export const TEAM_MEMBERS: TeamMember[] = [
    {
        name: 'Ambre Dubois',
        role: 'team_role_founder',
        bio: 'team_bio_founder',
        image: 'https://i.pravatar.cc/150?u=ambre'
    },
    {
        name: 'Chloé Bernard',
        role: 'team_role_esthetician',
        bio: 'team_bio_esthetician',
        image: 'https://i.pravatar.cc/150?u=chloe'
    },
    {
        name: 'Léa Martin',
        role: 'team_role_stylist',
        bio: 'team_bio_stylist',
        image: 'https://i.pravatar.cc/150?u=lea'
    }
];

// FIX: Add BEAUTY_TIPS constant to resolve error in TipsPage.tsx
export const BEAUTY_TIPS: BeautyTip[] = [
    {
        id: 1,
        title: 'tip_hydrate_title',
        excerpt: 'tip_hydrate_excerpt',
        image: 'https://images.unsplash.com/photo-1556760544-74068565f05c?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 2,
        title: 'tip_sunscreen_title',
        excerpt: 'tip_sunscreen_excerpt',
        image: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b23?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 3,
        title: 'tip_cleansing_title',
        excerpt: 'tip_cleansing_excerpt',
        image: 'https://images.unsplash.com/photo-1620916566398-39f168a2d0c1?q=80&w=2070&auto=format&fit=crop'
    }
];

export const OFFERS: Offer[] = [
    {
        title: 'offer_biab_manicure_russe_title',
        description: 'offer_biab_manicure_russe_desc',
        price: '200DH',
        image: "https://i.postimg.cc/66kVW99c/hshthb.png"
    },
    {
        title: 'offer_mani_pedi_perm_title',
        description: 'offer_mani_pedi_perm_desc',
        price: '250DH',
        image: "https://i.postimg.cc/ZnpdBdTG/ʿbgh.png"
    },
    {
        title: 'offer_gel_title',
        description: 'offer_gel_desc',
        price: '250DH',
        image: "https://i.postimg.cc/ryx095k5/slq.png"
    },
    {
        title: 'offer_faux_ongles_title',
        description: 'offer_faux_ongles_desc',
        price: '150DH',
        image: "https://i.postimg.cc/FH7hTQSs/qls.png"
    },
    {
        title: 'offer_vernis_perm_title',
        description: 'offer_vernis_perm_desc',
        price: '100DH',
        image: "https://i.postimg.cc/25kyTW2S/syl.png"
    }
  {
        title: 'aaaa',
        description: 'aaaa',
        price: '90DH',
        image: "https://i.postimg.cc/wvQLLftn/grs.png"
    }
];

export const RESULTS_GALLERY: GalleryImage[] = [
    { id: 1, src: 'https://i.postimg.cc/rwM3Zzj8/1.png', category: 'onglerie' },
    { id: 2, src: 'https://i.postimg.cc/nLL5Z5Nk/2.png', category: 'visage' },
    { id: 4, src: 'https://i.postimg.cc/rmBY1psQ/3.png', category: 'coiffure' },
    { id: 7, src: 'https://i.postimg.cc/CLVQddWd/4.png', category: 'coiffure' },
    { id: 7, src: 'https://i.postimg.cc/9QL8xbzy/5.png', category: 'coiffure' },
    { id: 7, src: 'https://i.postimg.cc/bvM6PvxR/6.png', category: 'coiffure' },
    { id: 7, src: 'https://i.postimg.cc/MH0t1bhT/7.png', category: 'coiffure' },
    { id: 7, src: 'https://i.postimg.cc/15HJtB0S/8.png', category: 'coiffure' },
    { id: 7, src: 'https://i.postimg.cc/JhyqpWf0/9.png', category: 'coiffure' },
    { id: 7, src: 'https://i.postimg.cc/wMkc1xm2/10.png', category: 'coiffure' },
    { id: 7, src: 'https://i.postimg.cc/DzbrqPXt/11.png', category: 'coiffure' },
    { id: 7, src: 'https://i.postimg.cc/PJd1nGRj/12.png', category: 'coiffure' },
    { id: 7, src: 'https://i.postimg.cc/kXXWjmSF/13.png', category: 'coiffure' },
    { id: 7, src: 'https://i.postimg.cc/FzFknyYd/14.png', category: 'coiffure' },
];

export const RESULTS_BEFORE_AFTER: ResultImage[] = [
    { id: 7, before: 'https://i.postimg.cc/tC48D3fc/image.png', after: 'https://i.postimg.cc/RhXy4h3n/image.png', category: 'coiffure' },
];
