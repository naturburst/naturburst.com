// src/utils/productData.ts
export type productDataType = {
  id: string
  name: string
  slug: string
  brand: string
  categories: string
  price: number
  prices?: {
    USD: number
    INR: number
    GBP: number
    EUR: number
  }
  stock: number
  weight: string
  ingredients: string[]
  nutritionalInfo?: {
    calories: number
    fat: number
    carbs: number
    protein: number
  }
  itemDescription: string
  tastingNotes: string
  storageInstructions: string
  featured: boolean
  images: string[]
}

export type productDataTypeKey = keyof productDataType

// Handle image paths with process.env.PUBLIC_URL for proper Vercel deployment
const getImagePath = (path: string) => {
  // Use PUBLIC_URL if available (best practice), otherwise fallback to the path
  return `${process.env.PUBLIC_URL || ''}${path}`;
};

// Sample product data with location-based pricing
export const sampleProducts: productDataType[] = [
  {
    id: '1',
    name: 'Freeze-Dried Custard Apple',
    slug: 'freeze-dried-custard-apple',
    brand: 'NaturBurst',
    categories: 'custard-apple',
    price: 4.99, // Default price in USD
    prices: {
      USD: 4.99,
      INR: 140,
      GBP: 3.99,
      EUR: 4.49
    },
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
    storageInstructions: 'Keep in a cool, dry place away from direct sunlight. Reseal properly after opening to maintain freshness.',
    featured: true,
    images: [
      getImagePath('/images/custard-apple-detail1.jpg'),
      getImagePath('/images/custard-apple-detail2.jpg')
    ]
  },
  {
    id: '2',
    name: 'Freeze-Dried Jackfruit',
    slug: 'freeze-dried-jackfruit',
    brand: 'NaturBurst',
    categories: 'jackfruit',
    price: 4.99,
    prices: {
      USD: 4.99,
      INR: 140,
      GBP: 3.99,
      EUR: 4.49
    },
    stock: 35,
    weight: '20g',
    ingredients: ['100% Natural Jackfruit'],
    nutritionalInfo: {
      calories: 95,
      fat: 0.64,
      carbs: 23.25,
      protein: 1.72
    },
    itemDescription: 'Our freeze-dried jackfruit preserves all the tropical sweetness and unique texture of fresh jackfruit. Each piece delivers an explosion of flavor with a satisfying crisp texture. Free from additives, preservatives, and added sugars – just pure fruit in its most convenient form.',
    tastingNotes: 'Sweet and fruity with notes of banana, pineapple, and mango. The crunchy texture gives way to a burst of tropical flavor.',
    storageInstructions: 'Keep in a cool, dry place away from direct sunlight. Reseal properly after opening to maintain freshness.',
    featured: true,
    images: [
      getImagePath('/images/jackfruit-detail1.jpg'),
      getImagePath('/images/jackfruit-detail2.jpg')
    ]
  },
  {
    id: '3',
    name: 'Freeze-Dried Jamun',
    slug: 'freeze-dried-jamun',
    brand: 'NaturBurst',
    categories: 'jamun',
    price: 4.99,
    prices: {
      USD: 4.99,
      INR: 140,
      GBP: 3.99,
      EUR: 4.49
    },
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
    storageInstructions: 'Keep in a cool, dry place away from direct sunlight. Reseal properly after opening to maintain freshness.',
    featured: true,
    images: [
      getImagePath('/images/jamun-detail1.jpg'),
      getImagePath('/images/jamun-detail2.jpg')
    ]
  }
]