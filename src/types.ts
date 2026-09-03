export type County = 
  | 'Kiambu'
  | 'Kericho'
  | 'Nakuru'
  | 'Kajiado'
  | 'Nyeri'
  | 'Murang\'a'
  | 'Eldoret / Uasin Gishu'
  | 'Eldoret'
  | 'Bomet'
  | 'Machakos'
  | 'Nyandarua';

export type LivestockType = 
  | 'Dairy & Cattle'
  | 'Poultry (Layers/Broilers/Kienyeji)'
  | 'Goats & Sheep'
  | 'Pigs'
  | 'Mixed Livestock'
  | 'Crops & Pasture';

export type CommunityTopic = 
  | 'Dairy & Cattle'
  | 'Poultry'
  | 'Goats & Sheep'
  | 'Pigs'
  | 'Feed & Nutrition'
  | 'Weather & Farming'
  | 'Animal Health'
  | 'Crops & Agronomy'
  | 'General Farm Talk';

export interface Comment {
  id: string;
  author: string;
  authorLocation: string;
  authorRole?: 'farmer' | 'expert' | 'vet';
  isVetVerified?: boolean;
  avatar: string;
  timestamp: string;
  content: string;
  likes: number;
  userLiked?: boolean;
}

export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorCounty: County | string;
  livestock: LivestockType | string;
  topic: CommunityTopic;
  timestamp: string;
  repliesCount: number;
  likesCount: number;
  userLiked?: boolean;
  isHot?: boolean;
  verifiedExpertReplied?: boolean;
  comments: Comment[];
  imageUrl?: string;
}

export interface FarmAnimal {
  id: string;
  name: string;
  tagNumber: string;
  type: string;
  breed: string;
  age: string;
  status: 'Healthy' | 'Under Treatment' | 'Lactating' | 'Dry' | 'Quarantined';
  lastChecked: string;
  dailyProduction?: string;
  notes: string;
}

export interface VeterinaryReport {
  id: string;
  reportNumber: string;
  farmerName: string;
  farmName: string;
  county: string;
  subCounty: string;
  visitDate: string;
  veterinarian: {
    name: string;
    title: string;
    registrationNumber: string;
    phone: string;
  };
  animalsExamined: string;
  clinicalObservations: string;
  diagnosisAssessment: string;
  actionsTaken: string[];
  recommendations: string[];
  nutritionAdvice: string;
  followUpDate: string;
  additionalNotes: string;
  status: 'Finalized' | 'Pending Review';
}

export interface RegionalStory {
  id: string;
  region: string;
  tagline: string;
  headline: string;
  description: string;
  livestockFocus: string;
  primaryChallenge: string;
  farmingReality: string;
  imageUrl: string;
  accentColor: string;
  stats: {
    label: string;
    value: string;
  }[];
  quote: {
    farmer: string;
    swahili: string;
    english: string;
  };
}

export interface CountyWeatherContext {
  county: County;
  temperature: string;
  condition: string;
  icon: string;
  rainfallProbability: string;
  alertHeadline: string;
  swahiliContext: string;
  poultryAdvice: string;
  dairyAdvice: string;
  pastureAdvice: string;
}

export interface FarmerProfile {
  id: string;
  name: string;
  phone: string;
  email?: string;
  county: County;
  subCounty?: string;
  farmName: string;
  farmType?: string;
  primaryLivestock?: string[];
  mainLivestock?: LivestockType[] | string[];
  herdFlockSize?: string;
  experienceYears?: string;
  currentChallenge?: string;
  farmingScale?: 'Smallholder' | 'Medium Commercial' | 'Large Scale';
  joinDate?: string;
  avatar?: string;
}

export type ProductCategory = 
  | 'Feeds' 
  | 'Animal Nutrition' 
  | 'Veterinary & Health' 
  | 'Farm Equipment' 
  | 'Biosecurity';

export type TargetAnimalType = 
  | 'All Livestock'
  | 'Cattle & Dairy'
  | 'Poultry'
  | 'Pigs'
  | 'Goats & Sheep'
  | 'Horses';

export interface Product {
  id: string;
  name: string;
  swahiliName?: string;
  category: ProductCategory;
  targetAnimal: TargetAnimalType;
  priceKes: number;
  originalPriceKes?: number;
  unit: string;
  badge?: string;
  rating: number;
  reviewsCount: number;
  description: string;
  benefits: string[];
  dosage?: string;
  composition?: string;
  inStock: boolean;
  featured?: boolean;
  imageUrl: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface LivestockSpeciesGuide {
  id: string;
  name: string;
  swahiliName: string;
  category: 'Dairy Cattle' | 'Poultry' | 'Pigs' | 'Dairy Goats' | 'Meat Goats & Sheep' | 'Horses' | 'Turkeys';
  tagline: string;
  heroImage: string;
  importanceInKenya: string;
  keyBreeds: {
    name: string;
    traits: string;
    yield: string;
    image: string;
  }[];
  housingAndBiosecurity: string[];
  nutritionAndFeedChart: {
    stage: string;
    feedType: string;
    quantityPerDay: string;
  }[];
  criticalDiseases: {
    disease: string;
    symptoms: string;
    prevention: string;
    emergencyAction: string;
  }[];
  vaccinationSchedule: {
    ageOrPeriod: string;
    vaccine: string;
    route: string;
  }[];
  kenyanProTip: string;
}

export interface VetServiceItem {
  id: string;
  title: string;
  swahiliTitle: string;
  category: 'Clinical & Emergency' | 'Poultry Speciality' | 'Reproduction & AI' | 'Herd Health & Audits';
  shortDesc: string;
  fullDesc: string;
  pricingEstimate: string;
  turnaroundTime: string;
  targetAnimals: string[];
  features: string[];
  emergencyAvailable: boolean;
  iconName: string;
}

export interface LearningArticle {
  id: string;
  title: string;
  swahiliTitle: string;
  category: 'Poultry Mastery' | 'Dairy Production' | 'Feed Formulation' | 'Veterinary Care' | 'Biosecurity';
  readTime: string;
  author: string;
  authorRole: string;
  publishDate: string;
  summary: string;
  keyTakeaways: string[];
  contentSections: {
    heading: string;
    paragraphs: string[];
    swahiliTip?: string;
  }[];
  imageUrl: string;
}

export interface VetBookingRequest {
  id: string;
  farmerName: string;
  phone: string;
  county: County;
  subCounty: string;
  livestockCategory: string;
  animalCount: number;
  urgency: 'Emergency (Immediate)' | 'Standard (Within 24 Hours)' | 'Scheduled Routine Visit';
  primaryReason: string;
  symptomsObserved: string[];
  preferredDate?: string;
  notes?: string;
  status: 'Pending Dispatch' | 'Vet Assigned' | 'Completed';
}

