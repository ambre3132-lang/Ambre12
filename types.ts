
export interface TeamMember {
    name: string;
    image: string;
    role: string;
    bio: string;
}

export interface Offer {
    title: string;
    description: string;
    price: string;
    image?: string;
}

export type ResultCategory = 'onglerie' | 'visage' | 'corps' | 'coiffure';

export interface ResultImage {
    id: number;
    before: string;
    after: string;
    category: ResultCategory;
}

export interface GalleryImage {
    id: number;
    src: string;
    category: ResultCategory;
}

export interface Service {
    key: string;
    price?: string;
    sessionPrice?: string;
    packagePrice?: string;
    duration?: string;
    noteKey?: string;
}
  
export interface ServiceCategory {
    key: string;
    services: Service[];
}

export interface Review {
  id?: string;
  name: string;
  comment: string;
  createdAt: any; // Firestore Timestamp
}

// FIX: Add BeautyTip interface for the beauty tips section.
export interface BeautyTip {
    id: number;
    title: string;
    excerpt: string;
    image: string;
}