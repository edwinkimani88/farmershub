import { CommunityPost, CountyWeatherContext, RegionalStory, VeterinaryReport, FarmAnimal, FarmerProfile } from '../types';

export const MOCK_FARMER_PROFILE: FarmerProfile = {
  id: 'farmer-01',
  name: 'John Kamau',
  phone: '+254 712 458 920',
  email: 'j.kamau@shamba.co.ke',
  county: 'Kiambu',
  subCounty: 'Githunguri',
  farmName: 'Mugumo Precision Dairy & Layers',
  farmType: 'Zero-Grazing Dairy & Poultry',
  mainLivestock: ['Dairy Cattle', 'Poultry'],
  herdFlockSize: '8 Milking Cows & 600 ISA Brown Layers',
  experienceYears: '6 Years',
  currentChallenge: 'Controlling silage mold & optimizing feed costs during cold rains',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
};

export const REGIONAL_STORIES: RegionalStory[] = [
  {
    id: 'kericho',
    region: 'KERICHO',
    tagline: 'Cool Highlands • Tea & High-Grade Dairy',
    headline: 'Cool hills. Dairy country. Different challenges.',
    description: 'Cold mornings, pasture, high altitude feed and milk production all play a different game here. While green grass is abundant during the rains, wet muddy stalls and sudden temperature drops can slash milk yields overnight.',
    livestockFocus: 'Pedigree Friesian & Ayrshire Dairy Cows',
    primaryChallenge: 'Low morning temperatures, mastitis management during continuous rain, and mineral leaching in lush highland pastures.',
    farmingReality: 'Kericho farmers enjoy cheap natural grazing, but balancing lush wet grass with dry fiber (hay) and high-energy concentrates is what separates 15-liter cows from 32-liter champions.',
    imageUrl: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=1200&q=80', // lush tea/green hills
    accentColor: '#2D6A4F',
    stats: [
      { label: 'Avg Milk Yield', value: '22 - 28 L/day' },
      { label: 'Elevation', value: '2,000m ASL' },
      { label: 'Rainfall Cycles', value: '9-10 Months' }
    ],
    quote: {
      farmer: 'Kiprono Cheruiyot (Kapsoit)',
      swahili: 'Asubuhi huku ni baridi sana. Usipoweka warm water na dry bedding kwa sheds, ng\'ombe zinakataa kutoa maziwa kamili.',
      english: 'The mornings here are freezing. Unless you provide warm water and dry bedding in the stalls, dairy cows withhold milk letdown.'
    }
  },
  {
    id: 'kajiado',
    region: 'KAJIADO',
    tagline: 'Rift Valley Plains • Hardy Pastoral & Commercial Meat',
    headline: 'Different land. Different livestock reality.',
    description: 'Expansive rangelands under the shadow of the Rift Valley. Here, water access, drought-resilient genetics, and seasonal pasture movement dictate whether a farmer thrives or counts heavy losses.',
    livestockFocus: 'Boran Cattle, Galla Goats & Red Maasai Sheep',
    primaryChallenge: 'Water salinity, seasonal drought stress, long-distance grazing ticks, and sudden feed shortages during prolonged dry spells.',
    farmingReality: 'You cannot bring a delicate high-producing cow to Kajiado without massive capital for shade, boreholes, and silage pits. Survival and profit come from resilient breeds and strategic destocking.',
    imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80', // vast East African savanna/livestock terrain
    accentColor: '#936639',
    stats: [
      { label: 'Rangeland Area', value: '21,000+ km²' },
      { label: 'Hardy Breeds', value: 'Galla & Boran' },
      { label: 'Water Dependence', value: 'Deep Boreholes' }
    ],
    quote: {
      farmer: 'Ole Seno (Isinya)',
      swahili: 'Kajiado farming is about patience na maji. Ukipata borehole safi na feed ya msimu wa kiangazi, biashara ya mbuzi inalipa zaidi ya shamba la jiji.',
      english: 'Kajiado farming is about patience and water. If you secure a clean borehole and dry season feed, commercial goat keeping yields high returns.'
    }
  },
  {
    id: 'kiambu',
    region: 'KIAMBU',
    tagline: 'High-Density Metro • Precision Zero-Grazing & Poultry',
    headline: 'Small farms. Zero grazing. Big production pressure.',
    description: 'With land subdivided down to eighth-acre and quarter-acre plots, Kiambu farmers have mastered high-density vertical production. Every blade of Napier grass, every kilo of commercial dairy meal, and every egg counts.',
    livestockFocus: 'Intensive Zero-Grazing Friesians & Commercial Layers/Broilers',
    primaryChallenge: 'High commercial feed costs, limited shamba space for forage cultivation, and biosecurity risks from dense neighbor proximity.',
    farmingReality: 'No room for wasted space. Cows live 24/7 in concrete cubicles with rubber mats. Success here is mathematical: Feed Conversion Ratio (FCR) vs Price per Kilo of milk or tray of eggs.',
    imageUrl: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1200&q=80', // cattle zero grazing / lush dairy pasture
    accentColor: '#1B4332',
    stats: [
      { label: 'Avg Shamba Size', value: '0.25 - 1.0 Acre' },
      { label: 'Zero Grazing Units', value: '78% of Farms' },
      { label: 'Egg Production', value: 'Over 2.4M/week' }
    ],
    quote: {
      farmer: 'Mama Njeri (Githunguri)',
      swahili: 'Hapa Kiambu shamba ni ndogo, so huwezi fanya mchezo na feed. Kilo moja ya dairy meal lazima ikuletee maziwa ya kutosha kulipa gharama.',
      english: 'Here in Kiambu plots are small, so you cannot gamble with feed. Every single kilo of dairy meal must deliver enough milk to cover input costs.'
    }
  },
  {
    id: 'nakuru',
    region: 'NAKURU',
    tagline: 'Agricultural Breadbasket • Mixed Farming, Poultry & Dairy',
    headline: 'Commercial scale. Mixed enterprises. High market velocity.',
    description: 'From the slopes of Bahati to the plains of Rongai, Nakuru is the heartbeat of Kenyan mixed farming. Large poultry enterprises operate side-by-side with potato fields, commercial maize, and commercial dairy cooperatives.',
    livestockFocus: 'Broilers, Improved Kienyeji, Dairy Crosses & Pigs',
    primaryChallenge: 'Disease outbreaks in high poultry density zones (Gumboro/Newcastle), sudden grain price fluctuations, and cold Rift Valley winds.',
    farmingReality: 'Nakuru farmers are the primary suppliers to Nairobi wholesale markets. Efficiency, cold chain management, and vaccinated flocks make or break the enterprise.',
    imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1200&q=80', // healthy chickens in farming environment
    accentColor: '#285943',
    stats: [
      { label: 'Cooperative Hubs', value: '45+ Active' },
      { label: 'Flock Capacities', value: '1,000 - 15,000' },
      { label: 'Mixed Farming', value: '91% Adoption' }
    ],
    quote: {
      farmer: 'Peter Mbugua (Subukia)',
      swahili: 'Kuku wa nyama Nakuru wanahitaji ventilation kali. Upepo wa jioni ukipiga kuku wadogo, mortality inaruka. Sisi huwafunika na mapazia mapema.',
      english: 'Broilers in Nakuru demand tight ventilation control. If the evening cold breeze hits young chicks, mortality spikes. We drop thermal curtains early.'
    }
  }
];

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    title: 'Kuku zangu zimeanza kupunguza eggs ghafla. Anyone else seeing this?',
    content: 'Niko na 500 Isa Brown layers hapa Kiambu (Ruaka area), wako week 34. For the past 4 days, production imedrop from 430 eggs to 310 eggs daily. Hawaonyeshi dalili za ugonjwa, wanapiga feed kama kawaida, lakini kinyesi kiko kidogo watery na kuna baridi kali sana usiku. What should I check kwanza kabla sijanunua dawa ovyo?',
    author: 'Mama Stacy Wanjiku',
    authorCounty: 'Kiambu',
    livestock: 'Poultry (Layers/Broilers/Kienyeji)',
    topic: 'Poultry',
    timestamp: '2 hours ago',
    repliesCount: 14,
    likesCount: 38,
    isHot: true,
    verifiedExpertReplied: true,
    comments: [
      {
        id: 'c-1',
        author: 'Dr. Aura, BVM',
        authorLocation: 'Farmers Hub Veterinary Lead',
        authorRole: 'vet',
        isVetVerified: true,
        avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80',
        timestamp: '1 hour ago',
        content: 'Habari Mama Stacy. At 34 weeks, layers are sensitive to temperature drops. Check 3 critical things: 1) Night drafts/ventilation — baridi kali inafanya kuku kutumia feed for body warmth instead of egg synthesis. 2) Water temperature: if water is ice cold in the morning, water intake drops and egg production falls directly. 3) Check lighting: are they getting strict 16 hours of light? Do not give random antibiotics yet; start with multivitamin + electrolytes in warm morning water for 3 days.',
        likes: 29
      },
      {
        id: 'c-2',
        author: 'Maina wa Kuku',
        authorLocation: 'Nakuru (Njoro)',
        authorRole: 'farmer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        timestamp: '45 mins ago',
        content: 'Niliona hii same issue last month! Check water drinkers zako. Also confirm kama your feed supplier changed the batch. Sometimes calcium level inakuwa low kwa batch mpya.',
        likes: 11
      }
    ]
  },
  {
    id: 'post-2',
    title: 'Hii cold weather imeaffect milk production for anyone in Kericho / Bomet?',
    content: 'My two Friesian cows have dropped from 22 liters to 16 liters each within 3 days after these cold highland rains started. Wanatemea maji baridi na wanapendelea kulala chini kwa matope. Nani ako na formula ya kusaidia retain yield during this cold season?',
    author: 'Kiprotich Koech',
    authorCounty: 'Kericho',
    livestock: 'Dairy & Cattle',
    topic: 'Dairy & Cattle',
    timestamp: '4 hours ago',
    repliesCount: 22,
    likesCount: 45,
    isHot: true,
    verifiedExpertReplied: true,
    comments: [
      {
        id: 'c-3',
        author: 'Dr. Faith Chepkoech, DVM',
        authorLocation: 'Highlands Dairy Specialist',
        authorRole: 'vet',
        isVetVerified: true,
        avatar: 'https://images.unsplash.com/photo-1594824813579-5118d052d921?auto=format&fit=crop&w=200&q=80',
        timestamp: '3 hours ago',
        content: 'Koech, when cows sleep on cold wet mud, they lose massive thermal energy. Also, cold water discourages drinking — and milk is 87% water! Put dry straw/wood shavings in their resting cubicles immediately, and provide slightly tepid or warm water mixed with a little molasses in the morning. Yield will bounce back in 48 hours.',
        likes: 34
      }
    ]
  },
  {
    id: 'post-3',
    title: 'What are you guys feeding your dairy cows saa hii? Commercial feeds are expensive!',
    content: '50kg bag ya Dairy Meal imepanda hadi KSh 3,200 hapa Nakuru. Selling milk at KSh 48 to cooperatives leaves almost zero profit margin. Anyone using homemade TMR with silage, maize germ, sunflower meal na mineral salt successfully? Hebu tushare rations zenye zinafanya kazi kwa shamba.',
    author: 'Sammy Ndegwa',
    authorCounty: 'Nakuru',
    livestock: 'Feed & Nutrition',
    topic: 'Feed & Nutrition',
    timestamp: '6 hours ago',
    repliesCount: 31,
    likesCount: 64,
    isHot: true,
    verifiedExpertReplied: false,
    comments: [
      {
        id: 'c-4',
        author: 'Mwalimu James',
        authorLocation: 'Nyandarua (Ol Kalou)',
        authorRole: 'farmer',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        timestamp: '5 hours ago',
        content: 'Mimi niliacha commercial meal pure. Natumia silage ya mahindi (well preserved with molasses) 25kg + 4kg Rhodes grass hay + homemade mix: Maize germ (50kg), Cotton seed cake (25kg), Wheat pollard (20kg), DCP (2kg), Macro minerals (1kg). Cost per kg inashuka to KSh 38 and my cows are steady at 24L.',
        likes: 27
      }
    ]
  },
  {
    id: 'post-4',
    title: 'Ng\'ombe yangu imeanza kukataa feed baada ya mvua kuanza — what could it be?',
    content: 'Heifer ya 18 months haitaki kula pasture wala silage tangu jana jioni. Macho yamekuwa kidogo dull, mapua imekauka, na joto la mwili linakaa juu. Is it East Coast Fever (ECF) au Anaplasmosis? Naomba direct advice kabla sijamuita local technician.',
    author: 'Grace Muthoni',
    authorCounty: 'Nyeri',
    livestock: 'Animal Health',
    topic: 'Animal Health',
    timestamp: '8 hours ago',
    repliesCount: 9,
    likesCount: 19,
    isHot: false,
    verifiedExpertReplied: true,
    comments: [
      {
        id: 'c-5',
        author: 'Dr. Aura, BVM',
        authorLocation: 'Farmers Hub Veterinary Lead',
        authorRole: 'vet',
        isVetVerified: true,
        avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80',
        timestamp: '7 hours ago',
        content: 'Grace: Joto likipanda na ng\'ombe akate feed, check lymph nodes around the base of the ear and shoulder — are they swollen like tennis balls? If swollen, that is classic East Coast Fever (ECF / Ndigana). Do not wait! Call a registered veterinary doctor for blood smear and Parvaquone/Buparvaquone injection within 24 hours. Every hour delayed reduces survival rate.',
        likes: 23
      }
    ]
  },
  {
    id: 'post-5',
    title: 'Farmers around Kajiado and Machakos: How are your Galla goats handling drought pasture?',
    content: 'Mambo vipi wakulima. Planning to buy 20 Galla goat does for breeding in Kajiado East. Any lessons on mineral blocks to use and preventing enterotoxaemia (pulpy kidney) during transitional rain showers?',
    author: 'Leonard Kasaine',
    authorCounty: 'Kajiado',
    livestock: 'Goats & Sheep',
    topic: 'Goats & Sheep',
    timestamp: '12 hours ago',
    repliesCount: 16,
    likesCount: 32,
    isHot: false,
    verifiedExpertReplied: false,
    comments: []
  },
  {
    id: 'post-6',
    title: 'Silage making with Napier Grass — is it worth adding molasses and EM1?',
    content: 'Wakulima wenzangu, mvua imenyesha na Napier imekua mrefu sana (around 2.5 meters). Nataka kuikata na kuweka kwa silage pit. Je, naongeza molasses pekee ama EM1 fermentation solution inaleta difference kubwa kwa shelf life na digestibility?',
    author: 'Harrison Kibet',
    authorCounty: 'Bomet',
    livestock: 'Crops & Pasture',
    topic: 'Feed & Nutrition',
    timestamp: '1 day ago',
    repliesCount: 18,
    likesCount: 41,
    isHot: false,
    verifiedExpertReplied: true,
    comments: []
  }
];

export const COUNTY_WEATHER_DATA: CountyWeatherContext[] = [
  {
    county: 'Kiambu',
    temperature: '21°C',
    condition: 'Heavy Evening Showers',
    icon: '🌧️',
    rainfallProbability: '85%',
    alertHeadline: 'Rain coming 🌧️ — Damp conditions in poultry coops',
    swahiliContext: 'Mvua inatarajiwa jioni kote Githunguri, Ruiru na Limuru. Baridi na unyevunyevu zinaweza kuletea vifaranga homa.',
    poultryAdvice: 'Check brooder temperature! Keep curtains shut at 5:00 PM to block evening mist. Rake damp litter around waterers to prevent ammonia burns and coccidiosis.',
    dairyAdvice: 'Clean zero-grazing drainage channels. Disinfect cow teats with teat dip immediately after milking to prevent wet-weather mastitis.',
    pastureAdvice: 'Avoid grazing on waterlogged paddocks to prevent trampling and root compaction.'
  },
  {
    county: 'Kericho',
    temperature: '16°C',
    condition: 'Cold Highland Mist & Rain',
    icon: '🌦️',
    rainfallProbability: '90%',
    alertHeadline: 'Cold Morning Alert ❄️ — Watch dairy milk letdown',
    swahiliContext: 'Asubuhi za baridi sana huko Kapsoit, Bureti na Belgut. Joto la maji ya ng\'ombe liwe warm kidogo.',
    poultryAdvice: 'Maintain insulated housing. Supplement warm feed mash with multivitamins in the morning.',
    dairyAdvice: 'Offer lukewarm water in the morning. Cows drinking ice-cold water will suppress rumination and cut daily yield by up to 20%. Ensure dry resting straw.',
    pastureAdvice: 'High soil moisture. Ideal time to overseed Rhodes grass or Boma Rhodes pasture.'
  },
  {
    county: 'Nakuru',
    temperature: '24°C',
    condition: 'Partly Sunny with Gusty Winds',
    icon: '⛅',
    rainfallProbability: '35%',
    alertHeadline: 'Gusty Winds & Temperature Fluctuations 💨',
    swahiliContext: 'Upepo mkali wa mchana huko Bahati na Njoro. Shamba la kuku linahitaji windbreaks nzuri.',
    poultryAdvice: 'Sudden gusts cause respiratory stress in broilers. Check cross-ventilation flaps and inspect roofing sheets.',
    dairyAdvice: 'Good hay drying weather. Great week for baling Rhodes grass or turning silage.',
    pastureAdvice: 'Soil moisture is dropping slightly. Check irrigation scheduling for horticultural rotations.'
  },
  {
    county: 'Kajiado',
    temperature: '29°C',
    condition: 'Sunny & Dry Savanna Heat',
    icon: '☀️',
    rainfallProbability: '10%',
    alertHeadline: 'High Evaporation & Heat Stress ☀️',
    swahiliContext: 'Jua kali kote Isinya, Namanga na Kajiado Central. Hakikisha mifugo inapata maji safi kivulini.',
    poultryAdvice: 'Provide plenty of cool water with vitamin C / anti-stress electrolytes between 11:00 AM and 3:00 PM.',
    dairyAdvice: 'Heat stress suppresses appetite. Feed bulk forage during cool evening and early morning hours.',
    pastureAdvice: 'Rangeland forage is dry. Monitor borehole pumps and replenish mineral salt licks for livestock.'
  },
  {
    county: 'Eldoret / Uasin Gishu',
    temperature: '19°C',
    condition: 'Light Afternoon Drizzle',
    icon: '🌦️',
    rainfallProbability: '60%',
    alertHeadline: 'Favorable Pasture Growth 🌾',
    swahiliContext: 'Mvua nzuri ya wastani huko Moiben, Turbo na Kapseret. Nafasi nzuri ya kupanda nyasi za mifugo.',
    poultryAdvice: 'Maintain biosecurity at footbaths as visitors drag muddy footwear into flock units.',
    dairyAdvice: 'Pasture is lush but contains high water content. Supplement cows with 2-3kg of dry hay to slow down digestion.',
    pastureAdvice: 'Apply calcium ammonium nitrate (CAN) top dressing to established fodder plots while soil is moist.'
  }
];

export const DEMO_VETERINARY_REPORTS: VeterinaryReport[] = [
  {
    id: 'rep-001',
    reportNumber: 'FH-VET-2026-0884',
    farmerName: 'John Kamau Njoroge',
    farmName: 'Bustani Dairy & Poultry Shamba',
    county: 'Kiambu',
    subCounty: 'Githunguri',
    visitDate: '28 August 2026',
    veterinarian: {
      name: 'Dr. Aura, BVM, MSc',
      title: 'Senior Field Veterinary Specialist',
      registrationNumber: 'KVB-REG-4192',
      phone: '+254 711 349 900'
    },
    animalsExamined: '4 Pedigree Friesian Cows (Ear Tags #042, #043, #047, #051) & 600 ISA Brown Layers',
    clinicalObservations: 'Heifer #042 (Zawadi) presented with mild swelling of the left hind quarter and subclinical mastitis (Somatic Cell Count elevation confirmed via California Mastitis Test). Layers flock showed healthy eggshell quality, but litter near water bell drinkers was 45% damp.',
    diagnosisAssessment: '1) Subclinical Streptococcus uberis mastitis in Cow #042. 2) Early ammonia risk in poultry house due to faulty bell drinker pressure regulator.',
    actionsTaken: [
      'Administered intramammary infusion of Cloxacillin (Noroclox DC) in affected quarter #042 under sterile hygiene protocol.',
      'Adjusted water header tank pressure valve for poultry unit from 1.8 bar to 1.1 bar to stop drinker overflow.',
      'Replaced 3 bags of damp wood shavings with dry kiln-dried pine shavings and applied lime dust beneath litter.'
    ],
    recommendations: [
      'Strict post-milking teat dipping using 0.5% iodine barrier solution for all 4 milking cows.',
      'Provide 4kg Rhodes grass hay per cow daily before morning silage to boost rumen cud chewing (minimum 60 chews per bolus).',
      'Add electrolyte + toxin binder to poultry feed for 5 days to clear water retention.'
    ],
    nutritionAdvice: 'Adjust current total mixed ration (TMR): 22kg maize silage + 3.5kg lucerne hay + 5kg high-protein dairy meal (18% CP) + 120g high-phosphorus mineral lick per cow daily.',
    followUpDate: '08 September 2026 (Scheduled Physical Verification)',
    additionalNotes: 'Farmer was educated on proper milking order: First calvers first, high yielders second, cow #042 last to prevent cross-contamination.',
    status: 'Finalized'
  },
  {
    id: 'rep-002',
    reportNumber: 'FH-VET-2026-0791',
    farmerName: 'John Kamau Njoroge',
    farmName: 'Bustani Dairy & Poultry Shamba',
    county: 'Kiambu',
    subCounty: 'Githunguri',
    visitDate: '14 July 2026',
    veterinarian: {
      name: 'Dr. Faith Chepkoech, DVM',
      title: 'Reproductive & AI Veterinary Officer',
      registrationNumber: 'KVB-REG-5520',
      phone: '+254 722 811 445'
    },
    animalsExamined: 'Cow #043 (Baraka) & Heifer #047 (Wendo)',
    clinicalObservations: 'Rectal palpation confirmed Cow #043 is 65 days pregnant (AI sire: AltaSuperstar). Heifer #047 exhibited clean standing heat with clear cervical mucus discharge.',
    diagnosisAssessment: 'Healthy ongoing pregnancy in Cow #043. Optimal breeding window confirmed for Heifer #047.',
    actionsTaken: [
      'Performed Artificial Insemination on Heifer #047 using sexed female semen (Sire: Semex Secretariat Friesian).',
      'Administered 2.5ml GnRH (Receptal) at insemination to stimulate prompt ovulation.'
    ],
    recommendations: [
      'Keep Heifer #047 calm and isolated from aggressive cows for 48 hours.',
      'Schedule pregnancy confirmation scan at 45 days post-insemination (late August).'
    ],
    nutritionAdvice: 'Maintain balanced dry cow mineral supplementation for Cow #043 to prevent milk fever at next calving.',
    followUpDate: '28 August 2026 (Completed)',
    additionalNotes: 'Insemination certificate issued and logged into national livestock registry.',
    status: 'Finalized'
  }
];

export const DEMO_FARM_ANIMALS: FarmAnimal[] = [
  {
    id: 'an-1',
    name: 'Zawadi',
    tagNumber: 'KE-KBU-042',
    type: 'Dairy Cattle',
    breed: 'Holstein Friesian 87.5%',
    age: '4 Years (2nd Calver)',
    status: 'Under Treatment',
    lastChecked: '28 Aug 2026',
    dailyProduction: '26.4 Liters / Day',
    notes: 'Mild subclinical mastitis left hind quarter. Under intramammary course. Expected clear date: 02 Sep.'
  },
  {
    id: 'an-2',
    name: 'Baraka',
    tagNumber: 'KE-KBU-043',
    type: 'Dairy Cattle',
    breed: 'Friesian x Ayrshire',
    age: '5 Years (3rd Calver)',
    status: 'Lactating',
    lastChecked: '28 Aug 2026',
    dailyProduction: '29.8 Liters / Day',
    notes: 'Confirmed 65 days pregnant. Excellent body condition score (3.5/5.0). Top producer in unit.'
  },
  {
    id: 'an-3',
    name: 'Wendo',
    tagNumber: 'KE-KBU-047',
    type: 'Dairy Cattle',
    breed: 'Purebred Friesian Heifer',
    age: '19 Months',
    status: 'Healthy',
    lastChecked: '14 Jul 2026',
    dailyProduction: 'N/A (Heifer)',
    notes: 'Served via sexed semen on 14 July 2026. Pregnancy diagnosis scheduled.'
  },
  {
    id: 'an-4',
    name: 'Batch #4 ISA Brown Layers',
    tagNumber: 'FLOCK-LYR-600',
    type: 'Poultry',
    breed: 'ISA Brown Commercial',
    age: '34 Weeks',
    status: 'Healthy',
    lastChecked: '28 Aug 2026',
    dailyProduction: '412 Eggs / Day (86% Peak)',
    notes: 'Litter replaced. Bell drinker pressure normalized. Water vitamins active.'
  }
];

export const VET_FIELD_SERVICES = [
  {
    id: 'srv-1',
    title: 'Dairy & Cattle Care',
    subtitle: 'Uzazi na Maziwa Bora',
    description: 'On-shamba mastitis diagnostics, AI breeding with verified genetics, nutritional balancing, and milk yield recovery programs.',
    iconName: 'Milk',
    image: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=600&q=80',
    countyCoverage: 'Kiambu, Kericho, Nakuru, Nyandarua, Nyeri',
    features: ['California Mastitis Testing', 'Certified Sexed Semen AI', 'TMR Ration Balancing', 'Digital Visit Reports']
  },
  {
    id: 'srv-2',
    title: 'Poultry Management',
    subtitle: 'Kinga na Ufugaji wa Kuku',
    description: 'Commercial flock health audits, layer drop investigation, broiler brooding protocols, and vaccination timing schedules.',
    iconName: 'Egg',
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=600&q=80',
    countyCoverage: 'Kiambu, Nakuru, Machakos, Eldoret',
    features: ['Post-Mortem Diagnostics', 'Ventilation & Heat Stress Audits', 'Water Sanity Testing', 'Flock Feed Formulations']
  },
  {
    id: 'srv-3',
    title: 'Pasture & Fodder Engineering',
    subtitle: 'Silage na Lishe Bora',
    description: 'High-energy silage preservation, Boma Rhodes establishment, protein legume intercropping, and zero-grazing feed efficiency.',
    iconName: 'Sprout',
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=600&q=80',
    countyCoverage: 'Kericho, Bomet, Nakuru, Uasin Gishu',
    features: ['Molasses & Inoculant Silage', 'Dry Season Fodder Banks', 'Forage Dry Matter Testing', 'Fodder Seed Supply']
  },
  {
    id: 'srv-4',
    title: 'Official Farm Visit Reports',
    subtitle: 'Ripoti Rasmi za Daktari',
    description: 'Every farm inspection generates an accredited digital medical & nutrition report with vet signatures, downloadable as an official PDF.',
    iconName: 'FileCheck',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80',
    countyCoverage: 'Nationwide Kenyan Coverage',
    features: ['KVB Registered Vets', 'Prescription & Action Plans', 'Instant Portal Sync', 'Downloadable PDF Certificate']
  }
];

export const MOCK_FARM_ANIMALS = DEMO_FARM_ANIMALS;
export const MOCK_VET_REPORTS = DEMO_VETERINARY_REPORTS;
export const MOCK_COMMUNITY_POSTS = INITIAL_COMMUNITY_POSTS;

