export type productDataType = {
  id: string
  name: string
  slug: string
  brand: string  // Always "Tropi Treats" for now
  categories: string  // Type of fruit
  clothingCategories?: string  // Optional clothing category
  price: number
  stock: number
  forWhom?: string  // Target demographic
  height?: string[]  // Height ranges
  heightDescription?: string  // Description of height ranges
  age?: string[]  // Age ranges - required for filters
  ageDescription?: string  // Description of age ranges
  weight: string  // Weight in grams
  ingredients: string[]  // List of ingredients
  nutritionalInfo?: {
    calories: number
    fat: number
    carbs: number
    protein: number
    fiber?: number
    sugar?: number
  }
  itemDescription: string  // Detailed product description
  tastingNotes: string  // Flavor profile
  storageInstructions: string  // How to store
  featured?: boolean
  images: string[]
}

export type productDataTypeKey = keyof productDataType

// Sample product data for initial development
export const sampleProducts: productDataType[] = [
  {
    id: '1',
    name: 'Freeze-Dried Custard Apple',
    slug: 'freeze-dried-custard-apple',
    brand: 'Tropi Treats',
    categories: 'custard-apple',
    price: 199,
    stock: 40,
    weight: '20g',
    ingredients: ['100% Natural Custard Apple'],
    nutritionalInfo: {
      calories: 72,
      fat: 0.23,
      carbs: 16.92,
      protein: 1.62
    },
    itemDescription: 'Our freeze-dried custard apple captures the delicate sweetness and creamy texture of this exotic fruit. Each piece delivers the authentic taste of perfectly ripened custard apple with a light, crispy texture that melts in your mouth. No additives, no preservatives, and no added sugar – just pure fruit goodness.',
    tastingNotes: 'Sweet and aromatic with subtle vanilla notes. The crisp texture transforms into a creamy mouthfeel, delivering the authentic custard apple experience.',
    storageInstructions: 'Keep in cool & dry place, away from sunlight. Do not buy if seal is broken or tempered. Please reseal properly once opened.',
    featured: true,
    images: ['/images/custard-apple-1.jpg', '/images/custard-apple-2.jpg', '/images/custard-apple-3.jpg'],
    // Adding age property to sample data
    age: ['all ages']
  },
  {
    id: '2',
    name: 'Freeze-Dried Jackfruit',
    slug: 'freeze-dried-jackfruit',
    brand: 'Tropi Treats',
    categories: 'jackfruit',
    price: 199,
    stock: 35,
    weight: '20g',
    ingredients: ['100% Natural Jackfruit'],
    nutritionalInfo: {
      calories: 72,
      fat: 0.23,
      carbs: 16.92,
      protein: 1.62
    },
    itemDescription: 'Our freeze-dried jackfruit preserves all the tropical sweetness and unique texture of fresh jackfruit. Each piece delivers an explosion of flavor with a satisfying crisp texture. Free from additives, preservatives, and added sugars – just pure fruit in its most convenient form.',
    tastingNotes: 'Sweet and fruity with notes of banana, pineapple, and mango. The crunchy texture gives way to a burst of tropical flavor.',
    storageInstructions: 'Keep in cool & dry place, away from sunlight. Do not buy if seal is broken or tempered. Please reseal properly once opened.',
    featured: true,
    images: ['/images/jackfruit-1.jpg', '/images/jackfruit-2.jpg', '/images/jackfruit-3.jpg'],
    // Adding age property to sample data
    age: ['all ages']
  },
  {
    id: '3',
    name: 'Freeze-Dried Jamun',
    slug: 'freeze-dried-jamun',
    brand: 'Tropi Treats',
    categories: 'jamun',
    price: 199,
    stock: 30,
    weight: '15g',
    ingredients: ['100% Natural Jamun'],
    nutritionalInfo: {
      calories: 47,
      fat: 0.15,
      carbs: 12.90,
      protein: 1.03
    },
    itemDescription: 'Our freeze-dried jamun captures the unique sweet-tart flavor profile of this distinctive Indian fruit. Each piece delivers the authentic taste of perfectly ripened jamun with a light, crispy texture. Rich in antioxidants and completely free from additives, preservatives, and added sugars.',
    tastingNotes: 'Sweet-tart flavor with a pleasant astringency and subtle grape-like notes. The crisp texture provides an intense flavor release before melting away.',
    storageInstructions: 'Keep in cool & dry place, away from sunlight. Do not buy if seal is broken or tempered. Please reseal properly once opened.',
    featured: true,
    images: ['/images/jamun-1.jpg', '/images/jamun-2.jpg', '/images/jamun-3.jpg'],
    // Adding age property to sample data
    age: ['all ages']
  },
  {
    id: '4',
    name: 'Freeze-Dried Sitaphal',
    slug: 'freeze-dried-sitaphal',
    brand: 'Tropi Treats',
    categories: 'sitaphal',
    price: 199,
    stock: 25,
    weight: '20g',
    ingredients: ['100% Natural Sitaphal (Sugar Apple)'],
    nutritionalInfo: {
      calories: 72,
      fat: 0.23,
      carbs: 16.92,
      protein: 1.62
    },
    itemDescription: 'Our freeze-dried sitaphal (sugar apple) preserves the delicate sweetness and unique flavor of this exotic fruit. Each piece delivers an explosion of tropical goodness with a satisfying crisp texture that melts in your mouth. No additives, no preservatives – just pure fruit bliss.',
    tastingNotes: 'Intensely sweet with custard-like notes and subtle hints of vanilla. The crisp texture dissolves into a creamy mouthfeel, delivering the authentic sitaphal experience.',
    storageInstructions: 'Keep in cool & dry place, away from sunlight. Do not buy if seal is broken or tempered. Please reseal properly once opened.',
    featured: true,
    images: ['/images/sitaphal-1.jpg', '/images/sitaphal-2.jpg', '/images/sitaphal-3.jpg'],
    // Adding age property to sample data
    age: ['all ages']
  }
]