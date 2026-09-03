import { Product, LivestockSpeciesGuide, VetServiceItem, LearningArticle } from '../types';

export const MOCK_PRODUCTS: Product[] = [
  // FEEDS
  {
    id: 'prod-01',
    name: 'High-Yield Layers Mash 16%',
    swahiliName: 'Chakula cha Kuku wa Mayai',
    category: 'Feeds',
    targetAnimal: 'Poultry',
    priceKes: 3450,
    originalPriceKes: 3700,
    unit: '70kg Bag',
    badge: 'Best Seller',
    rating: 4.9,
    reviewsCount: 142,
    description: 'Scientifically balanced layers mash with fortified calcium and methionine for solid eggshells, rich orange yolks, and sustained 88%+ peak lay rate in Kenyan climates.',
    benefits: [
      'High bio-available calcium for strong crack-free eggshells',
      'Added marigold extract for natural deep yellow yolks',
      'Amino acid balanced for uniform egg size (58-62g)',
      'Dust-free formulation reducing respiratory stress in coops'
    ],
    dosage: '120g - 130g per bird per day from week 18 through whole laying cycle',
    composition: 'Crude Protein: 16.5% min, Calcium: 3.8% min, Phosphorus: 0.45%, Crude Fiber: 5.5% max',
    inStock: true,
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prod-02',
    name: 'Supreme Dairy Meal 18% Plus',
    swahiliName: 'Dairy Meal ya Maziwa Mengi',
    category: 'Feeds',
    targetAnimal: 'Cattle & Dairy',
    priceKes: 2950,
    originalPriceKes: 3200,
    unit: '50kg Bag',
    badge: 'Vet Approved',
    rating: 4.8,
    reviewsCount: 98,
    description: 'High-energy, bypass protein lactation dairy meal designed for cows giving 18-35 litres daily. Formulated with yeast culture to stabilize rumen pH on maize silage.',
    benefits: [
      'Boosts milk production by 1.5 - 3 litres within 7 days',
      'Maintains healthy body condition score (BCS 3.0)',
      'Live yeast culture prevents sub-acute ruminal acidosis (SARA)',
      'Fortified with zinc and biotin for solid hooves'
    ],
    dosage: '1kg feed for every 2 litres of milk produced above maintenance',
    composition: 'Crude Protein: 18.2%, Metabolizable Energy: 11.5 MJ/kg, Crude Fiber: 9% max',
    inStock: true,
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prod-03',
    name: 'Kienyeji & Improved Chick Starter Crumbs',
    swahiliName: 'Chakula cha Vifaranga',
    category: 'Feeds',
    targetAnimal: 'Poultry',
    priceKes: 3850,
    unit: '50kg Bag',
    badge: 'Fast Growth',
    rating: 4.9,
    reviewsCount: 76,
    description: 'Finely ground, highly digestible starter crumbs with coccidiostat and essential organic trace minerals for zero-mortality brooding during the first 4 weeks.',
    benefits: [
      'Over 97% brooding survival rate when paired with good heat',
      'Uniform particle size preventing selective feeding',
      'Enriched with gut-protecting prebiotics and selenium',
      'High protein for early feathering and strong skeletal frame'
    ],
    dosage: 'Feed ad-libitum from Day 1 to Day 28 with clean room-temperature water',
    composition: 'Crude Protein: 20.5% min, Fat: 4.0%, Fiber: 4.5% max',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1563281577-a7be47e20db9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prod-04',
    name: 'Commercial Pig Grower Pellets',
    swahiliName: 'Chakula cha Nguruwe',
    category: 'Feeds',
    targetAnimal: 'Pigs',
    priceKes: 2750,
    unit: '50kg Bag',
    rating: 4.7,
    reviewsCount: 41,
    description: 'High FCR grower pellets for weaned pigs from 25kg to 65kg. Minimizes feed wastage and achieves up to 650g average daily weight gain.',
    benefits: [
      'Rapid lean muscle development with low back-fat thickness',
      'Pellet form eliminates feed dust and coughing in pig sties',
      'Contains phytase enzyme to unlock bound phosphorus',
      'Faster turnaround to market weight'
    ],
    dosage: '1.5kg - 2.2kg per pig daily depending on live weight',
    composition: 'Crude Protein: 16.0%, Lysine: 0.95%, Crude Fiber: 6.0%',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=600&q=80'
  },

  // ANIMAL NUTRITION & SUPPLEMENTS
  {
    id: 'prod-05',
    name: 'Lactation Bypass Fat 99% (Prill Form)',
    swahiliName: 'Mafuta Maalum ya Maziwa Mengi',
    category: 'Animal Nutrition',
    targetAnimal: 'Cattle & Dairy',
    priceKes: 6800,
    originalPriceKes: 7200,
    unit: '25kg Bag',
    badge: 'High Yield Secret',
    rating: 5.0,
    reviewsCount: 64,
    description: '100% pure rumen-inert fatty acids. Directly absorbed in the small intestine to supply dense energy without disrupting rumen fiber fermentation. Eliminates post-calving negative energy balance.',
    benefits: [
      'Prevents post-calving body condition collapse',
      'Increases butterfat content in milk by up to 0.4%',
      'Accelerates return to heat and first-service conception',
      'Generates no metabolic fermentation heat during hot afternoons'
    ],
    dosage: '250g - 400g per cow per day mixed into daily concentrate ration',
    composition: 'Free Fatty Acids: 99%, Palmitic Acid: 85% min, Moisture: <1%',
    inStock: true,
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prod-06',
    name: 'Super High-Phos Dairy Mineral Block',
    swahiliName: 'Chumvi ya Ng\'ombe yenye Madini',
    category: 'Animal Nutrition',
    targetAnimal: 'Cattle & Dairy',
    priceKes: 1450,
    unit: '5kg Block with Hanging Rope',
    rating: 4.8,
    reviewsCount: 110,
    description: 'Weather-resistant compressed mineral salt block packed with 12% Phosphorus, Calcium, Cobalt, Iodine, Copper, and Selenium for fertility and immune vigor.',
    benefits: [
      'Combats silent heats and delayed ovulation',
      'Weather-proof — does not dissolve in rain or high humidity',
      'Promotes shiny healthy coat and strong hooves',
      'Self-regulating animal intake'
    ],
    dosage: 'Hang freely in zero-grazing stall or pasture shed for free-choice licking',
    composition: 'Phosphorus: 12%, Calcium: 14%, Magnesium: 3%, Salt: 35%',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prod-07',
    name: 'Silage Inoculant Plus (Lactobacillus)',
    swahiliName: 'Dawa ya Kutengeneza Silage Nzuri',
    category: 'Animal Nutrition',
    targetAnimal: 'Cattle & Dairy',
    priceKes: 2600,
    unit: '100g Water Soluble Sachet (Treats 50 Tons)',
    badge: 'Essential for Silage',
    rating: 4.9,
    reviewsCount: 52,
    description: 'Dual-strain lactic acid bacteria (L. plantarum & P. acidilactici) that rapidly drop silage pit pH to 3.8 within 48 hours, blocking mycotoxins, yeast, and rotting.',
    benefits: [
      'Preserves sweet pleasant aroma that cows crave',
      'Reduces silage dry matter spoilage from 20% down to under 4%',
      'Cuts pit fermentation time from 8 weeks down to 3 weeks',
      'Stops heating when bunker or tube is opened'
    ],
    dosage: 'Dissolve 100g in 50 Litres of chlorine-free water and spray uniformly over 50 tons of chopped fodder',
    composition: 'Viable lactic acid bacteria: 1 x 10^11 CFU per gram',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=600&q=80'
  },

  // VETERINARY & HEALTH
  {
    id: 'prod-08',
    name: 'Multi-Vitamin & Stress Soluble Pack',
    swahiliName: 'Vitamini za Kuku na Mifugo',
    category: 'Veterinary & Health',
    targetAnimal: 'Poultry',
    priceKes: 650,
    unit: '100g Sachet',
    badge: 'Top Poultry Essential',
    rating: 4.9,
    reviewsCount: 189,
    description: 'Comprehensive electrolyte and high-potency vitamin complex for chicks, broilers, and layers during vaccination days, debeaking, extreme weather changes, or post-treatment recovery.',
    benefits: [
      'Restores appetite immediately after vaccination',
      'Electrolytes buffer heat stress and panting during hot afternoons',
      'Promotes rapid feather regrowth and eggshell pigmentation',
      '100% water soluble — does not block automated nipple lines'
    ],
    dosage: '1g per 2 Litres of drinking water for 3-5 consecutive days',
    composition: 'Vitamin A, D3, E, K, B-Complex, Vitamin C, Sodium, Potassium electrolytes',
    inStock: true,
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prod-09',
    name: 'Broad Spectrum Albendazole 10% Oral Drench',
    swahiliName: 'Dawa ya Minyoo ya Kunywa',
    category: 'Veterinary & Health',
    targetAnimal: 'All Livestock',
    priceKes: 1850,
    unit: '1 Litre Bottle',
    badge: 'Vet Grade',
    rating: 4.8,
    reviewsCount: 93,
    description: 'Veterinary broad-spectrum anthelmintic effective against stomach worms, intestinal roundworms, lungworms, tapeworms, and adult liver flukes in cattle, sheep, and goats.',
    benefits: [
      'Clears both adult worms and developing larvae',
      'Ovicidal action stops worm eggs from contaminating pasture',
      'Easy oral administration with drenching gun',
      'Safe for dairy cattle with short milk withdrawal period'
    ],
    dosage: 'Cattle: 7.5ml per 100kg body weight. Sheep/Goats: 1ml per 20kg body weight',
    composition: 'Albendazole 100mg/ml',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prod-10',
    name: 'Amitraz 12.5% EC Tick Dip & Spray',
    swahiliName: 'Dawa ya Kuosha Kupe na Wadudu',
    category: 'Veterinary & Health',
    targetAnimal: 'Cattle & Dairy',
    priceKes: 2450,
    unit: '500ml Canister',
    badge: 'ECF Shield',
    rating: 4.9,
    reviewsCount: 82,
    description: 'High-efficacy amidine acaricide for complete eradication of blue ticks, red-legged ticks, mange mites, and biting lice. The definitive defense against East Coast Fever (ECF).',
    benefits: [
      'Rapid knockdown of attached ticks within 2 hours',
      'Causes ticks to detach and prevents them from feeding',
      'Effective even against organophosphate-resistant tick strains',
      'Long-lasting residual protective barrier on hide'
    ],
    dosage: '1ml per 1 Litre of clean water. Spray whole body paying attention to ears, tail switch, and udder',
    composition: 'Amitraz 125g/L Emulsifiable Concentrate',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prod-11',
    name: 'Intramammary Lactating Cow Mastitis Tubes (Pack of 4)',
    swahiliName: 'Sindano za Chuchu za Kutibu Mastitis',
    category: 'Veterinary & Health',
    targetAnimal: 'Cattle & Dairy',
    priceKes: 1650,
    unit: 'Box of 4 Sterile Syringes',
    badge: 'Emergency Clinical',
    rating: 4.9,
    reviewsCount: 75,
    description: 'Synergistic antibiotic and anti-inflammatory formulation for treating acute and clinical mastitis caused by Staphylococcus and Streptococcus in lactating dairy cows.',
    benefits: [
      'Broad antibiotic coverage directly into affected teat cistern',
      'Anti-inflammatory component eases udder pain and swelling fast',
      'Short withdrawal period allowing early return to milk supply',
      'Ergonomic flexible tip prevents teat canal trauma'
    ],
    dosage: 'Infuse 1 tube into thoroughly milked, cleaned, and disinfected teat quarter every 12-24 hours',
    composition: 'Amoxicillin, Clavulanic Acid, Prednisolone',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80'
  },

  // FARM EQUIPMENT & BIOSECURITY
  {
    id: 'prod-12',
    name: 'California Mastitis Test (CMT) Professional Kit',
    swahiliName: 'Kipimo cha Kupima Mastitis kwa Shamba',
    category: 'Farm Equipment',
    targetAnimal: 'Cattle & Dairy',
    priceKes: 1950,
    originalPriceKes: 2300,
    unit: 'Paddle + 500ml Reagent Fluid',
    badge: 'Farm Essential',
    rating: 5.0,
    reviewsCount: 167,
    description: 'The standard on-farm diagnostic tool for detecting sub-clinical mastitis before clots appear in milk. Saves tens of thousands of shillings in lost milk and ruined quarters.',
    benefits: [
      'Delivers results in 15 seconds directly inside the milking parlor',
      '4 distinct paddle wells test each individual teat quarter simultaneously',
      'Detects somatic cell count spikes before visible milk damage',
      '500ml reagent tests up to 100 cow milk samples'
    ],
    dosage: 'Strip 2ml of milk into each well, add equal CMT reagent, swirl in circular motion for 10 seconds',
    composition: 'Alkyl aryl sulfonate solution with Bromocresol purple pH indicator',
    inStock: true,
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prod-13',
    name: 'Heavy-Duty 250W Infrared Brooder Heat Lamp & Aluminum Reflector',
    swahiliName: 'Taa ya Kupasha Vifaranga Joto',
    category: 'Farm Equipment',
    targetAnimal: 'Poultry',
    priceKes: 2400,
    unit: 'Complete Set (Lamp + Shield + Chain)',
    badge: 'Brooding Safe',
    rating: 4.8,
    reviewsCount: 88,
    description: 'Ceramic base insulated heat lamp with heavy gauge aluminum shade and protective wire cage. Provides gentle radiant warmth mimicking mother hen for up to 300 day-old chicks.',
    benefits: [
      'Hard glass water-resistant infrared bulb does not shatter from splashes',
      'Distributes even circular heat footprint preventing chick crowding',
      'Ceramic porcelain socket handles high continuous temperatures safely',
      'Adjustable 2-meter hanging chain for easy height temperature tuning'
    ],
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1563281577-a7be47e20db9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prod-14',
    name: 'Automatic 360° Poultry Nipple Drinkers with Drip Cups (Pack of 10)',
    swahiliName: 'Mifereji ya Kunywea Maji Kuku',
    category: 'Farm Equipment',
    targetAnimal: 'Poultry',
    priceKes: 1800,
    unit: '10 Drinker Units + T-Connectors',
    rating: 4.9,
    reviewsCount: 65,
    description: 'Stainless steel pin leak-free automatic drinker assemblies. Keeps chicken coop bedding 100% dry and eliminates dirty open water troughs that spread coccidiosis.',
    benefits: [
      'Keeps litter bone-dry, virtually wiping out ammonia fumes',
      'Delivers clean dust-free water 24/7 directly to beaks',
      'Stainless steel ball valve guarantees zero dripping or leaks',
      'Fits standard 25mm PVC pipe without special plumbing tools'
    ],
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prod-15',
    name: 'Non-Return Teat Dipping Cup & Chlorhexidine Post-Dip (1 Litre)',
    swahiliName: 'Kikombe na Dawa ya Kuchovya Chuchu',
    category: 'Biosecurity',
    targetAnimal: 'Cattle & Dairy',
    priceKes: 2150,
    unit: 'Dipper + 1L Teat Barrier Dip',
    badge: 'Udder Guard',
    rating: 4.9,
    reviewsCount: 115,
    description: 'Angled non-return dipper cup prevents contaminated milk from flowing back into reservoir. Paired with thick barrier teat dip that seals open teat sphincter for 45 minutes post-milking.',
    benefits: [
      'Blocks 99.9% of environmental bacteria while teat canal is open',
      'Thick conditioning film contains glycerin to stop winter teat cracking',
      'Distinct visible green or blue tint confirms every cow was dipped',
      'Reduces new mastitis infections by up to 60%'
    ],
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=600&q=80'
  }
];

export const MOCK_LIVESTOCK_GUIDES: LivestockSpeciesGuide[] = [
  // 1. POULTRY (Major category as requested!)
  {
    id: 'guide-poultry',
    name: 'Poultry & Fowl Mastery',
    swahiliName: 'Ufugaji Bora wa Kuku wa Nyama na Mayai',
    category: 'Poultry',
    tagline: 'High-margin commercial layers, fast broilers, and hardy improved kienyeji flocks.',
    heroImage: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1200&q=80',
    importanceInKenya: 'Poultry is the fastest-growing livestock enterprise across Kenya, providing daily cashflow through eggs and quick 5-6 week capital turnaround via broilers. From high-density farms in Kiambu to free-range setups in Machakos and Kakamega, smart disease control and brooding determine profitability.',
    keyBreeds: [
      {
        name: 'ISA Brown / Lohmann Brown',
        traits: 'High egg yield (320-340 eggs/year), docile temperament, low feed intake per egg.',
        yield: 'Peak lay rate of 94%, brown eggs 60-64g',
        image: 'https://images.unsplash.com/photo-1563281577-a7be47e20db9?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Improved Kienyeji (Kuroiler / Kenbro / Rainbow Rooster)',
        traits: 'Hardy disease tolerance, dual-purpose (meat + eggs), scavenges well, rich yellow yolks.',
        yield: '200-240 eggs/year, cockerels weigh 2.5kg at 5 months',
        image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Cobb 500 / Ross 308 Broiler',
        traits: 'Ultra-fast feed conversion ratio, broad breast meat, ready for market at 35-42 days.',
        yield: '1.8kg - 2.2kg live weight in 37 days on 3.2kg total feed',
        image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=600&q=80'
      }
    ],
    housingAndBiosecurity: [
      'Ventilation: House must run East to West to prevent direct blazing sun hitting inside.',
      'Footbaths: Place plastic tray with viral disinfectant at coop door; change every 48 hours.',
      'Dry Bedding: Wood shavings must stay 10-15cm deep; rake weekly to prevent wet caking.',
      'Curtains: Lower breathable gunny curtains at 5:45 PM to stop cold night wind drafts.'
    ],
    nutritionAndFeedChart: [
      { stage: 'Day 1 to Week 4 (Brooding)', feedType: 'Chick Starter Crumbs (20% CP)', quantityPerDay: '15g rising to 35g / chick' },
      { stage: 'Week 5 to Week 16 (Grower)', feedType: 'Growers Mash (15% CP)', quantityPerDay: '45g rising to 75g / bird' },
      { stage: 'Week 17 to Week 18 (Pre-Lay)', feedType: 'Pre-Lay Mash (High Calcium Boost)', quantityPerDay: '85g - 95g / bird' },
      { stage: 'Week 19+ (Laying Phase)', feedType: 'High-Yield Layers Mash (16.5% CP)', quantityPerDay: '120g - 130g / bird' }
    ],
    criticalDiseases: [
      {
        disease: 'Gumboro (Infectious Bursal Disease)',
        symptoms: 'Ruffled feathers, white watery diarrhea, trembling, high sudden mortality on day 14-24.',
        prevention: 'Strict Gumboro vaccination at Day 10 and Day 18 in drinking water with skimmed milk stabilizer.',
        emergencyAction: 'Give electrolytes + multivitamins immediately; isolate affected birds.'
      },
      {
        disease: 'Newcastle Disease',
        symptoms: 'Twisted necks, greenish diarrhea, gasping for air, sudden total egg drop.',
        prevention: 'Vaccinate Day 7 (eye drop), Day 21 (drinking water), repeat every 3 months for layers.',
        emergencyAction: 'Quarantine pen immediately; notify Farmers Hub field vet for flock containment.'
      },
      {
        disease: 'Coccidiosis',
        symptoms: 'Bloody droppings, huddling under heaters, droopy wings, pale combs.',
        prevention: 'Keep wood shavings bone-dry; use automated nipple drinkers instead of open dishes.',
        emergencyAction: 'Treat entire flock with Amprolium or Toltrazuril soluble for 5 days.'
      }
    ],
    vaccinationSchedule: [
      { ageOrPeriod: 'Day 1 (Hatchery)', vaccine: 'Marek’s Disease & Newcastle (ND+IB)', route: 'Subcutaneous injection / Spray' },
      { ageOrPeriod: 'Day 7', vaccine: 'Newcastle Disease (ND Lasota / Clone 30)', route: '1 drop per eye or nostril' },
      { ageOrPeriod: 'Day 10 - 12', vaccine: 'Gumboro (Intermediate strain)', route: 'Clean chlorine-free drinking water' },
      { ageOrPeriod: 'Day 18 - 21', vaccine: 'Gumboro Booster', route: 'Drinking water with powdered milk' },
      { ageOrPeriod: 'Week 6 - 8', vaccine: 'Fowl Pox Vaccine', route: 'Wing-web puncture needle' },
      { ageOrPeriod: 'Week 8', vaccine: 'Fowl Typhoid Vaccine', route: 'Intramuscular breast injection' },
      { ageOrPeriod: 'Every 3 Months (Adults)', vaccine: 'Newcastle Lasota Booster', route: 'Drinking water' }
    ],
    kenyanProTip: 'Kuku hawafi na njaa, wanakufa na baridi na upepo wa usiku. Weka mapazia mazuri ya mifuko ya gunia, na ubadilishe maji ya kunywa kila asubuhi yasikuwe ya barafu!'
  },

  // 2. DAIRY CATTLE
  {
    id: 'guide-cattle',
    name: 'Dairy Cattle & Herd Health',
    swahiliName: 'Ufugaji wa Kisasa wa Ng\'ombe wa Maziwa',
    category: 'Dairy Cattle',
    tagline: 'Maximizing litres per cow through genetics, dry matter forage, and mastitis defense.',
    heroImage: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=1200&q=80',
    importanceInKenya: 'Dairy is the financial backbone of over 1.8 million Kenyan farming families. In zero-grazing hubs like Githunguri, Kipkelion, and Meru, managing feed costs, subclinical mastitis, and heat detection separates profitable producers from struggling ones.',
    keyBreeds: [
      {
        name: 'Holstein Friesian',
        traits: 'Supreme milk volume, requires high dry matter nutrition and good zero-grazing stalls.',
        yield: '25 - 45 litres / day under optimal TMR management',
        image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Ayrshire',
        traits: 'Hardy Kenyan highland favorite, high butterfat, excellent foraging ability, resistant to foot rot.',
        yield: '18 - 30 litres / day with superior milk solids',
        image: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Jersey / Fleckvieh Cross',
        traits: 'High heat tolerance, ultra-rich milk butterfat (5%+), easy calving, lower maintenance feed intake.',
        yield: '16 - 26 litres / day, top cheese/yogurt milk',
        image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=600&q=80'
      }
    ],
    housingAndBiosecurity: [
      'Cubicle Dimensions: 2.1m length x 1.2m width per cow; floor sloped 2% for urine drainage.',
      'Soft Resting Mat: Concrete causes bruised hocks and lameness; use rubber cow mats or thick dry sawdust.',
      'Footbath: Copper sulfate 5% footbath at parlor exit twice weekly to banish foot rot.',
      'Teat Hygiene: Strip first 3 streams of milk into strip cup; dip teats in post-milking barrier solution.'
    ],
    nutritionAndFeedChart: [
      { stage: 'Early Lactation (Day 1 - 90)', feedType: 'Maize Silage (18kg) + Rhodes Hay (4kg) + 18% Dairy Meal + 300g Bypass Fat', quantityPerDay: 'Ad-libitum dry matter' },
      { stage: 'Mid Lactation (Day 91 - 210)', feedType: 'Silage (16kg) + Napier/Fodder (12kg) + Dairy Meal (1kg per 2L milk)', quantityPerDay: 'Target BCS 3.25' },
      { stage: 'Dry Period (Last 60 days before calving)', feedType: 'Low-Calcium Grass Hay + Mineral Lick + Steaming up concentrate (2kg)', quantityPerDay: 'Prevents milk fever' }
    ],
    criticalDiseases: [
      {
        disease: 'East Coast Fever (ECF / Ndigana Kali)',
        symptoms: 'Swollen lymph nodes behind ear and in front of shoulder, high fever (41°C), frothing at nostrils.',
        prevention: 'Weekly Amitraz acaricide dipping/spraying; vaccinate young stock with Muguga Cocktail.',
        emergencyAction: 'Inject Buparvaquone (Bupalex) within 24 hours of fever onset; call vet immediately.'
      },
      {
        disease: 'Sub-Clinical & Acute Mastitis',
        symptoms: 'Swollen hot quarter, curdled watery milk, refusal to let down milk, elevated somatic cells.',
        prevention: 'Milking protocol: Clean hands, single-use udder cloth, teat dip cup, CMT check every 14 days.',
        emergencyAction: 'Strip quarter completely dry, infuse lactating cow intramammary antibiotic tube, apply cold compress.'
      }
    ],
    vaccinationSchedule: [
      { ageOrPeriod: 'Calfhood (3 - 6 Months)', vaccine: 'Anthrax & Blackquarter (Blanthrax)', route: 'Subcutaneous' },
      { ageOrPeriod: 'At 6 Months', vaccine: 'Brucellosis (Strain 19)', route: 'Heifer calves only, subcutaneous' },
      { ageOrPeriod: 'Every 6 Months', vaccine: 'Foot and Mouth Disease (FMD Quadrivalent)', route: 'Deep intramuscular' },
      { ageOrPeriod: 'Annually', vaccine: 'Lumpy Skin Disease (LSD)', route: 'Subcutaneous neck injection' }
    ],
    kenyanProTip: 'Ng’ombe hanywi maji baridi ya asubuhi. Mpe ndoo ya maji vuguvugu yenye molasses vijiko viwili asubuhi na mapema — utaona maziwa yakiongezeka kwa milking ya jioni!'
  },

  // 3. PIGS & SWINE
  {
    id: 'guide-pigs',
    name: 'Commercial Swine & Pig Management',
    swahiliName: 'Ufugaji wa Nguruwe wa Faida',
    category: 'Pigs',
    tagline: 'High-FCR pork fattening, sow fertility, and stringent African Swine Fever biosecurity.',
    heroImage: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1200&q=80',
    importanceInKenya: 'Pigs convert feed to meat faster than any other farm animal in Kenya. With strong demand from processors like Farmers Choice and local pork butcheries across Nairobi, Kiambu, and Nakuru, strict sty hygiene and iron injections guarantee profitable litters.',
    keyBreeds: [
      {
        name: 'Large White',
        traits: 'Prolific mother (10-14 piglets/litter), rapid growth, excellent carcass length.',
        yield: 'Reaches 85-90kg porker weight in 5.5 to 6 months',
        image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Landrace',
        traits: 'Exceptional bacon quality, large floppy ears, docile maternal instincts, heavy milk yield.',
        yield: 'High weaner survival rate, outstanding feed conversion',
        image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Duroc (Terminal Sire)',
        traits: 'Red/brown coat, extreme muscling, fast daily gain, high marbling tenderness.',
        yield: 'Superior cross-bred market porkers with thick loins',
        image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=600&q=80'
      }
    ],
    housingAndBiosecurity: [
      'Zero Swill Feeding: NEVER feed kitchen scraps or swill without boiling at 100°C for 60 minutes.',
      'Perimeter Fence: Double wire fence around piggery to stop wild warthogs and stray dogs (ASF vectors).',
      'Farrowing Crates: Protect piglets from being crushed by heavy sows during the first 72 hours.',
      'Piglet Warmth: Creep box with 150W infrared lamp kept at 32°C for the first 10 days.'
    ],
    nutritionAndFeedChart: [
      { stage: 'Piglet Creep (Day 7 to Week 5)', feedType: 'High-energy Creep Pellets (20% CP)', quantityPerDay: 'Free choice in creep area' },
      { stage: 'Weaner (Week 5 to Week 10)', feedType: 'Weaner Meal / Pellets (18% CP)', quantityPerDay: '0.8kg - 1.3kg / pig' },
      { stage: 'Grower / Finisher (Month 3 to 6)', feedType: 'Commercial Grower Pellets (16% CP)', quantityPerDay: '1.8kg - 2.5kg / pig' },
      { stage: 'Lactating Sow', feedType: 'Sow & Weaner Feed + Mineral Premix', quantityPerDay: '3kg base + 0.5kg per suckling piglet' }
    ],
    criticalDiseases: [
      {
        disease: 'African Swine Fever (ASF / Homa ya Nguruwe)',
        symptoms: 'High fever, purple-red blotches on ears, snout, and belly, sudden death of 90-100% of herd.',
        prevention: 'NO VACCINE EXISTS. Biosecurity is 100% of defense. Disinfect all footwear, no visitors in sties.',
        emergencyAction: 'Isolate shamba instantly; contact Directorate of Veterinary Services and Farmers Hub.'
      },
      {
        disease: 'Piglet Anemia (Iron Deficiency)',
        symptoms: 'Pale skin, thumping breathing, stunted growth, white diarrhea.',
        prevention: 'Give 2ml Iron Dextran injection intramuscularly in neck muscle at Day 3 of life.',
        emergencyAction: 'Administer booster iron injection immediately.'
      }
    ],
    vaccinationSchedule: [
      { ageOrPeriod: 'Day 3', vaccine: 'Iron Dextran (Non-vaccine vital injection)', route: '2ml Intramuscular neck' },
      { ageOrPeriod: 'Week 6', vaccine: 'Dewormer (Ivermectin)', route: 'Subcutaneous or in feed' },
      { ageOrPeriod: 'Gilts before mating', vaccine: 'Parvovirus & Erysipelas', route: 'Intramuscular 4 weeks before service' }
    ],
    kenyanProTip: 'Kuzuia African Swine Fever kwa shamba lako, usiruhusu mtu yeyote kuingia kwa sty akiwa na viatu vya kutoka nje. Weka gumboots maalum za shamba pekee yake!'
  },

  // 4. DAIRY & MEAT GOATS
  {
    id: 'guide-goats',
    name: 'Dairy & Meat Goat Husbandry',
    swahiliName: 'Ufugaji wa Mbuzi wa Maziwa na Nyama',
    category: 'Dairy Goats',
    tagline: 'High-value goat milk (KES 100-150/litre) and drought-tolerant Boer meat genetics.',
    heroImage: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=1200&q=80',
    importanceInKenya: 'Goats require 1/6th the space and feed of a cow while producing therapeutic, easily digestible milk that sells for double the price of cow milk. Across Central Kenya, Toggenburg and Alpine zero-grazing goat farming has transformed thousands of small quarter-acre plots.',
    keyBreeds: [
      {
        name: 'Toggenburg Dairy Goat',
        traits: 'Swiss breed, chocolate brown coat with white face stripes, high adaptability to Kenyan zero-grazing.',
        yield: '3 - 5 litres of rich milk per day',
        image: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Galla Goat (White Boran)',
        traits: 'Indigenous Kenyan desert hardy, pure white coat, fast meat growth, survives harsh dry seasons.',
        yield: 'Bucks reach 65kg; excellent mothering and twin rates',
        image: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Boer Meat Goat',
        traits: 'White body with red/brown head, supreme meat carcass ratio, rapid daily weight gain.',
        yield: 'Reaches market slaughter weight (35-45kg) in 4-6 months',
        image: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=600&q=80'
      }
    ],
    housingAndBiosecurity: [
      'Elevated Slatted Floor: Raise goat shed 1 meter off ground using timber slats (1.5cm gap) for dung to fall through.',
      'Dry Hooves: Goats hate wet mud; damp floors lead to severe rot and pneumonia.',
      'Roof Overhang: Minimum 1-meter overhang to block driving rains from soaking the bedding.'
    ],
    nutritionAndFeedChart: [
      { stage: 'Milking Does', feedType: 'Calliandra / Desmodium fodder (30%) + Rhodes Hay (50%) + Dairy Goat Meal (500g)', quantityPerDay: 'High protein browse' },
      { stage: 'Kids (Week 2 to 12)', feedType: 'Goat Milk + Early Weaner Pellets + Soft Sweet Potato Vines', quantityPerDay: 'Rumen development' }
    ],
    criticalDiseases: [
      {
        disease: 'Contagious Caprine Pleuropneumonia (CCPP)',
        symptoms: 'Violent coughing, nasal discharge, groaning with mouth open, high mortality in dry cold snaps.',
        prevention: 'Annual CCPP vaccination administered by certified vet.',
        emergencyAction: 'Tylosin or long-acting oxytetracycline injection; isolate sick doe immediately.'
      }
    ],
    vaccinationSchedule: [
      { ageOrPeriod: 'At 3 Months', vaccine: 'CCPP Vaccine', route: 'Subcutaneous in ear or chest' },
      { ageOrPeriod: 'Every 6 Months', vaccine: 'Enterotoxemia (Pulpy Kidney)', route: 'Subcutaneous' },
      { ageOrPeriod: 'Every 3 Months', vaccine: 'Broad Spectrum Deworming', route: 'Oral drench with alternating actives' }
    ],
    kenyanProTip: 'Mbuzi wa maziwa hapendi nyasi chafu au iliyoanguka chini. Weka feed rack ya juu ili chakula kisionje mkojo au kinyesi chao!'
  },

  // 5. SHEEP
  {
    id: 'guide-sheep',
    name: 'Sheep & Pastoral Management',
    swahiliName: 'Ufugaji wa Kondoo wa Dorper na Nyama',
    category: 'Meat Goats & Sheep',
    tagline: 'Hardy Dorper and Red Maasai sheep for rapid meat mutton yields.',
    heroImage: 'https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?auto=format&fit=crop&w=1200&q=80',
    importanceInKenya: 'From the vast rangelands of Kajiado, Narok, and Laikipia to high-altitude paddocks in Nyandarua, sheep provide rapid flock multiplication and high-value mutton with minimal housing capital.',
    keyBreeds: [
      {
        name: 'Dorper Sheep',
        traits: 'White body with black head, thick muscling, sheds wool naturally (hair sheep), fast fattening.',
        yield: 'Lambs reach 36-40kg in 4 months on quality pasture',
        image: 'https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Red Maasai Sheep',
        traits: 'World-renowned natural genetic resistance to Haemonchus contortus (barber-pole worm) and drought.',
        yield: 'Supreme hardiness in drylands, cross-breeds wonderfully with Dorper rams',
        image: 'https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?auto=format&fit=crop&w=600&q=80'
      }
    ],
    housingAndBiosecurity: [
      'Predator-Proof Boma: Thorn or chainlink bomas with predator strobe lights prevent hyena and stray dog attacks.',
      'Rotational Grazing: Shift pastures every 14-21 days to break gastrointestinal worm larvae cycles.'
    ],
    nutritionAndFeedChart: [
      { stage: 'Grazing Lambs', feedType: 'Boma Rhodes / Natural Pasture + Mineral Lick block', quantityPerDay: '8 hours grazing daily' },
      { stage: 'Flushing Ewes (2 weeks before mating)', feedType: 'Grain supplement 250g / day to boost twin ovulations', quantityPerDay: 'Boosts conception' }
    ],
    criticalDiseases: [
      {
        disease: 'Haemonchosis (Barber’s Pole Worm)',
        symptoms: 'Pale inner eyelids (FAMACHA score 4 or 5), bottle jaw (fluid under jaw), weakness.',
        prevention: 'FAMACHA eye inspection every 3 weeks; deworm only anemic animals to preserve drug sensitivity.',
        emergencyAction: 'Drench immediately with Levamisole or Closantel.'
      }
    ],
    vaccinationSchedule: [
      { ageOrPeriod: 'At 3 Months', vaccine: 'PPR (Peste des Petits Ruminants)', route: 'Subcutaneous' },
      { ageOrPeriod: 'Every 6 Months', vaccine: 'Clostridial Diseases (Pulpy Kidney)', route: 'Subcutaneous' }
    ],
    kenyanProTip: 'Kagua macho ya kondoo kwa kufungua kope la ndani. Ikiwa ni jeupe badala ya rangi nyekundu ya damu, huyo kondoo ana minyoo mikali na anahitaji dawa leo kabla hajaanguka!'
  },

  // 6. HORSES & EQUINE
  {
    id: 'guide-horses',
    name: 'Horses & Equine Healthcare',
    swahiliName: 'Utunzaji na Afya ya Farasi',
    category: 'Horses',
    tagline: 'Veterinary care for farm horses, polo mounts, riding schools, and working equines.',
    heroImage: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1200&q=80',
    importanceInKenya: 'Equine husbandry spans ranching estates in Laikipia and Naivasha, safari riding outfits, sport horses in Nairobi/Karen, and hardworking draft animals. Colic prevention, routine farriery, and African Horse Sickness vaccination are non-negotiable.',
    keyBreeds: [
      {
        name: 'Thoroughbred & Warmblood Crosses',
        traits: 'Athletic, high stamina, agile jumpers and endurance rides for Kenyan outdoor terrain.',
        yield: 'Prime riding and safari mounts',
        image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Boerperd & Working Crosses',
        traits: 'Hardy hooves, calm temperament, excellent cattle herding and patrol capabilities.',
        yield: 'Endurance in remote bush environments',
        image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=600&q=80'
      }
    ],
    housingAndBiosecurity: [
      'Stable Ventilation: High roofs with Dutch doors allowing heads out; clean rubber matting with dust-free straw.',
      'Gnat & Midge Control: Fine netting and evening smoke/repellents to block Culicoides midges (vectors of AHS).'
    ],
    nutritionAndFeedChart: [
      { stage: 'Moderate Work', feedType: 'Good meadow hay (1.5 - 2% body weight) + oats/equine pellet blend + salt lick', quantityPerDay: 'Clean water always' }
    ],
    criticalDiseases: [
      {
        disease: 'African Horse Sickness (AHS / Homa ya Farasi)',
        symptoms: 'Swollen supraorbital eye pits, frothy nasal discharge, high fever, severe breathing distress.',
        prevention: 'Mandatory annual AHS vaccination; stable horses inside before sunset.',
        emergencyAction: 'Veterinary emergency! Isolate animal and administer clinical supportive therapy.'
      },
      {
        disease: 'Equine Colic',
        symptoms: 'Rolling, pawing ground, looking at flanks, absence of gut sounds, sweating.',
        prevention: 'Never feed grain before hay; gradual feed changes; provide fresh water constantly.',
        emergencyAction: 'Walk the horse slowly; do NOT allow rolling; call emergency vet hotline immediately.'
      }
    ],
    vaccinationSchedule: [
      { ageOrPeriod: 'Annually (August/September)', vaccine: 'African Horse Sickness (AHS 1 & 2)', route: 'Veterinary subcutaneous' },
      { ageOrPeriod: 'Annually', vaccine: 'Equine Tetanus Toxoid & Influenza', route: 'Intramuscular' }
    ],
    kenyanProTip: 'Farasi asiponywe maji ya kutosha wakati wa kiangazi, tumbo litafunga (impaction colic). Hakikisha maji yake ni safi na baridi kila wakati!'
  }
];

export const MOCK_VET_SERVICES: VetServiceItem[] = [
  {
    id: 'vet-01',
    title: 'On-Site Clinical Farm Visit & Diagnosis',
    swahiliTitle: 'Daktari Kufika Shambani Kwako',
    category: 'Clinical & Emergency',
    shortDesc: 'Rapid deployment of licensed KVB veterinarians to your shamba for acute disease diagnosis, wound treatment, and clinical medicine.',
    fullDesc: 'When an animal falls ill, every hour counts. Our mobile veterinary teams arrive equipped with clinical diagnostics, medical kits, antibiotics, and IV fluids to assess your cattle, poultry, goats, or pigs on-site and execute immediate treatments.',
    pricingEstimate: 'From KES 2,500 (covers inspection + mileage within 25km radius)',
    turnaroundTime: 'Emergency dispatch in under 2 hours; routine visits within 24 hours',
    targetAnimals: ['Cattle & Dairy', 'Poultry', 'Pigs', 'Goats & Sheep', 'Horses'],
    features: [
      'Full physical, temperature, and stethoscope examination',
      'Blood smear & California Mastitis Test (CMT) performed on the spot',
      'Official KVB veterinary prescription and medicine administration',
      'Syncs directly to your Farmer Portal with accredited PDF visit certificate'
    ],
    emergencyAvailable: true,
    iconName: 'Stethoscope'
  },
  {
    id: 'vet-02',
    title: 'Poultry Flock Health Audit & Post-Mortem',
    swahiliTitle: 'Upimaji wa Afya ya Kuku na Autopsy',
    category: 'Poultry Speciality',
    shortDesc: 'Specialized flock mortality investigation, necropsy diagnosis, ventilation audits, and corrective water/feed programs.',
    fullDesc: 'Sudden chick mortality or a 20% egg drop in layers requires scientific investigation, not guesswork. Our poultry veterinarians conduct systematic on-farm post-mortems to inspect organs (bursa, cecal tonsils, liver, trachea) and identify Gumboro, Newcastle, Coccidiosis, or Mycotoxicosis immediately.',
    pricingEstimate: 'KES 3,500 per flock audit (includes post-mortem examination)',
    turnaroundTime: 'Same-day on-farm diagnosis report',
    targetAnimals: ['Poultry (Layers, Broilers, Kienyeji, Turkeys)'],
    features: [
      'On-site necropsy (autopsy) of deceased or cull birds',
      'Water sanity test & coop air ventilation review',
      'Customized flock vaccination calendar adjustment',
      'Targeted antimicrobial sensitivity guidance to prevent resistance'
    ],
    emergencyAvailable: true,
    iconName: 'Egg'
  },
  {
    id: 'vet-03',
    title: 'Artificial Insemination (AI) & Genetics',
    swahiliTitle: 'Huduma ya Kupandikiza Mbegu Bora (AI)',
    category: 'Reproduction & AI',
    shortDesc: 'Premium sexed and conventional semen straws from top global & KAGRC dairy and beef bulls stored in liquid nitrogen.',
    fullDesc: 'Upgrade your herd genetics without risking venereal infections from roaming bulls. Our trained AI technicians provide precision insemination using sexed female semen (90% heifer probability) or conventional straws with complete pedigree birth logs.',
    pricingEstimate: 'Conventional: KES 1,800 | 90% Sexed Semen: KES 4,800 per straw',
    turnaroundTime: 'Dispatch within 4 hours of standing heat notification',
    targetAnimals: ['Dairy Cattle', 'Beef Cattle', 'Dairy Goats'],
    features: [
      'Liquid nitrogen tank mobile maintenance',
      'Pedigree catalog (Friesian, Ayrshire, Jersey, Fleckvieh, Sahiwal)',
      'Rectal palpation and reproductive tract health check',
      'Free Pregnancy Diagnosis (PD) check at 60-90 days'
    ],
    emergencyAvailable: false,
    iconName: 'Sparkles'
  },
  {
    id: 'vet-04',
    title: 'Herd Nutrition & Total Mixed Ration (TMR) Audit',
    swahiliTitle: 'Upangaji wa Lishe Bora na Silage ya Shamba',
    category: 'Herd Health & Audits',
    shortDesc: 'Scientific forage dry-matter testing, silage pit evaluation, and cost-effective ration formulation for commercial milk output.',
    fullDesc: 'Feed takes up 65-75% of your dairy budget. Our animal nutritionists test your silage, hay, and concentrates to formulate a Total Mixed Ration (TMR) that stops acidosis, increases butterfat, and gets you 2-4 more litres per cow while cutting waste.',
    pricingEstimate: 'KES 4,500 per complete herd nutritional audit',
    turnaroundTime: 'Visit + Formulated Feed Sheet delivered in 48 hours',
    targetAnimals: ['Cattle & Dairy', 'Goats & Sheep', 'Pigs'],
    features: [
      'Silage pit fermentation, aroma, and dry matter evaluation',
      'Penn State Particle Box forage length test',
      'Cow Body Condition Scoring (BCS) & manure consistency review',
      'Computerized least-cost feed mixing formula using local ingredients'
    ],
    emergencyAvailable: false,
    iconName: 'Sprout'
  }
];

export const MOCK_LEARN_ARTICLES: LearningArticle[] = [
  {
    id: 'art-01',
    title: 'Brooding 500 Chicks with Zero Mortality: The First 14 Days Rulebook',
    swahiliTitle: 'Kulea Vifaranga 500 Bila Kifo Hata Kimoja',
    category: 'Poultry Mastery',
    readTime: '6 min read',
    author: 'Dr. Beatrice Mwangi, BVM',
    authorRole: 'Senior Poultry Veterinarian, Farmers Hub',
    publishDate: 'September 2026',
    summary: 'A definitive on-farm guide covering infrared lamp heights, glucose water preparation, behavior observation, and Gumboro timing.',
    keyTakeaways: [
      'Pre-heat the brooder ring 6 hours BEFORE chicks arrive from the hatchery.',
      'Check chick behavior: huddling under lamp means too cold; crowding walls means too hot; uniform spread means perfect warmth.',
      'Add warm water with 5% glucose and multi-vitamins for the first 4 hours to recover transport energy before introducing crumbs.',
      'Never place fresh shavings directly under day-old chicks without covering with clean newspaper for the first 3 days.'
    ],
    contentSections: [
      {
        heading: 'The Preparation: 48 Hours Before Arrival',
        paragraphs: [
          'Most chick deaths occur within the first 72 hours, but the cause happened days before they arrived. Thoroughly scrub the brooding room with a broad disinfectant, let it dry, and lay 10cm of fresh dry pine shavings.',
          'Construct a circular brooder ring using hardboard or heavy cardboard. A round ring prevents chicks from piling into sharp 90-degree corners where they suffocate.'
        ],
        swahiliTip: 'Kumbuka: Usiweke vifaranga kwa chumba chenye baridi ya ukutani. Washa taa masaa sita mapema ili sakafu ipate joto la kutosha!'
      },
      {
        heading: 'Water Management on Day 1',
        paragraphs: [
          'Chicks arrive dehydrated from long travel across Kenyan roads. Do not throw feed down immediately. Give them lukewarm water with multi-vitamins and glucose.',
          'Dip the beaks of 20 chicks manually into the water fonts — within 10 minutes, the entire flock will imitate them and start drinking eagerly.'
        ]
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1563281577-a7be47e20db9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'art-02',
    title: 'Detecting Subclinical Mastitis Before It Destroys a Milking Cow',
    swahiliTitle: 'Jinsi ya Kujua Mastitis ya Siri Kabla Haijakata Maziwa',
    category: 'Dairy Production',
    readTime: '5 min read',
    author: 'Dr. David Kiprop, KVB Reg.',
    authorRole: 'Rift Valley Lead Dairy Vet',
    publishDate: 'August 2026',
    summary: 'How to use a simple KES 450 California Mastitis Test (CMT) paddle every fortnight to save thousands of shillings in lost milk.',
    keyTakeaways: [
      'Subclinical mastitis shows NO clots or flakes in milk, yet cuts daily yield by 15-25%.',
      'The CMT reagent reacts with white blood cell DNA to form a thick jelly-like slime.',
      'Always test each teat quarter independently — never mix milk from all 4 teats in one well.',
      'Post-milking teat dipping in chlorhexidine forms an airtight protective plug on the teat orifice.'
    ],
    contentSections: [
      {
        heading: 'Why Visible Milk Checks Aren’t Enough',
        paragraphs: [
          'For every one cow with acute clinical mastitis (swollen quarter and pus), there are 15 to 40 cows in Kenyan herds suffering from silent subclinical mastitis.',
          'The farmer thinks the cow is healthy, but the udder tissue is quietly scarring, and the bulk milk tanker has high bacterial cell counts that lead to co-op penalties.'
        ],
        swahiliTip: 'Dawa ya kuzuia mastitis ni rahisi kuliko kutibu: Nawa mikono, kamua maziwa ya kwanza kwa strip cup, na chovya chuchu kwa dawa (teat dip) baada ya kukamua!'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'art-03',
    title: 'Making Sweet, Gold-Standard Maize Silage on a Smallholder Shamba',
    swahiliTitle: 'Kutengeneza Silage Tamu ya Mahindi Isiyooza',
    category: 'Feed Formulation',
    readTime: '7 min read',
    author: 'Agnes Wangari, MSc Animal Nutrition',
    authorRole: 'Fodder Specialist, Farmers Hub',
    publishDate: 'September 2026',
    summary: 'Mastering the 2/3 milk line harvest stage, rapid pit compaction, molasses dilution, and airtight hermetic sealing.',
    keyTakeaways: [
      'Harvest maize when the grain milk-line is at 50-65% (dough stage), NOT when leaves are completely dry brown.',
      'Chop to 1.5 - 2.0 cm: too long won’t pack tightly; too fine causes ruminal bloat.',
      'Compacting is king: drive tractor or walk heavily after every 15cm layer to drive out all trapped oxygen.',
      'Apply quality lactic acid inoculant to drop pH quickly and eliminate sour smelling mold.'
    ],
    contentSections: [
      {
        heading: 'The Critical Harvest Window',
        paragraphs: [
          'If you harvest too early, silage will be wet and seep out acidic runoff (loss of vital nutrients). If you harvest too late, stems become woody lignin and air pockets ruin the pit with black mold.',
          'Break an ear of maize in half and look at the kernels. You want the yellow starch line to have pushed two-thirds down toward the cob base.'
        ],
        swahiliTip: 'Silage nzuri inanuka kama mkate uliookwa au matunda matamu ya embe; hainuki kama kinyesi au siki kali!'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80'
  }
];

export const KENYAN_COUNTY_HUBS = [
  { county: 'Kiambu', hubName: 'Central Kenya Field Hub', town: 'Githunguri Town, Opp. Dairy Co-op', phone: '+254 712 458 920', vetsOnCall: 4 },
  { county: 'Nakuru', hubName: 'Rift Valley Regional Center', town: 'Kenyatta Avenue, Agricultural House', phone: '+254 720 891 334', vetsOnCall: 5 },
  { county: 'Uasin Gishu', hubName: 'North Rift Dairy Hub', town: 'Eldoret, Uganda Road Depot', phone: '+254 733 671 228', vetsOnCall: 3 },
  { county: 'Kericho', hubName: 'Highland Livestock Hub', town: 'Kericho Town, Tea Board Junction', phone: '+254 714 552 119', vetsOnCall: 3 },
  { county: 'Kajiado', hubName: 'Pastoral & Ruminants Center', town: 'Bissil Market, Kajiado South', phone: '+254 722 994 001', vetsOnCall: 2 },
  { county: 'Machakos', hubName: 'Eastern Dryland Station', town: 'Machakos Town, Cooperative Plaza', phone: '+254 718 332 550', vetsOnCall: 2 }
];
